const braces = new Map<string, string>([
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
    ['<', '>'],
    ['"', '"'],
    ["'", "'"],
    ['`', '`'],
]);

const regularBraces = new Set<string>(['{', '(', '[', '<']);

/**
 * Check if the string is an opening brace.
 * @param str Brace to check.
 * @param onlyRegularBraces Return true only on `{`, `(`, `[`, or `<`.
 * @returns boolean
 */
export const isOpenBrace = (str: string, onlyRegularBraces: boolean = false): boolean => {
    if (onlyRegularBraces && !isRegularBrace(str)) {
        return false;
    }
    return braces.has(str);
};

/**
 * Check if the string is a closing brace.
 * @param str Brace to check.
 * @returns boolean
 */
export const isCloseBrace = (str: string): boolean => {
    for (let value of braces.values()) {
        if (str === value) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if the two given characters are a brace pair.
 * @param openBrace Potential open brace.
 * @param closeBrace Potential close brace.
 * @returns boolean
 */
export const isBracePair = (openBrace: string, closeBrace: string): boolean => {
    if (!openBrace || !closeBrace) {
        return false;
    }
    return isOpenBrace(openBrace) && getCloseBrace(openBrace) === closeBrace;
};

/**
 * Gets the closing brace given the opening brace.
 * Returns an empty string if there is no brace match.
 * @param str Opening brace.
 * @returns string
 */
export const getCloseBrace = (str: string): string => {
    return braces.get(str) || '';
};

/**
 * Check if the string is a regular brace.
 * Only true on `{`, `(`, `[`, or `<`.
 * @param str Brace to check.
 * @returns boolean
 */
export const isRegularBrace = (str: string): boolean => {
    return regularBraces.has(str);
};
