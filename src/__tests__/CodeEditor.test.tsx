import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import CodeEditor from '../CodeEditor';

describe('<CodeEditor />', () => {
    it('renders correctly', () => {
        render(<CodeEditor language="python" />);
    });

    it('performs syntax highlighting for the given language', () => {
        const { getByTestId } = render(<CodeEditor language="python" testID="code-editor" />);
        getByTestId('code-editor-syntax-highlighter').findByProps({
            className: 'language-python',
        });
    });

    it('shows an empty initialValue by default', () => {
        const { getByTestId } = render(<CodeEditor language="python" testID="code-editor" />);
        const textInput = getByTestId('code-editor-text-input');
        const { value } = textInput.props;
        expect(value).toBe('');
    });

    it('shows the given initialValue on mount', () => {
        const { getByTestId } = render(
            <CodeEditor language="python" initialValue="test-value" testID="code-editor" />
        );
        const textInput = getByTestId('code-editor-text-input');
        const { value } = textInput.props;
        expect(value).toBe('test-value');
    });

    it('calls onChange when the text changes', () => {
        const onChangeMock = jest.fn();
        const { getByTestId } = render(
            <CodeEditor language="python" onChange={onChangeMock} testID="code-editor" />
        );
        fireEvent.changeText(getByTestId('code-editor-text-input'), 'test-value');
        expect(onChangeMock).toHaveBeenLastCalledWith('test-value');
    });

    it('calls onKeyPress when a key is pressed', () => {
        const onKeyPressMock = jest.fn();
        const { getByTestId } = render(
            <CodeEditor language="python" onKeyPress={onKeyPressMock} testID="code-editor" />
        );
        fireEvent(getByTestId('code-editor-text-input'), 'onKeyPress', {
            nativeEvent: {
                key: 't',
            },
        });
        expect(onKeyPressMock).toHaveBeenLastCalledWith('t');
    });

    it('shows no line numbers when showLineNumbers is false', () => {
        const { queryByText } = render(
            <CodeEditor
                language="python"
                initialValue={'test\ntest\ntest'}
                showLineNumbers={false}
            />
        );
        expect(queryByText('1')).toBeNull();
        expect(queryByText('2')).toBeNull();
        expect(queryByText('3')).toBeNull();
    });

    it('shows expected line numbers when showLineNumbers is true', () => {
        const { getByText } = render(
            <CodeEditor language="python" initialValue={'test\ntest\ntest'} showLineNumbers />
        );
        getByText('1');
        getByText('2');
        getByText('3');
    });

    it('makes the editor editable when readOnly is false', () => {
        const { getByTestId } = render(
            <CodeEditor language="python" testID="code-editor" readOnly={false} />
        );
        const textInput = getByTestId('code-editor-text-input');
        const { editable } = textInput.props;
        expect(editable).toBeTruthy();
    });

    it('makes the editor uneditable when readOnly is true', () => {
        const { getByTestId } = render(
            <CodeEditor language="python" testID="code-editor" readOnly />
        );
        const textInput = getByTestId('code-editor-text-input');
        const { editable } = textInput.props;
        expect(editable).toBeFalsy();
    });

    it('blurs the editor on mount when autoFocus is false', () => {
        const { getByTestId } = render(
            <CodeEditor language="python" testID="code-editor" autoFocus={false} />
        );
        const textInput = getByTestId('code-editor-text-input');
        const { autoFocus } = textInput.props;
        expect(autoFocus).toBeFalsy();
    });

    it('focuses the editor on mount when autoFocus is true', () => {
        const { getByTestId } = render(
            <CodeEditor language="python" testID="code-editor" autoFocus />
        );
        const textInput = getByTestId('code-editor-text-input');
        const { autoFocus } = textInput.props;
        expect(autoFocus).toBeTruthy();
    });
});
