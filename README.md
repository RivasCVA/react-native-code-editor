## React Native Code Editor

[![npm-version](https://img.shields.io/npm/v/@rivascva/react-native-code-editor)](https://www.npmjs.com/package/@rivascva/react-native-code-editor) [![gh-actions-status](https://github.com/RivasCVA/react-native-code-editor/actions/workflows/lint-workflow.yml/badge.svg)](https://github.com/RivasCVA/react-native-code-editor/actions/workflows/lint-workflow.yml) [![license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/RivasCVA/react-native-code-editor/blob/v1.0.3/LICENSE)

A code editor with syntax highlighting built for React Native applications. The component is built on top of [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter). You can use it as a code editor or to display code snippets.

## Installation

```
npm install @rivascva/react-native-code-editor
```

## Contributing

Any contribution to make this component more extensible and efficient is welcome! Please give as much detail as possible about your bug fix or new feature in the pull request.

## Simple Usage

```js
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

const Example = (): JSX.Element => {
    return (
        <CodeEditor
            style={{
                fontSize: 20,
                inputLineHeight: 26,
                highlighterLineHeight: 26,
            }}
            language="javascript"
            syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
            showLineNumbers
        />
    );
};

export default Example;
```

<img src="https://user-images.githubusercontent.com/60367213/152731230-049a9bdf-e592-4d71-946d-9b2d2c608631.gif" height="600">

## Keyboard Alignment

Use the `marginBottom` style to accommodate the keyboard.

> Note: See [`useKeyboard`](https://github.com/react-native-community/hooks#usekeyboard) and [`useSafeAreaInsets`](https://github.com/th3rdwave/react-native-safe-area-context#usesafeareainsets) for details on the hooks.

```js
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

const Example = (): JSX.Element => {
    const keyboard = useKeyboard();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <CodeEditor
                style={{
                    ...{
                        fontSize: 20,
                        inputLineHeight: 26,
                        highlighterLineHeight: 26,
                    },
                    ...(keyboard.keyboardShown
                        ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                        : {}),
                }}
                language="javascript"
                syntaxStyle={CodeEditorSyntaxStyles.github}
                showLineNumbers
            />
        </SafeAreaView>
    );
};

export default Example;
```

<img src="https://user-images.githubusercontent.com/60367213/152732727-48a15db3-b7dd-4812-bf4d-dcfea9e5ca08.gif" height="600">

### Using React Navigator?

Checkout [`useBottomTabBarHeight`](https://reactnavigation.org/docs/bottom-tab-navigator/) for details on how to get the height of the bottom tab bar.

## Props

| Prop | Description |
| --- | --- |
| `style?` | Editor styles. More details [below](https://github.com/RivasCVA/react-native-code-editor#styles). |
| `language` | Programming language to support. View all [here](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD). |
| `syntaxStyle?` | Syntax highlighting style. View all [here](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_HLJS.MD). |
| `initialValue?` | Initial value on render. |
| `onChange?` | On value change. |
| `onKeyPress?` | On key press. |
| `showLineNumbers?` | Whether to show line numbers next to each line. |
| `readOnly?` | Make the editor read only. |
| `autoFocus?` | Focus the code editor on component mount. |

> Note: You must import `CodeEditorSyntaxStyles` to set a `syntaxStyle`.

## Styles

The `style?` prop has many custom styles to make the code editor as customizable as possible.

| Style | Description |
| --- | --- |
| `height?` | Editor height. |
| `width?` | Editor width. |
| `marginTop?` | Editor top margin. |
| `marginBottom?` | Editor bottom margin. |
| `fontFamily?` | Default is Menlo-Regular (iOS) and Monospace (Android). |
| `fontSize?` | Default is 16. |
| `backgroundColor?` | Override the syntax style background. |
| `padding?` | Default is 16. |
| `lineNumbersColor?` | Text color of the line numbers. |
| `lineNumbersBackgroundColor?` | Background color of the line numbers. |
| `inputLineHeight?` | Use this property to align the text input with the syntax highlighter text. |
| `inputColor?` | Use this property to help you align the text input with the syntax highlighter text. **Do not use in production**. |
| `highlighterLineHeight?` | Use this property to align the syntax highlighter text with the text input. |
| `highlighterColor?` | Use this property to help you align the syntax highlighter text with the text input. **Do not use in production**. |

> Note: You can import `CodeEditorStyleType` to type-check the styles.

## Important Issue

There is a small ongoing issue involving the cursor misaligning from the text. It is very likely you will encounter this issue, but it is fixable. Please view issue [#1](https://github.com/RivasCVA/react-native-code-editor/issues/1) for the current fix.

## Credits
* [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
* [React Native Syntax Highlighter](https://github.com/conorhastings/react-native-syntax-highlighter)
  * A specific [comment](https://github.com/conorhastings/react-native-syntax-highlighter/issues/26#issuecomment-780905175) from [@Almaju](https://github.com/Almaju) on an issue
