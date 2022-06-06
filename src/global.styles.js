import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`body{
  
    padding: 20px 80px;
    @media screen and (max-width: 800px) {
        padding: 5px;
    }
  }
  a{
    text-decoration: none;
    color: black;
  }
  *{
    box-sizing: border-box;
    font-family: 'Fira Sans Condensed';
  }
  
  .css-sghohy-MuiButtonBase-root-MuiButton-root{
    font-family: 'Fira Sans Condensed' !important;
  }
  `;
