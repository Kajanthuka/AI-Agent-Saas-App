// import { GoogleGenAI } from "@google/genai";

// export const gemini = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT || "tribal-bonito-418420",
  location: process.env.GOOGLE_CLOUD_LOCATION || "global",
});