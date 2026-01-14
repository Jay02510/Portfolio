
import { GoogleGenAI, Type } from "@google/genai";
import { PORTFOLIO_DATA } from '../constants';

// Initializing the Gemini API client directly with process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Construct a system prompt based on the portfolio data
const SYSTEM_INSTRUCTION = `
You are the AI Assistant for ${PORTFOLIO_DATA.name}'s portfolio website. 
Your role is to act as a knowledgeable representative of ${PORTFOLIO_DATA.name}, who is a ${PORTFOLIO_DATA.role}.

Here is the context about ${PORTFOLIO_DATA.name}:
Bio: ${PORTFOLIO_DATA.bio}

Top Skills:
${PORTFOLIO_DATA.skills.map(s => `- ${s.name} (${s.level}%)`).join('\n')}

Projects:
${PORTFOLIO_DATA.projects.map(p => `
- Title: ${p.title}
  Category: ${p.category}
  Description: ${p.description}
  Tech Stack: ${p.tags.join(', ')}
`).join('\n')}

Guidelines:
1. Be professional, enthusiastic, and concise.
2. If asked about contact info, suggest using the contact form or email (but don't make up an email address unless provided).
3. Emphasize the "Edtech" focus.
4. If asked about something not in the data, politely say you don't have that specific information but emphasize the adaptability of ${PORTFOLIO_DATA.name}.
5. Keep responses under 100 words unless asked for detail.
`;

/**
 * Sends a chat message to Gemini and returns the generated text response.
 * Using gemini-3-flash-preview for efficient chat-based communication.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a temporary error while thinking. Please try again.";
  }
};

// --- New Feature: Structured Quiz Generation ---

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

/**
 * Generates a structured 3-question quiz using Gemini.
 * Using gemini-3-pro-preview for high-quality structured JSON output and pedagogical reasoning.
 */
export const generateQuizFromTopic = async (topic: string): Promise<QuizQuestion[] | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Create a short, engaging 3-question quiz about: ${topic}. The audience is a student learning this concept.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswerIndex: { 
                type: Type.INTEGER,
                description: "The zero-based index of the correct option"
              },
              explanation: { type: Type.STRING, description: "A brief pedagogical explanation of why the answer is correct." }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      return JSON.parse(jsonStr) as QuizQuestion[];
    }
    return null;
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return null;
  }
};

// --- New Feature: Learning Path Generation ---

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  keyTopics: string[];
}

/**
 * Generates a 5-step structured learning path using Gemini.
 * Using gemini-3-pro-preview for better curriculum design and reasoning capabilities.
 */
export const generateLearningPath = async (goal: string): Promise<LearningPathStep[] | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Design a 5-step learning path for a student who wants to learn: "${goal}". Assume a beginner to intermediate audience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              duration: { type: Type.STRING, description: "e.g. '2 weeks' or '4 hours'" },
              description: { type: Type.STRING },
              keyTopics: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["stepNumber", "title", "duration", "description", "keyTopics"]
          }
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      return JSON.parse(jsonStr) as LearningPathStep[];
    }
    return null;
  } catch (error) {
    console.error("Learning Path Generation Error:", error);
    return null;
  }
};
