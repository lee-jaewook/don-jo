import GlobalStyle from "./styles/GlobalStyles";
import AppRouter from "./AppRouter";
import { ToastContainer } from "react-toastify";
import { projectId, ethereumClient } from "./api/wagmi/walletConnectSetting";
import { Web3Modal } from "@web3modal/react";
import "react-toastify/dist/ReactToastify.css";

// 모바일 웹에서 올바른 영역을 잡기 위한 작업
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// 화면 크기 변경 감지
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={false} />
      <GlobalStyle />
      <AppRouter />
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "var(--color-primary)",
          "--w3m-background-color": "var(--color-primary)",
        }}
      />
    </div>
  );
};

export default App;
