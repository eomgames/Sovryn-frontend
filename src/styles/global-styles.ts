import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Mulish', 'PT Sans', sans-serif;
    font-size: 18px;
    background-color: #202020;
    color: white;
  }

  #root {
    min-height: 100vh;
    min-width: 100vw;
  }

  p,
  label {
    font-family: 'PT Sans', sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
