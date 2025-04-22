import { Snowflake } from "@theinternetfolks/snowflake";

export const getId = () => Snowflake.generate();

// Utility to generate a random integer from 0 to max - 1
const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

// Replace this with your actual logic for filtering words
const isWordRemovable = (word: string): boolean => {
    // Example: disallow words containing "BAD"
    return word.includes("BAD");
};

export const getPublicId = (
    length: number,
    options: {
        numbers?: boolean;
        alpha?: boolean;
    } = {
            numbers: true,
            alpha: true,
        }
): string => {
    const generate = () => {
        let result = '';
        let characters = '';
        if (options.numbers !== false) {
            characters += '0123456789';
        }
        if (options.alpha !== false) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        const charactersLength = characters.length;
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(getRandomInt(charactersLength));
        }
        return result;
    };

    let publicId = generate();
    while (isWordRemovable(publicId)) {
        publicId = generate();
    }

    return publicId;
};

export const generateUniqueSlug = (slug: string): string => {
    const generate = () => {
        const random = getPublicId(4, { numbers: true, alpha: true });
        return `${slug}-${random}`;
    };

    let uniqueSlug = generate();
    while (isWordRemovable(uniqueSlug)) {
        uniqueSlug = generate();
    }

    return uniqueSlug;
};
