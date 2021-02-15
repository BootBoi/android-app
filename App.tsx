import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperTheme,
} from 'react-native-paper';
import Main from './src/Main';
import {
  NavigationContainer,
  DefaultTheme as NavigationTheme,
} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <PaperProvider theme={PaperTheme}>
        <Main />
      </PaperProvider>
    </NavigationContainer>
  );
}
