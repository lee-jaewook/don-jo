import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

  ${reset}

  @font-face {
    font-family: 'RobotoRegular';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
  }

  @font-face {
    font-family: 'RobotoMedium';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format('woff2');
  }

  @font-face {
    font-family: 'RobotoBold';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
  }

  @font-face {
    font-family: 'NotoSansKR';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/notosanskr/v27/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.119.woff2) format('woff2');
  }

  html {
  --color-text: #222222;
  --color-text-secondary: #999999;
  --color-primary: #222222;
  --color-background: #FFFFFF;
  --color-modal: #F7F7F7;
  font-size: 1rem;
}

body {
  margin: 0;
  font-family: "RobotoRegular", "NotoSansKR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
} 
`;

export default GlobalStyle;
