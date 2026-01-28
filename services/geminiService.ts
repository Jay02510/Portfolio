
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

// Ensure the API key exists before attempting initialization
const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.error("Critical: API_KEY is missing from environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's helpful digital assistant. Jason is a teacher who builds simple helpers for schools.

STRICT GUIDELINES:
1. ONLY PLAIN ENGLISH: Absolutely no technical words. Instead of "UI/UX", say "how it looks". Instead of "API", say "connection". 
2. BE A TEACHER: Speak like a friendly colleague in a school breakroom.
3. CONCISE: Exactly 2 sentences. No more, no less.
4. NO MARKDOWN: Never use bold (**), italics (*), or bullet points.
5. NO SALES PITCH: Be honest, humble, and helpful.
6. KOREA CONTEXT: If asked, mention Jason's experience teaching in Seoul.
7. RESPONSIVENESS: If you are unsure, provide a friendly guess or ask them to email Jason.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    if (!ai) return "I'm having trouble connecting to my brain right now. Please check back in a moment.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const text = response.text;
    if (!text) {
      return "I processed your request but couldn't think of anything to say. Could you rephrase that?";
    }

    // Strip out all potential markdown artifacts
    return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();
  } catch (error) {
    console.error("Assistant API Error:", error);
    return "I'm experiencing a quick technical refresh. Give me a second and try that again!";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  try {
    const ai = getAIClient();
    if (!ai) return null;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Someone described this school problem: "${problem}". Suggest 3 simple helpers that can be built to fix this.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Simple name" },
              description: { type: Type.STRING, description: "Plain English description" },
              technicalStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              impact: { type: Type.STRING, description: "Human-centered benefit" }
            },
            required: ["title", "description", "technicalStack", "impact"]
          }
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Ideator API Error:", error);
    return null;
  }
};
