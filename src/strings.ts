import * as Indentation from './indentation';

/**
 * Converts tabs to the appropriate number of spaces in the given string.
 * @param str Root string.
 * @returns string
 */
export const convertTabsToSpaces = (str: string): string => {
    return str.replace('\t', Indentation.createIndentString());
};

/**
 * Inserts a substring into a string at a specific position.
 * @param str Root string.
 * @param position Position to insert.
 * @param strToInsert String to be inserted.
 * @returns string
 */
export const insertStringAt = (str: string, position: number, strToInsert: string): string => {
    return str.substring(0, position + 1) + strToInsert + str.substring(position + 1);
};
