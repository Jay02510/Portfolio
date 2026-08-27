export interface SolutionSuggestion {
  title: string;
  description: string;
  technicalStack: string[];
  impact: string;
}

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

/**
 * Basic Sanitizer that preserves mathematical inequality symbols (<, >)
 * while stripping harmful HTML tag pairs or script injections.
 */
const sanitizeInput = (input: string): string => {
  if (!input) return "";
  // Strip actual HTML tags (e.g. <script>, </div>, <img ...>) without destroying standalone <200ms or math symbols
  return input
    .replace(/<\/?[a-zA-Z][^>]*>/gm, '')
    .trim();
};

export const sendMessageToGemini = async (
  message: string, 
  history: ChatHistoryItem[] = []
): Promise<string> => {
  const cleanMessage = sanitizeInput(message);
  
  if (!cleanMessage && history.length === 0) {
    return "I am sorry, but I couldn't understand that message. Could you try typing it again with just plain words?";
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: cleanMessage,
        history: history.map(h => ({
          role: h.role,
          text: sanitizeInput(h.text)
        }))
      })
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMsg = "Server error";
      try {
        const errorJson = JSON.parse(responseText);
        errorMsg = errorJson.error || errorJson.message || errorMsg;
      } catch {
        errorMsg = responseText || errorMsg;
      }
      throw new Error(errorMsg);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error("Invalid response format received from server.");
    }
    
    const text = data.text;
    
    if (!text) return "I am a little stuck for words. Should we try again, or would you like to email Jason at jsn.benjamin@gmail.com?";

    // Safety strip of any raw markdown symbols
    return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').trim();
  } catch (error: any) {
    console.error("sendMessageToGemini error:", error);
    const errMsg = error.message || "";
    if (errMsg.includes("GEMINI_API_KEY") || errMsg.includes("API_KEY")) {
      return "I'm currently unable to access the language service. Please feel free to reach out to Jason directly at jsn.benjamin@gmail.com!";
    }
    return "I'm experiencing a bit of trouble responding right now. Please try again in a moment, or feel free to email Jason at jsn.benjamin@gmail.com!";
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
