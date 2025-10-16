"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function response(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const startTime = Date.now();
    const result = await model.generateContent(prompt);
    const endTime = Date.now();
    console.log(`Gemini API call took ${endTime - startTime}ms`);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", {
      message: error.message,
      stack: error.stack,
      code: error.code || "N/A",
    });
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
}