
import { GoogleGenAI } from "@google/genai";

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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let modelName = 'gemini-3-flash-preview';
  let config: any = {
    systemInstruction: SHREE_GEN_INSTRUCTIONS,
    temperature: 0.7,
  };

  if (modelType === 'thinking') {
    modelName = 'gemini-3-pro-preview';
  } else if (modelType === 'reasoning') {
    modelName = 'gemini-3-pro-preview';
    config.thinkingConfig = { thinkingBudget: 24000 };
  } else if (modelType === 'research') {
    modelName = 'gemini-3-flash-preview';
    config.tools = [{ googleSearch: {} }];
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: config
    });

    return {
      text: response.text || "Connection lost to Shree Gen node. Retrying...",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Shree Gen Error:", error);
    return { text: "Error: Neural connection failed. Please check Nexus API settings.", sources: [] };
  }
}
