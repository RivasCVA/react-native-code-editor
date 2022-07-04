import * as Strings from '../strings';

describe('strings.ts', () => {
    describe('convertTabsToSpaces', () => {
        it('returns a string with the expect spaces', () => {
            expect(Strings.convertTabsToSpaces('hello')).toBe('hello');
            expect(Strings.convertTabsToSpaces('\t')).toBe('  ');
            expect(Strings.convertTabsToSpaces('\thello')).toBe('  hello');
            expect(Strings.convertTabsToSpaces('\t\thello')).toBe('    hello');
            expect(Strings.convertTabsToSpaces('\t\thello\t')).toBe('    hello  ');
        });
    });

    describe('insertStringAt', () => {
        it('inserts a substring into the expected position', () => {
            expect(Strings.insertStringAt('', -1, 'hello')).toBe('hello');
            expect(Strings.insertStringAt('', 0, 'hello')).toBe('hello');
            expect(Strings.insertStringAt('', 1, 'hello')).toBe('hello');
            expect(Strings.insertStringAt('hello', 4, 'world')).toBe('helloworld');
            expect(Strings.insertStringAt('world', -1, 'hello')).toBe('helloworld');
            expect(Strings.insertStringAt('how  you', 3, 'are')).toBe('how are you');
        });
    });
});
