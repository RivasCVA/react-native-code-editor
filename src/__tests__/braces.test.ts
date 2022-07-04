import * as Braces from '../braces';

describe('braces.ts', () => {
    describe('isOpenBrace', () => {
        it('identifies correct open braces', () => {
            expect(Braces.isOpenBrace('{')).toBeTruthy();
            expect(Braces.isOpenBrace('(')).toBeTruthy();
            expect(Braces.isOpenBrace('[')).toBeTruthy();
            expect(Braces.isOpenBrace('<')).toBeTruthy();
            expect(Braces.isOpenBrace('"')).toBeTruthy();
            expect(Braces.isOpenBrace("'")).toBeTruthy();
            expect(Braces.isOpenBrace('`')).toBeTruthy();
        });

        it('identifies incorrect open braces', () => {
            expect(Braces.isOpenBrace('}')).toBeFalsy();
            expect(Braces.isOpenBrace(')')).toBeFalsy();
            expect(Braces.isOpenBrace(']')).toBeFalsy();
            expect(Braces.isOpenBrace('>')).toBeFalsy();
            expect(Braces.isOpenBrace('a')).toBeFalsy();
            expect(Braces.isOpenBrace('1')).toBeFalsy();
            expect(Braces.isOpenBrace('!')).toBeFalsy();
        });
    });

    describe('isCloseBrace', () => {
        it('identifies correct close braces', () => {
            expect(Braces.isCloseBrace('}')).toBeTruthy();
            expect(Braces.isCloseBrace(')')).toBeTruthy();
            expect(Braces.isCloseBrace(']')).toBeTruthy();
            expect(Braces.isCloseBrace('>')).toBeTruthy();
            expect(Braces.isCloseBrace('"')).toBeTruthy();
            expect(Braces.isCloseBrace("'")).toBeTruthy();
            expect(Braces.isCloseBrace('`')).toBeTruthy();
        });

        it('identifies incorrect close braces', () => {
            expect(Braces.isCloseBrace('{')).toBeFalsy();
            expect(Braces.isCloseBrace('(')).toBeFalsy();
            expect(Braces.isCloseBrace('[')).toBeFalsy();
            expect(Braces.isCloseBrace('<')).toBeFalsy();
            expect(Braces.isCloseBrace('a')).toBeFalsy();
            expect(Braces.isCloseBrace('1')).toBeFalsy();
            expect(Braces.isCloseBrace('!')).toBeFalsy();
        });
    });

    describe('isBracePair', () => {
        it('identifies correct brace pairs', () => {
            expect(Braces.isBracePair('{', '}')).toBeTruthy();
            expect(Braces.isBracePair('(', ')')).toBeTruthy();
            expect(Braces.isBracePair('[', ']')).toBeTruthy();
            expect(Braces.isBracePair('<', '>')).toBeTruthy();
            expect(Braces.isBracePair('"', '"')).toBeTruthy();
            expect(Braces.isBracePair("'", "'")).toBeTruthy();
            expect(Braces.isBracePair('`', '`')).toBeTruthy();
        });

        it('identifies incorrect brace pairs', () => {
            expect(Braces.isBracePair('{', ')')).toBeFalsy();
            expect(Braces.isBracePair(')', '[')).toBeFalsy();
            expect(Braces.isBracePair('(', ']')).toBeFalsy();
            expect(Braces.isBracePair('>', '<')).toBeFalsy();
            expect(Braces.isBracePair('`', '"')).toBeFalsy();
            expect(Braces.isBracePair('a', 'a')).toBeFalsy();
            expect(Braces.isBracePair('!', ')')).toBeFalsy();
        });
    });

    describe('getCloseBrace', () => {
        it('gets the correct close brace', () => {
            expect(Braces.getCloseBrace('{')).toBe('}');
            expect(Braces.getCloseBrace('(')).toBe(')');
            expect(Braces.getCloseBrace('[')).toBe(']');
            expect(Braces.getCloseBrace('<')).toBe('>');
            expect(Braces.getCloseBrace('"')).toBe('"');
            expect(Braces.getCloseBrace("'")).toBe("'");
            expect(Braces.getCloseBrace('`')).toBe('`');
        });

        it('returns an empty string on invalid open brace', () => {
            expect(Braces.getCloseBrace('}')).toBe('');
            expect(Braces.getCloseBrace('>')).toBe('');
            expect(Braces.getCloseBrace('a')).toBe('');
            expect(Braces.getCloseBrace('!')).toBe('');
            expect(Braces.getCloseBrace('1')).toBe('');
            expect(Braces.getCloseBrace('')).toBe('');
        });
    });

    describe('isRegularBrace', () => {
        it('identifies correct regular braces', () => {
            expect(Braces.isRegularBrace('{')).toBeTruthy();
            expect(Braces.isRegularBrace('(')).toBeTruthy();
            expect(Braces.isRegularBrace('[')).toBeTruthy();
            expect(Braces.isRegularBrace('<')).toBeTruthy();
        });

        it('identifies incorrect regular braces', () => {
            expect(Braces.isRegularBrace('}')).toBeFalsy();
            expect(Braces.isRegularBrace(')')).toBeFalsy();
            expect(Braces.isRegularBrace(']')).toBeFalsy();
            expect(Braces.isRegularBrace('>')).toBeFalsy();
            expect(Braces.isRegularBrace('"')).toBeFalsy();
            expect(Braces.isRegularBrace("'")).toBeFalsy();
            expect(Braces.isRegularBrace('`')).toBeFalsy();
            expect(Braces.isRegularBrace('a')).toBeFalsy();
            expect(Braces.isRegularBrace('1')).toBeFalsy();
            expect(Braces.isRegularBrace('!')).toBeFalsy();
        });
    });
});
