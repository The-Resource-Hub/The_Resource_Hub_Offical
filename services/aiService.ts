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

export async function runShreeGen(prompt: string, modelType: string = 'fast') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return { 
      text: "API key not configured. Please add VITE_GEMINI_API_KEY to your environment variables.", 
      sources: [] 
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  let modelName = 'gemini-1.5-flash';
  
  if (modelType === 'thinking' || modelType === 'reasoning') {
    modelName = 'gemini-1.5-pro';
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: SHREE_GEN_INSTRUCTIONS,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      text: text || "Connection lost to Shree Gen node. Retrying...",
      sources: []
    };
  } catch (error) {
    console.error("Shree Gen Error:", error);
    return { text: "Error: Neural connection failed. Please check API settings.", sources: [] };
  }
}
