
import { GoogleGenAI, Type } from "@google/genai";
import { PORTFOLIO_DATA } from '../constants';

/**
 * Types for structured pedagogical objects.
 */
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
You are the Executive Concierge for Jason Benjamin's professional portfolio. 
Jason is a Software Architect specializing in EdTech Infrastructure.

Your voice should be:
- Professional, efficient, and sophisticated.
- Outcome-oriented (focus on institutional ROI, teacher efficiency, and student success).
- Technical but clear.

Key Systems to discuss:
1. Chekki: A smart feedback tool. It reduces teacher feedback time by 80% while increasing student engagement.
2. Benchmark Explorer: An analytics powerhouse. It helps Higher Ed leaders predict student retention and curriculum gaps.
3. Intelligent Scheduler: A logistics engine. It uses complex constraint solving to manage campus scheduling with zero manual friction.

Guidelines:
- If asked about "AI", refer to it as "Smart Systems" or "Automation".
- If asked about hiring or a demo, tell them to use the "Consultation" button or the contact section at the bottom.
- Be concise. Educational leaders have little time.
- Refer to Jason as a "Product Architect" or "System Designer".
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
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Access text property directly as per latest SDK guidelines
    return response.text || "I'm here to provide architectural insights on Jason's work. How can I assist?";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "The system is currently undergoing maintenance. Please reach out to Jason via email.";
  }
};

/**
 * Generates a quiz from a topic using Gemini structured output.
 * Implementation for the InteractiveDemo component.
 */
export const generateQuizFromTopic = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a pedagogical 3-question multiple-choice quiz about: ${topic}. 
      Each question must have 4 options and one clearly identifiable correct answer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'The quiz question text.',
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of four possible answers.',
              },
              correctAnswer: {
                type: Type.STRING,
                description: 'The correct answer string.',
              },
            },
            required: ["question", "options", "correctAnswer"],
          },
        },
      },
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) return [];
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};

/**
 * Generates a structured learning path for a topic using Gemini structured output.
 * Implementation for the InteractiveDemo component.
 */
export const generateLearningPath = async (topic: string): Promise<LearningPathStep[]> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Synthesize a structured 4-step professional learning path for: ${topic}. 
      Include estimated durations and key pedagogical focus areas for each step.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
              keyTopics: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["stepNumber", "title", "description", "duration", "keyTopics"],
          },
        },
      },
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) return [];
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Learning Path Synthesis Error:", error);
    return [];
  }
};
