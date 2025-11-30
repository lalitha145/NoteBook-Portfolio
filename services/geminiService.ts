import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

// Initialize Gemini API Client
// Using process.env.API_KEY as strictly required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateWallpaper = async (
  prompt: string,
  style: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  
  // Construct a richer prompt to ensure high quality results suitable for wallpapers
  const fullPrompt = `Create a high-quality wallpaper. 
  Subject: ${prompt}. 
  Style: ${style}. 
  Requirements: High resolution, detailed, aesthetic, suitable for background.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { text: fullPrompt }
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // note: imageSize is not supported on Flash Image, only Pro Image.
          // We stick to Flash Image for speed and default key compatibility.
        }
      },
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};