
export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

/**
 * Basic Sanitizer to prevent XSS and tag injection.
 * Removes HTML tags and trims whitespace.
 */
const sanitizeInput = (input: string): string => {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .trim();
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const cleanMessage = sanitizeInput(message);
  
  if (!cleanMessage) {
    return "I am sorry, but I couldn't understand that message. Could you try typing it again with just plain words?";
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: cleanMessage })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Server error");
    }

    const data = await response.json();
    const text = data.text;
    
    if (!text) return "I am a little stuck for words. Should we try again, or would you like to email Jason?";

    // Final safety strip of any markdown the model might have used despite instructions
    return text.replace(/\*\*/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();
  } catch (error) {
    console.error("sendMessageToGemini error:", error);
    return "I am having a slight connection delay. Perhaps you could try again in a moment, or reach out to Jason via email?";
  }
};

export const generateSolutionsForProblem = async (problem: string): Promise<SolutionSuggestion[] | null> => {
  const cleanProblem = sanitizeInput(problem);
  if (!cleanProblem) return null;

  try {
    const response = await fetch("/api/ideate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem: cleanProblem })
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
};
