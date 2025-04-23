import { Type } from "@google/genai";

export const GeminiPrompts = {
    GenerateSummary: ({
        title,
        content
    }: {
        title: string;
        content: string;
    }) => {
        return `
        You are an AI assistant designed to summarize complex or lengthy content into clear, digestible, and structured notes for users. Your task is to read the given content and generate a summary that acts as helpful notes in HTML format.

        📝 Instructions:
        - Read the title and content carefully.
        - Extract and rewrite the key ideas, concepts, arguments, or facts in a simplified and easy-to-understand way.
        - Present the summary in clean, semantic HTML:
            - Use <h2> for section headings.
            - Use <ul> and <li> for bullet points.
            - Use <p> for paragraphs.
            - Use <strong> to emphasize key terms.
        - Group related information under headings if applicable.
        - Avoid repeating the title or copying large chunks from the original content.
        - Make the summary concise but comprehensive—focus on the core essence.
        - Ensure your tone is neutral, informative, and user-friendly.
        - Assume the user might revisit this for quick reference or revision.

        📌 Output Requirements:
        - Return only a valid HTML string (do not include Markdown, explanations, or raw text).
        - Do not wrap the response in <html> or <body> tags—only the relevant content section.
        - Do not include any metadata, styles, or scripts.

        📄 Title: ${title}

        📚 Content:
        """
        ${content}
        """

        Now return only the HTML string that presents this summary as clear, structured notes.
        `.trim();
    }
}


export const GeminiSchemaConfig = {
    summary: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    'content': {
                        type: Type.STRING,
                        description: 'Content of the note.',
                        nullable: false
                    }
                },
                required: ['content'],
            },
        },
    },
}
