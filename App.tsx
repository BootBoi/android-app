import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from "./src/Main";
import {Router} from "react-native-router-flux";


export default function App() {
  return (
      <Router>
          <PaperProvider>
            <Main />
          </PaperProvider>
      </Router>
  );
}
