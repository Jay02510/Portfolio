
import { GoogleGenAI, Type } from "@google/genai";

// Exported types for structured AI content as required by components
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  keyTopics: string[];
}

/**
 * Creates a fresh AI client instance.
 * Always initialized with the API_KEY from the environment.
 */
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Jason Benjamin's personal digital concierge. You represent Jason, a teacher-turned-developer with 10+ years of experience in Seoul, South Korea.

STRICT CONSTRAINTS ON YOUR VOICE:
1. BE BRIEF: Never write more than 2 or 3 short sentences. People want quick, human conversation, not a wall of text.
2. NO MARKDOWN: Never use bolding (**), italics, or bullet points. Use plain, natural text only.
3. BE HUMAN: Talk like a real person in a chat window. Use warm, empathetic language.
4. NO JARGON: Use simple words.

YOUR STORY:
- Jason saw students in Korea falling behind because the system moved too fast, so he built the Benchmark Explorer to find exactly where they need help.
- He built Chekki AI because he saw parents couldn't help their kids with English homework at night. It's a bridge between school and home.
- He built The Scheduler for a school boss who was drowning in Excel sheets. It's about saving her time for what matters.

If someone asks a question, answer like you're sitting across from them. Be concise.
`;

/**
 * Handles general portfolio chat inquiries using Gemini 3 Flash.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8, // Slightly higher for more natural variety
        topP: 0.95,
      }
    });

    return response.text?.replace(/\*\*/g, '') || "I'm here to chat about Jason's tools or his time in Korea. What's on your mind?";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "I'm having a little trouble connecting right now. You can reach Jason at jsn.benjamin@gmail.com.";
  }
};

/**
 * Generates a multiple-choice quiz based on a topic using JSON response schema.
 */
export const generateQuizFromTopic = async (topic: string): Promise<QuizQuestion[] | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a 3-question multiple choice quiz about "${topic}" for educational purposes. Each question must have exactly 4 options.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The quiz question text."
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Four distinct multiple choice options."
              },
              correctAnswer: {
                type: Type.STRING,
                description: "The correct answer from the provided options."
              }
            },
            required: ["question", "options", "correctAnswer"],
            propertyOrdering: ["question", "options", "correctAnswer"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return null;
  }
};

/**
 * Generates a step-by-step learning path/syllabus for a topic using JSON response schema.
 */
export const generateLearningPath = async (topic: string): Promise<LearningPathStep[] | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 4-step learning path or syllabus for mastering the topic: "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: {
                type: Type.INTEGER,
                description: "The chronological order of the step."
              },
              title: {
                type: Type.STRING,
                description: "Title of the learning module."
              },
              description: {
                type: Type.STRING,
                description: "A brief explanation of the module objectives."
              },
              duration: {
                type: Type.STRING,
                description: "Recommended time to spend on this module (e.g. '2 hours', 'Week 1')."
              },
              keyTopics: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Core concepts included in this step."
              }
            },
            required: ["stepNumber", "title", "description", "duration", "keyTopics"],
            propertyOrdering: ["stepNumber", "title", "description", "duration", "keyTopics"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Learning Path Generation Error:", error);
    return null;
  }
};
