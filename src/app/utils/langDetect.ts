import { franc } from "franc-min";
/**
 * Detect the language of a given text.
 * @param text - The text to analyze.
 * @returns The language code or 'unknown' if the language cannot be detected.
 */
export function detectLanguage(text: string): string {
    const language = franc(text); // returns ISO 639-3 language code
    return language === 'und' ? 'unknown' : language; // 'und' stands for undetermined language
  }
