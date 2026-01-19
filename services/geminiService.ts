
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's AI assistant. Jason is a teacher and developer who builds simple tools for schools.

GUIDELINES:
1. SIMPLE LANGUAGE: Avoid technical jargon. Speak like a helpful teacher.
2. SHORT: Keep answers to 2 sentences max.
3. HELPFUL: Focus on how technology helps students and teachers.
4. NO MARKDOWN: Do not use bold (**) or lists.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return response.text?.replace(/\*\*/g, '') || "I'm here to talk about how Jason builds simple tools for schools.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm having a quick rest. Please try again in a moment.";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `PROBLEM: "${problem}". 
      TASK: As Jason Benjamin, suggest 3 real apps or tools that can be built to fix this.
      - Each should be a concrete "App".
      - Give them simple, professional names.
      - Describe the features clearly without using jargon.
      - Focus on how much time it saves or how it helps students.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Name of the tool" },
              description: { type: Type.STRING, description: "How it works in simple words" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Simple tech terms like React, AI, Web" },
              impact: { type: Type.STRING, description: "The benefit, e.g., Saves 5 hours a week" }
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
