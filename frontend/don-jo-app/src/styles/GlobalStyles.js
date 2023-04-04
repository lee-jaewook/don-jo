import { createGlobalStyle } from "styled-components";
import BlackHanSans from "../assets/fonts/BlackHanSans.ttf";
import DoHyeon from "../assets/fonts/DoHyeon.ttf";
import Jua from "../assets/fonts/Jua.ttf";
import SunFlower from "../assets/fonts/Sunflower.ttf";
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

  @font-face {
    font-family: "RedHatDisplayRegular";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/redhatdisplay/v14/8vIQ7wUr0m80wwYf0QCXZzYzUoTg_T6h.woff2) format('woff2');
  }

  @font-face {
    font-family: "RedHatDisplayMedium";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/redhatdisplay/v14/8vIQ7wUr0m80wwYf0QCXZzYzUoTg_T6h.woff2) format('woff2');
  }   


  @font-face {
    font-family: "RedHatDisplayBold";
    font-style: normal;
    font-weight: bold;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/redhatdisplay/v14/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbouRQk8z-A.woff2) format('woff2');
  }   


 /** 버튼 생성시 사용되는 스타일 폰트  **/
  @font-face {
        font-family: 'Black Han Sans';
        src: local('BlackHanSans'), local('BlackHanSans');
        font-style: normal;
        src: url(${BlackHanSans}) format('truetype');
  }

  @font-face {
        font-family: 'DoHyeon';
        src: local('DoHyeon'), local('DoHyeon');
        font-style: normal;
        src: url(${DoHyeon}) format('truetype');
  }

  @font-face {
        font-family: 'Jua';
        src: local('Jua'), local('Jua');
        font-style: normal;
        src: url(${Jua}) format('truetype');
  }

  @font-face {
        font-family: 'SunFlower';
        src: local('SunFlower'), local('SunFlower');
        font-style: normal;
        src: url(${SunFlower}) format('truetype');
  }

  html {
  --color-text: #222222;
  --color-text-secondary: #666666;
  --color-text-third: #999999;
  --color-primary: #000000;
  --color-background: #FFFFFF;
  --color-background-secondary: #EAEAEA;
  --color-modal: #F7F7F7;
  --color-placeholder: #BBBBBB;
  --color-disabled : #DDDDDD;

  font-size: 1rem;
}

body {
  margin: 0;
  font-family: "RobotoRegular", "NotoSansKR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  background-color: var(--color-background);
} 

a{
  text-decoration: none;
  color: var(--color-text);
}

*{
  box-sizing: border-box;
}
  
input, textarea { 
  -moz-user-select: auto;
  -webkit-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  font-family: "RobotoRegular";
  line-height: 1.172rem;
  resize: none;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: var(--color-placeholder);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

textarea:focus {
  outline: none;
}
  
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
  
select {
  border: none;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

div {
  ::-webkit-scrollbar {
    width: 0.5rem;
    border: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-text-secondary);
    background-clip: padding-box;
    border-radius: 1.25rem;
  }
}
`;

export default GlobalStyle;
