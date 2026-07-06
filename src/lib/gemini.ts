
import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT || "tribal-bonito-418420",
  location: process.env.GOOGLE_CLOUD_LOCATION || "global",
});