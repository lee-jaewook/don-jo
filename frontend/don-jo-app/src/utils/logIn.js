import Web3 from "web3";
import { setWeb3 } from "../stores/web3";
import SignUp from "../components/SignUp";

/**
 * 로그인 함수
 * 메타마스크 설치 여부 + 지갑 연결 체크 + 회원 체크
 * 회원이면, 로그인
 * 회원이 아니면, 회원가입 모달
 * @param {*} param0
 * @param {}
 */

export const logIn = ({ dispatch, handleModalOpen }) => {
  // 메타마스크 설치 여부 확인
  if (typeof window.ethereum !== "undefined") {
    // 메타마스크 설치되어 있으면, 로그인 요청
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Account: ", accounts);
        const web3 = new Web3(window.ethereum);
        web3.eth.net.getId().then((chainId) => {
          const infuraWeb3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
            )
          );
          web3.setProvider(infuraWeb3.currentProvider);
          dispatch(setWeb3({ web3: web3, walletAddress: accounts[0] }));

          // 여기서 우리 회원인지 체크하고,
          // 여기는 memberAddress를 보냄.
          // 우리 회원이 아니면
          // if(signUprequired){
          //
          // }
          // else {
          //우리 회원이면 로그인...
          // 로그인 시에는 MetaMask에 서명 요청
          // 서명 요청 코드
          //   web3.eth.personal.sign(accounts[0], accounts[0])
          //   .then((signature) => {
          //     // 로그인
          //   })
          //   //
          //   .catch((error) => {
          //     console.error("error: ", error);
          //   })
          // //
          // // }
          // console.log("우리 회원인지 체크");
          // console.log("우리 회원이 아니네요");
          // // 우리 회원이 아니면 회원가입 모달...
          handleModalOpen();
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
              dispatch(
                setWeb3({ web3: newWeb3, walletAddress: newAccounts[0] })
              );
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
            dispatch(setWeb3({ web3: newWeb3, walletAddress: "" }));
            console.log("MetaMask account disconnected");
          }
        });
      })
      .catch((error) => {
        console.log("error: ", error);
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
