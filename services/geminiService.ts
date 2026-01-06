
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generatePortrait(
  faceBase64: string,
  stylePrompt: string,
  customPrompt?: string,
  refImageBase64?: string
): Promise<string> {
  const model = 'gemini-2.5-flash-image';
  
  const parts: any[] = [
    {
      inlineData: {
        data: faceBase64.split(',')[1],
        mimeType: 'image/png',
      },
    },
    {
      text: `Based on this person's face, generate a high-quality realistic portrait. 
             Maintain the facial features and identity of the person accurately.
             Style instructions: ${stylePrompt}.
             Additional user requirements: ${customPrompt || 'None'}.
             Ensure the final image looks professional and lifelike.`
    }
  ];

  if (refImageBase64) {
    parts.push({
      inlineData: {
        data: refImageBase64.split(',')[1],
        mimeType: 'image/png',
      },
    });
    parts[1].text += ` Also, use the style/elements from this second provided reference image (especially for hairstyle or clothing).`;
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error('Failed to generate image');
}
