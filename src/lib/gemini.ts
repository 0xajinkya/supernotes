import { GoogleGenAI } from "@google/genai"


export const Gemini = {
    // instance: new GoogleGenAI({ apiKey: String(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY) }),
    instance: new GoogleGenAI({ apiKey: "AIzaSyBGQUYdevOKaVtV_1Z5NxNLHeHCyaskIHc" }),
    GenerateContent: async (prompt: string, config: Record<string, unknown>) => {
        const response = await Gemini.instance.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config
        });
        return response.text;
    }
};