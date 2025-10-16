import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalTokens: React.FC = () => (
  <Global
    styles={css`
      :root {
        --white: #ffffff;
        --white-90: rgba(255, 255, 255, 0.9);
        --white-80: rgba(255, 255, 255, 0.8);
        --white-70: rgba(255, 255, 255, 0.7);
        --white-60: rgba(255, 255, 255, 0.6);
        --white-50: rgba(255, 255, 255, 0.5);
        --white-40: rgba(255, 255, 255, 0.4);
        --white-30: rgba(255, 255, 255, 0.3);
        --white-20: rgba(255, 255, 255, 0.2);
        --white-10: rgba(255, 255, 255, 0.1);
        --light-gray: rgb(200, 200, 200);
        --light-gray-80: rgba(200, 200, 200, 0.8);
        --gray: #969696;
        --dark-gray: #323232;
        --dark-gray-85: rgba(50, 50, 50, 0.85);
        --dark-gray-10: rgba(50, 50, 50, 0.1);
        --black: #000000;
        --black-90: rgba(0, 0, 0, 0.9);
        --black-80: rgba(0, 0, 0, 0.8);
        --black-70: rgba(0, 0, 0, 0.7);
        --black-60: rgba(0, 0, 0, 0.6);
        --black-50: rgba(0, 0, 0, 0.5);
        --black-40: rgba(0, 0, 0, 0.4);
        --black-30: rgba(0, 0, 0, 0.3);
        --black-20: rgba(0, 0, 0, 0.2);
        --black-10: rgba(0, 0, 0, 0.1);
        --dark-red: #d00000;
        --red: #f23a29;
        --pink: #ff7495;
        --yellow: #ffcf55;
        --lime-yellow: #e2f229;
        --green: #8ed953;
        --blue: rgba(85, 209, 255, 1);
        --blue-50: rgba(85, 209, 255, 0.5);
        --deep-blue: #5379d9;
        --purple: #8e69ff;

        /* Task card gradient colors */
        --training-start: #ff7495;
        --training-end: #8e69ff;
        --reading-start: #e2f229;
        --reading-end: #ffcf55;
        --practice-start: #ff3333;
        --practice-end: #d00000;
      }
    `}
  />
);

export default GlobalTokens;
