
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's personal digital concierge. You represent Jason, a teacher-turned-developer with 10+ years of experience in Seoul, South Korea.

STRICT CONSTRAINTS ON YOUR VOICE:
1. BE BRIEF: Never write more than 2 or 3 short sentences.
2. NO MARKDOWN: Use plain, natural text only.
3. BE HUMAN: Talk like a real person in a chat window. 
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });
    return response.text?.replace(/\*\*/g, '') || "I'm here to chat about Jason's tools.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm having a little trouble connecting right now.";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user has this problem in their educational environment: "${problem}". 
      As Jason Benjamin (Edtech Architect), suggest 3 distinct MVP (Minimum Viable Product) solutions. 
      Each should be technically feasible using tools like React, Gemini API, or N8N.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Catchy name for the MVP" },
              description: { type: Type.STRING, description: "How it solves the problem specifically" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific tools to use" },
              impact: { type: Type.STRING, description: "Quantifiable benefit (e.g. 5 hours saved/week)" }
            },
            required: ["title", "description", "technicalStack", "impact"]
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Solution Generation Error:", error);
    return null;
  }
};
