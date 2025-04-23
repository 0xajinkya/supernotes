import { Gemini } from "@/lib/gemini";
import { GeminiPrompts, GeminiSchemaConfig } from "@/utils/gemini";

const GenerateSummary = async ({
    title,
    content
}: {
    title: string,
    content: string
}): Promise<{content: string}> => {

    const prompt = GeminiPrompts.GenerateSummary({
        title,
        content
    });
    const config = GeminiSchemaConfig.summary;

    const response = await Gemini.GenerateContent(prompt, config);

    // return (response || [])[0] as string;
    return JSON.parse((response || "[]") as string)[0];
};

export const GeminiService = {
    GenerateSummary
};