import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Example from './Example';

const App = (): JSX.Element => {
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Example />
        </SafeAreaProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282c34',
    },
});
