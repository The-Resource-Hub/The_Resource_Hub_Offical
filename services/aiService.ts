import { GoogleGenerativeAI } from "@google/generative-ai";

const SHREE_GEN_INSTRUCTIONS = `
You are "Shree Gen", an elite Academic Assistant AI developed by Preet Bopche.
Your persona is a "Study Buddy" - knowledgeable, motivational, and concise.

PEDAGOGICAL RULES:
1. Always solve math/logic problems STEP-BY-STEP with clear explanations for each operation.
2. If comparing concepts, use Markdown Tables for clarity.
3. Use bullet points for long theories.
4. If a user asks non-academic questions, politely steer them back to studies.
5. Identify yourself as created by Preet Bopche.
6. Tone: Friendly but firm on accuracy. Use a bit of humor/motivation.
`;

export interface AIResponse {
  text: string;
  sources: any[];
  modelUsed?: string;
  error?: boolean;
}

export async function runGemini(prompt: string, modelName: string, apiKey: string): Promise<AIResponse> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: SHREE_GEN_INSTRUCTIONS,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      text: response.text(),
      sources: [],
      modelUsed: modelName
    };
  } catch (error) {
    console.error(`Gemini Error (${modelName}):`, error);
    return { text: "", sources: [], error: true };
  }
}

export async function runOpenAI(prompt: string, modelName: string, apiKey: string): Promise<AIResponse> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: SHREE_GEN_INSTRUCTIONS },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return {
      text: data.choices[0].message.content,
      sources: [],
      modelUsed: modelName
    };
  } catch (error) {
    console.error(`OpenAI Error (${modelName}):`, error);
    return { text: "", sources: [], error: true };
  }
}

// Fallback logic for ShreeGen
export async function runShreeGen(prompt: string, modelType: string = 'fast'): Promise<AIResponse> {
  const savedDirect = localStorage.getItem('shree_direct_models');
  const savedAgg = localStorage.getItem('shree_aggregator_models');
  
  const directModels = savedDirect ? JSON.parse(savedDirect) : [];
  const aggregatorModels = savedAgg ? JSON.parse(savedAgg) : [];
  
  const activeModels = [
    ...directModels.filter((m: any) => m.enabled && m.type === (modelType === 'fast' ? 'Fast' : 'Thinking')),
    ...aggregatorModels.filter((m: any) => m.enabled && m.type === (modelType === 'fast' ? 'Fast' : 'Thinking'))
  ];

  if (activeModels.length === 0) {
    // Fallback to default Gemini if no models configured/enabled
    const defaultKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (defaultKey) {
      return runGemini(prompt, modelType === 'fast' ? 'gemini-1.5-flash' : 'gemini-1.5-pro', defaultKey);
    }
    return { text: "No active models configured. Please check Admin Settings.", sources: [], error: true };
  }

  // Shuffle for random selection
  const shuffled = [...activeModels].sort(() => Math.random() - 0.5);

  for (const model of shuffled) {
    let result: AIResponse;
    if (model.provider === 'Google') {
      result = await runGemini(prompt, model.id, model.apiKey);
    } else if (model.provider === 'OpenAI') {
      result = await runOpenAI(prompt, model.id, model.apiKey);
    } else {
      // Aggregator or other provider
      const { callAggregator } = await import('./aggregatorService');
      result = await callAggregator(prompt, model);
    }

    if (!result.error) return result;
    console.warn(`Model ${model.name} failed, trying next...`);
  }

  return { text: "All available models failed to respond. Please check your API keys.", sources: [], error: true };
}
