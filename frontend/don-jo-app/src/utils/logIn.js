import Web3 from "web3";
import { setWeb3 } from "../stores/web3";
import SignUp from "../components/SignUp";
import { memberApi } from "../api/member";

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

          // 우리 회원인지 아닌지
          memberApi
            .checkMemberAddress(accounts[0])
            .then(async ({ status }) => {
              if (status === 200) {
                // 서명 데이터 만들기...
                console.log(web3.eth);
                console.log(typeof accounts[0]);

                window.ethereum
                  .request({
                    method: "personal_sign",
                    params: [accounts[0], accounts[0], "Example password"],
                  })
                  .then((signature) => {
                    const loginMemberCond = {
                      memberAddress: accounts[0],
                      memberSignature: signature,
                    };
                    // 로그인
                    memberApi
                      .login(loginMemberCond)
                      .then((res) => {
                        console.log("로그인 성공: ", res);
                        localStorage.setItem(
                          "accesstoken",
                          res.headers.accesstoken
                        );
                        sessionStorage.setItem(
                          "refreshtoken",
                          res.headers.refreshtoken
                        );
                      })
                      .catch((error) => {
                        console.log("login로그인 실패: ", error);
                      });
                  })
                  .catch((error) => {
                    console.error("error ㅠㅠ: ", error);
                  });
              } else if (status === 204) {
                console.log("비회원입니다: ", status);
                handleModalOpen();
              }
            })
            .catch((error) => {
              console.log("error: ", error);
              alert("다시 로그인 해주세요.");
            });
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
