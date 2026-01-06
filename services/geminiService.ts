
import { GoogleGenAI } from "@google/genai";

/**
 * 使用 nano banana (gemini-2.5-flash-image) 生成人像写真
 */
export async function generatePortrait(
  faceBase64: string,
  stylePrompt: string,
  customPrompt?: string,
  refImageBase64?: string
): Promise<string> {
  // 模型选择：nano banana 对应 gemini-2.5-flash-image
  const model = 'gemini-2.5-flash-image';
  
  // 每次调用时实例化，确保获取最新的 API Key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 构建用户面部数据部分
  const facePart = {
    inlineData: {
      data: faceBase64.split(',')[1],
      mimeType: 'image/png',
    },
  };

  // 构建提示词：强调身份一致性与风格融合
  let promptText = `Generate a high-quality, professional realistic portrait based on the provided face. 
CRITICAL: You must accurately maintain the facial features, bone structure, and identity of the person in the first image.
Style Context: ${stylePrompt}.
User Specific Requests: ${customPrompt || 'None'}.
The final result should be a single, polished photograph that looks like a high-end studio shoot.`;

  if (refImageBase64) {
    promptText += ` Additionally, incorporate the hairstyle, clothing style, and lighting vibe from the second reference image provided.`;
  }

  const textPart = { text: promptText };

  // 组合所有输入部分
  const parts = [facePart, textPart];

  // 如果有参考图，则加入
  if (refImageBase64) {
    parts.push({
      inlineData: {
        data: refImageBase64.split(',')[1],
        mimeType: 'image/png',
      },
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "3:4", // 为人像写真优化，采用 3:4 比例
        }
      }
    });

    // 规范：由于返回结果可能包含文本说明或多段内容，必须遍历寻找 inlineData
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error('模型响应成功但未包含有效的图像数据。');
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error('AI 写真生成过程中遇到错误，请检查您的网络或 API 配置。');
  }
}
