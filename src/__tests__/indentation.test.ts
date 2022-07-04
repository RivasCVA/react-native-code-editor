import * as Indentation from '../indentation';

const SHORT_CODE = `const func = () => {
`;

const LONG_CODE = `const func = () => {
  const obj = {
    innerObj: {
`;

describe('indentation.ts', () => {
    describe('getIndentSize', () => {
        it('returns expected indent size for short code', () => {
            const lines = SHORT_CODE.split('\n');
            expect(Indentation.getIndentSize(lines[0])).toBe(2);
        });

        it('returns expected indent size for long code', () => {
            const lines = LONG_CODE.split('\n');
            expect(Indentation.getIndentSize(lines[2])).toBe(6);
        });
    });

    describe('getSuggestedIndentSize', () => {
        it('returns expected suggested indent size for short code', () => {
            const lines = SHORT_CODE.split('\n');
            expect(Indentation.getSuggestedIndentSize(lines)).toBe(2);
        });

        it('returns expected suggested indent size for long code', () => {
            const lines = LONG_CODE.split('\n');
            expect(Indentation.getSuggestedIndentSize(lines)).toBe(6);
        });
    });

    describe('createIndentString', () => {
        it('returns a string with the default indent size', () => {
            expect(Indentation.createIndentString()).toBe('  ');
        });

        it('returns a string with the expected indent size', () => {
            expect(Indentation.createIndentString(6)).toBe('      ');
            expect(Indentation.createIndentString(4)).toBe('    ');
            expect(Indentation.createIndentString(2)).toBe('  ');
            expect(Indentation.createIndentString(0)).toBe('');
        });
    });
});
