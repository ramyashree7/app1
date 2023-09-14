import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ColorModeProvider } from './ColorModeContext';
ReactDOM.render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>,
  document.getElementById('root')
);
