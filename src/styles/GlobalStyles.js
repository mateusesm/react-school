import styled, { createGlobalStyle } from 'styled-components';

import { primaryColor, primaryDarkColor } from '../config/colors';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: ${primaryDarkColor};
    color: ${primaryDarkColor};
  }

  button {
    cursor: pointer;
    background: ${primaryColor};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 2px;
    font-weight: 700;
    transition: all 300ms;

    &:hover {
      filter: brightness(80%);
    }
  }

  a {
    text-decoration: none;
    color: ${primaryDarkColor};
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.div`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
