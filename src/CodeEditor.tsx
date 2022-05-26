import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Platform,
    ColorValue,
    NativeSyntheticEvent,
    TextInputScrollEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData,
} from 'react-native';
import SyntaxHighlighter, {
    SyntaxHighlighterStyleType,
    SyntaxHighlighterSyntaxStyles,
} from './SyntaxHighlighter';
import { Languages } from './languages';
import * as Braces from './braces';
import * as Indentation from './indentation';
import * as Strings from './strings';

export type CodeEditorStyleType = SyntaxHighlighterStyleType & {
    /**
     * Editor height.
     */
    height?: string | number;

    /**
     * Editor width.
     */
    width?: string | number;

    /**
     * Editor top margin.
     */
    marginTop?: string | number;

    /**
     * Editor bottom margin.
     */
    marginBottom?: string | number;

    /**
     * Use this property to align the text input with the syntax highlighter text.
     * @see highlighterLineHeight
     */
    inputLineHeight?: number;

    /**
     * Use this property to help you align the text input with the syntax highlighter text.
     * Do not use in production.
     * @see highlighterColor
     */
    inputColor?: ColorValue;
};

export const CodeEditorSyntaxStyles = SyntaxHighlighterSyntaxStyles;

type Props = {
    /**
     * Editor styles.
     */
    style?: CodeEditorStyleType;

    /**
     * Programming language to support.
     */
    language: Languages;

    /**
     * Syntax highlighting style.
     * @See https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_HLJS.MD
     */
    syntaxStyle?: typeof CodeEditorSyntaxStyles;

    /**
     * Initial value on render.
     */
    initialValue?: string;

    /**
     * On value change.
     */
    onChange?: (newValue: string) => void;

    /**
     * On key press.
     */
    onKeyPress?: (key: string) => void;

    /**
     * Whether to show line numbers next to each line.
     */
    showLineNumbers?: boolean;

    /**
     * Make the editor read only.
     */
    readOnly?: boolean;

    /**
     * Focus the code editor on component mount.
     */
    autoFocus?: boolean;
};

type PropsWithForwardRef = Props & {
    forwardedRef: React.Ref<TextInput>;
};

type TextInputSelectionType = {
    start: number;
    end: number;
};

const CodeEditor = (props: PropsWithForwardRef): JSX.Element => {
    const {
        style,
        language,
        syntaxStyle = CodeEditorSyntaxStyles.atomOneDark,
        initialValue = '',
        onChange,
        onKeyPress,
        showLineNumbers = false,
        readOnly = false,
        autoFocus = true,
        forwardedRef,
    } = props;

    const {
        width = undefined,
        height = undefined,
        marginTop = undefined,
        marginBottom = undefined,
        inputLineHeight = undefined,
        inputColor = 'rgba(0,0,0,0)',
        ...addedStyle
    } = style || {};

    const {
        fontFamily = Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
        fontSize = 16,
        padding = 16,
    } = addedStyle;

    const [value, setValue] = useState<string>(initialValue);
    const highlighterRef = useRef<ScrollView>(null);
    const inputRef = useRef<TextInput>(null);
    const inputSelection = useRef<TextInputSelectionType>({ start: 0, end: 0 });

    // Only when line numbers are showing
    const lineNumbersPadding = showLineNumbers ? 1.75 * fontSize : undefined;

    // Sync forwardedRef with inputRef
    useImperativeHandle(forwardedRef, () => inputRef.current!, [inputRef]);

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange, value]);

    // Negative values move the cursor to the left
    const moveCursor = (current: number, amount: number) => {
        const newPosition = current + amount;
        inputRef.current?.setNativeProps({
            selection: {
                start: newPosition,
                end: newPosition,
            },
        });
        return newPosition;
    };

    const addIndentation = (val: string) => {
        let cursorPosition = inputSelection.current.start - 1;

        // All lines before the cursor
        const preLines = val.substring(0, cursorPosition).split('\n');
        const indentSize = Indentation.getSuggestedIndentSize(preLines);
        let indentation = Indentation.createIndentString(indentSize);

        // Add newline and indentation on a regular brace pair
        const leftChar = val[cursorPosition - 1] || '';
        const rightChar = val[cursorPosition + 1] || '';
        if (Braces.isBracePair(leftChar, rightChar)) {
            let addedIndentionSize = Braces.isRegularBrace(leftChar)
                ? Math.max(indentSize - Indentation.INDENT_SIZE, 0)
                : indentSize;
            indentation += '\n' + Indentation.createIndentString(addedIndentionSize);
            // Don't update local cursor position to insert all new changes in one insert call
            moveCursor(cursorPosition, -addedIndentionSize);
        }

        return Strings.insertStringAt(val, cursorPosition, indentation);
    };

    const addClosingBrace = (val: string, key: string) => {
        let cursorPosition = inputSelection.current.start;
        cursorPosition = moveCursor(cursorPosition, -1);
        return Strings.insertStringAt(val, cursorPosition, Braces.getCloseBrace(key));
    };

    const handleChangeText = (text: string) => {
        setValue(Strings.convertTabsToSpaces(text));
    };

    const handleScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
        // Match text input scroll with syntax highlighter scroll
        const y = e.nativeEvent.contentOffset.y;
        highlighterRef.current?.scrollTo({ y, animated: false });
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const key = e.nativeEvent.key;
        switch (key) {
            case 'Enter':
                setTimeout(() => {
                    setValue((curr) => addIndentation(curr));
                }, 10);
                break;
            default:
                if (Braces.isOpenBrace(key)) {
                    setTimeout(() => {
                        setValue((curr) => addClosingBrace(curr, key));
                    }, 10);
                }
                break;
        }
        if (onKeyPress) {
            onKeyPress(key);
        }
    };

    const handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        inputSelection.current = e.nativeEvent.selection;
    };

    return (
        <View style={{ width, height, marginTop, marginBottom }}>
            <SyntaxHighlighter
                language={language}
                addedStyle={addedStyle}
                syntaxStyle={syntaxStyle}
                scrollEnabled={false}
                showLineNumbers={showLineNumbers}
                ref={highlighterRef}
            >
                {value}
            </SyntaxHighlighter>
            <TextInput
                style={[
                    styles.input,
                    {
                        lineHeight: inputLineHeight,
                        color: inputColor,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        padding,
                        paddingTop: padding,
                        paddingLeft: lineNumbersPadding,
                    },
                ]}
                value={value}
                onChangeText={handleChangeText}
                onScroll={handleScroll}
                onKeyPress={handleKeyPress}
                onSelectionChange={handleSelectionChange}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={autoFocus}
                keyboardType="ascii-capable"
                editable={!readOnly}
                ref={inputRef}
                multiline
            />
        </View>
    );
};

const CodeEditorWithForwardRef = React.forwardRef<TextInput, Props>((props, ref) => (
    <CodeEditor {...props} forwardedRef={ref} />
));

export default CodeEditorWithForwardRef;

const styles = StyleSheet.create({
    input: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        textAlignVertical: 'top',
    },
});
