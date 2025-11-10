import { GoogleGenAI, Chat } from "@google/genai";

// Fix: The API key must be obtained from process.env.API_KEY as per the guidelines.
// This resolves the TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// For the Idea Generator
export const generateIdea = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating idea from Gemini:", error);
    if (error instanceof Error) {
        return `An error occurred: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while generating the idea.";
  }
};

// For the Chatbot
let chatSession: Chat | null = null;

function initializeChat(): Chat {
    if (chatSession) {
        return chatSession;
    }
    chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are Cyber Assistant, a helpful AI chatbot for the Cyber Hub IT club. You are friendly, knowledgeable about technology, and always eager to help users with their questions about the club, events, projects, or general tech topics. Keep your answers concise and helpful.",
        },
    });
    return chatSession;
}

export const sendChatMessage = async (message: string): Promise<string> => {
    try {
        const chat = initializeChat();
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending chat message:", error);
        if (error instanceof Error) {
            return `An error occurred: ${error.message}. Please check your API key and network connection.`;
        }
        return "An unknown error occurred while sending the message.";
    }
};
