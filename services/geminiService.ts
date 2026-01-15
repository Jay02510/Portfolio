import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's professional AI concierge. Jason is an expert Edtech developer and former teacher based in Seoul.

STRICT CONSTRAINTS ON YOUR VOICE:
1. ELEGANT & MINIMAL: Use clear, sophisticated but simple language.
2. BRIEF: Responses should be no more than 2-3 short, impactful sentences.
3. INSIGHTFUL: Focus on the intersection of pedagogy and technology.
4. NO MARKDOWN: Do not use bold (**) or bullet points unless absolutely necessary for clarity.
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
    return response.text?.replace(/\*\*/g, '') || "I'm here to discuss Jason's vision for educational systems.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm currently recalibrating. Please try again in a moment.";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `PROBLEM: "${problem}". 
      TASK: As Jason Benjamin, propose 3 specific, buildable software tools or digital applications that can be developed to solve this.
      - Each suggestion must be a concrete "App" or "System".
      - Use professional software names.
      - Keep descriptions focused on the buildable features.
      - Use clear, non-jargon language for the impact.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "A professional name for the proposed software tool" },
              description: { type: Type.STRING, description: "A buildable feature set and how the app works" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific tech (e.g., React, Gemini API, Node.js)" },
              impact: { type: Type.STRING, description: "The specific productivity win (e.g., Saves 5 hours of admin weekly)" }
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