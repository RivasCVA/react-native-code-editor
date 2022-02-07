import * as Braces from './braces';

export const INDENT_SIZE = 2; // Better for small screens
export const INDENT_SYMBOL = ' '; // Spaces over tabs

/**
 * Gets the indentation size of the given line of code.
 * @param line Line of code.
 * @returns number.
 */
export const getIndentSize = (line: string): number => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== INDENT_SYMBOL) {
            const trimmed = line.trimEnd();
            const lastChar = trimmed.substring(trimmed.length - 1);
            // Extra indentation if inside a regular brace.
            // Inclues colon for python.
            const addedIndent =
                Braces.isOpenBrace(lastChar, true) || lastChar === ':' ? INDENT_SIZE : 0;
            return i + addedIndent;
        }
    }
    return 0;
};

/**
 * Analyses the lines of code (from end to start) and finds
 * the best indentation size for the new line.
 * @param lines The lines of code to analyze.
 * @returns number
 */
export const getSuggestedIndentSize = (lines: string[]): number => {
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim().length > 0) {
            return getIndentSize(lines[i]);
        }
    }
    return 0;
};

/**
 * Creates an indentation string of the given size.
 * The preset indentation size is used by default.
 * @param indentSize Optional indentation size.
 * @returns string
 */
export const createIndentString = (indentSize: number = INDENT_SIZE): string => {
    let str = '';
    for (let i = 0; i < indentSize; i++) {
        str += INDENT_SYMBOL;
    }
    return str;
};
