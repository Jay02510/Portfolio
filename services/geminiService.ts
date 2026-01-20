
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's helpful personal assistant. Jason is a teacher who builds simple helpers for schools.

STRICT GUIDELINES:
1. ONLY PLAIN ENGLISH: Absolutely no technical words. Instead of "UI/UX", say "how it looks". Instead of "API", say "connection". 
2. BE A TEACHER: Speak like a friendly colleague in a school breakroom.
3. CONCISE: Exactly 2 sentences. No more, no less.
4. NO MARKDOWN: Never use bold (**), italics (*), or bullet points.
5. NO SALES PITCH: Be honest, humble, and helpful.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      }
    });
    // Final safety check to strip any leaked markdown
    return response.text?.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '') || "I am here to help you learn about Jason's tools for schools.";
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
      contents: `Someone described this school problem: "${problem}". 
      TASK: Suggest 3 simple helpers that can be built to fix this.
      - Use friendly, everyday names.
      - Describe the helper in one clear sentence.
      - Explain the benefit simply (e.g., Saves 2 hours every day).`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Simple name of the helper" },
              description: { type: Type.STRING, description: "What it does in plain English" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Simple terms like Web Tool" },
              impact: { type: Type.STRING, description: "The benefit in human terms" }
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