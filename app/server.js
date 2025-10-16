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

    // Add a timeout of 8 seconds to avoid hitting Vercel limit
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API call timed out after 8 seconds")), 8000);
    });

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise,
    ]);

    const endTime = Date.now();
    console.log(`Gemini API call took ${endTime - startTime}ms`);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", {
      message: error.message,
      stack: error.stack,
      code: error.code || "N/A",
      promptLength: prompt.length,
    });
    throw new Error(`Failed to generate AI response: ${error.message}`);
  }
}