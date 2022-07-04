import React from 'react';
import { render } from '@testing-library/react-native';

import SyntaxHighlighter from '../SyntaxHighlighter';

describe('<SyntaxHighlighter />', () => {
    it('renders correctly', () => {
        render(<SyntaxHighlighter />);
    });

    it('shows the given text on mount', () => {
        const { getByText } = render(
            <SyntaxHighlighter language="javascript">test-value</SyntaxHighlighter>
        );
        getByText('test-value');
    });

    it('updates the given text on change', () => {
        const { update, getByText } = render(
            <SyntaxHighlighter language="javascript">test-value</SyntaxHighlighter>
        );
        update(<SyntaxHighlighter language="javascript">other-test-value</SyntaxHighlighter>);
        getByText('other-test-value');
    });

    it('performs syntax highlighting for the given language', () => {
        const syntaxHighlighter = render(
            <SyntaxHighlighter language="javascript">test-value</SyntaxHighlighter>
        ).container;
        syntaxHighlighter.findByProps({
            className: 'language-javascript',
        });
    });

    it('shows no line numbers when showLineNumbers is false', () => {
        const { queryByText } = render(
            <SyntaxHighlighter language="javascript" showLineNumbers={false}>
                {'test\ntest\ntest'}
            </SyntaxHighlighter>
        );
        expect(queryByText('1')).toBeNull();
        expect(queryByText('2')).toBeNull();
        expect(queryByText('3')).toBeNull();
    });

    it('shows expected line numbers when showLineNumbers is true', () => {
        const { getByText } = render(
            <SyntaxHighlighter language="javascript" showLineNumbers>
                {'test\ntest\ntest'}
            </SyntaxHighlighter>
        );
        getByText('1');
        getByText('2');
        getByText('3');
    });

    it('disables scroll when scrollEnabled is false', () => {
        const { getByTestId } = render(
            <SyntaxHighlighter
                language="javascript"
                testID="syntax-highlighter"
                scrollEnabled={false}
            >
                test-value
            </SyntaxHighlighter>
        );
        getByTestId('syntax-highlighter-scroll-view').findByProps({
            scrollEnabled: false,
        });
    });

    it('enables scroll when scrollEnabled is true', () => {
        const { getByTestId } = render(
            <SyntaxHighlighter language="javascript" testID="syntax-highlighter" scrollEnabled>
                test-value
            </SyntaxHighlighter>
        );
        getByTestId('syntax-highlighter-scroll-view').findByProps({
            scrollEnabled: true,
        });
    });
});
