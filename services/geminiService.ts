
import { GoogleGenAI, Type } from "@google/genai";

export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's helpful digital assistant. Jason is a teacher who builds simple helpers for schools.

STRICT GUIDELINES:
1. ONLY PLAIN ENGLISH: Absolutely no technical words. Instead of "UI/UX", say "how it looks". Instead of "API", say "connection". 
2. BE A TEACHER: Speak like a friendly colleague in a school breakroom.
3. STRUCTURE: Use exactly 2 or 3 sentences. 
4. CALL TO ACTION: You MUST always end your response with either a follow-up question or a gentle suggestion to check out one of Jason's projects or email him at jsn.benjamin@gmail.com.
5. NO MARKDOWN: Never use bold (**), italics (*), or bullet points.
6. NO SALES PITCH: Be honest, humble, and helpful.
7. KOREA CONTEXT: If asked, mention Jason's experience teaching in Seoul.
8. RESPONSIVENESS: If you are unsure, provide a friendly guess or ask them to email Jason.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const text = response.text;
    if (!text) {
      return "I'm having a bit of trouble finding the words. Would you like to try asking that another way, or should we just email Jason?";
    }

    // Strip out markdown for plain-text aesthetic
    return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();
  } catch (error) {
    console.error("Assistant API Error:", error);
    return "I am currently having a slight connection delay. Perhaps you could try again in a moment, or reach out to Jason via email if it's urgent?";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ 
        parts: [{ 
          text: `Someone described this school problem: "${problem}". Suggest 3 simple helpers that can be built to fix this.` 
        }] 
      }],
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
