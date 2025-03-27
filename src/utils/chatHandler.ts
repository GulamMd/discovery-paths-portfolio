import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI("AIzaSyDSOMPngWSl357GlhhQbBQEiHYjLwIxuPM");

export const handleChat = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert messages to prompt text
    const prompt = messages.map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n");

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Ensure the response is valid
    if (!response.ok) {
      console.error("Gemini API Error:", response.status, response.statusText);
      throw new Error("Failed to fetch response from Gemini API");
    }

    const text = await response.text();
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return text; // Return the generated text
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Something went wrong while processing the chat");
  }
};