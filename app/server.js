"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function response(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use 1.5-flash for faster responses
    const startTime = Date.now();
    const result = await model.generateContent(prompt);
    const endTime = Date.now();
    console.log(`Gemini call took ${endTime - startTime}ms`); // Log duration
    return result.response.text();
  } catch (error) {
    console.error("Full Gemini error:", error); // Log full error for Vercel logs
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
}