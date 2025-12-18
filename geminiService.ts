
import { GoogleGenAI, Type } from "@google/genai";
import { StructuredEducationContent } from "./types";

export const structureContent = async (rawText: string): Promise<StructuredEducationContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `请将以下教育内容整理成结构化的排版数据。
    要求：
    1. 提取一个响亮且专业的标题。
    2. 提取一个富有亲和力的副标题。
    3. 提取一段简短的导语。
    4. 将主体内容分为3-5个阶段或板块。
    5. 为每个板块分配一种颜色（pink, blue, green, orange）。
    6. 提取一个总结性的页脚提示。
    
    原始内容：
    ${rawText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mainTitle: { type: Type.STRING },
          subTitle: { type: Type.STRING },
          intro: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.STRING },
                color: { type: Type.STRING, enum: ['pink', 'blue', 'green', 'orange'] }
              },
              required: ["title", "content", "color"]
            }
          },
          footerNote: { type: Type.STRING }
        },
        required: ["mainTitle", "subTitle", "intro", "sections", "footerNote"]
      }
    }
  });

  return JSON.parse(response.text);
};
