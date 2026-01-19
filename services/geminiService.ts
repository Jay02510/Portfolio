
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's helpful assistant. Jason is a teacher who builds simple helpers for schools.

GUIDELINES:
1. PLAIN ENGLISH: Do not use technical words like "AI", "Frontend", "EdTech", "Framework", or "Architecture".
2. HUMAN TONE: Speak like a friendly, calm teacher helping a colleague.
3. VERY SHORT: Keep answers to 2 sentences max.
4. NO MARKDOWN: Never use bold (**), italics (*), or lists.
5. NO JARGON: Instead of "optimizing workflow", say "saving you time".
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
    return response.text?.replace(/\*\*/g, '').replace(/\*/g, '') || "I'm here to talk about how Jason builds simple helpers for schools.";
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
      TASK: As Jason Benjamin, suggest 3 simple helpers that can be built to fix this.
      - Use simple, friendly names.
      - Describe the helper clearly without using technical words.
      - Focus on how it saves time or makes life easier for parents and teachers.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Name of the helper" },
              description: { type: Type.STRING, description: "How it works in very simple words" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Simple terms like Web Tool or Helper Bot" },
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
