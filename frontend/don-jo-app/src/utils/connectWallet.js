import Web3 from "web3";
import { setWeb3 } from "../stores/member";

export const connectWallet = (dispatch) => {
  // 메타마스크 설치 여부 확인
  if (typeof window.ethereum !== "undefined") {
    // 메타마스크 설치되어 있으면, 로그인 요청
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        const web3 = new Web3(window.ethereum);
        web3.eth.net.getId().then((chainId) => {
          const infuraWeb3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
            )
          );
          web3.setProvider(infuraWeb3.currentProvider);
          dispatch(setWeb3({ web3: web3 }));
        });
        console.log("MetaMask is connected");

        // MetaMask 계정 변경 및 로그아웃 시, Redux Store 업데이트
        window.ethereum.on("accountsChanged", (newAccounts) => {
          if (newAccounts.length > 0) {
            // 계정 변경 시, 계정 정보 업데이트
            const newWeb3 = new Web3(window.ethereum);
            newWeb3.eth.net.getId().then((chainId) => {
              const infuraWeb3 = new Web3(
                new Web3.providers.HttpProvider(
                  "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
                )
              );
              newWeb3.setProvider(infuraWeb3.currentProvider);
              dispatch(setWeb3({ web3: newWeb3 }));
              console.log("MetaMask account changed: ");
            });
          } else {
            // 로그아웃 시, Web3 객체 및 계정 정보 초기화
            const newWeb3 = new Web3(window.ethereum);
            const infuraWeb3 = new Web3(
              new Web3.providers.HttpProvider(
                "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
              )
            );
            newWeb3.setProvider(infuraWeb3.currentProvider);
            dispatch(setWeb3({ web3: newWeb3 }));
            console.log("MetaMask account disconnected");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        alert("MetaMask에 로그인하지 않았습니다.");
      });
  } else {
    // Metamask를 설치할 수 있도록 코드 추가...
    const downloadLink = "https://metamask.io/download.html";
    const message =
      "MetaMask 확장 프로그램이 설치되어 있지 않습니다. 다운로드 페이지로 이동하시겠습니까?";

    if (window.confirm(message)) {
      window.open(downloadLink, "_blank");
    }
  }
};
