import Web3 from "web3";
import { memberApi } from "../api/member";
import { setLogIn } from "../stores/member";
import { setWallet } from "../stores/member";
import { isMobile } from "react-device-detect";
import sendToastMessage from "./sendToastMessage";

export const metamaskLogIn = async ({ dispatch, handleModalOpen }) => {
  if (!isMobile) {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const web3 = new Web3(window.ethereum);
          web3.eth.net.getId().then((chainId) => {
            const infuraWeb3 = new Web3(
              new Web3.providers.HttpProvider(
                "https://polygon-mumbai.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
              )
            );
            web3.setProvider(infuraWeb3.currentProvider);
            dispatch(setWallet({ walletAddress: accounts[0] }));

            memberApi
              .checkMemberAddress(accounts[0])
              .then(async ({ status }) => {
                if (status === 200) {
                  window.ethereum
                    .request({
                      method: "personal_sign",
                      params: ["don jo log in test", accounts[0], accounts[0]],
                    })
                    .then((signature) => {
                      const loginMemberCond = {
                        memberAddress: accounts[0],
                        signMessage: "don jo log in test",
                        memberSignature: signature,
                      };
                      memberApi
                        .login(loginMemberCond)
                        .then((res) => {
                          localStorage.setItem(
                            "accesstoken",
                            res.headers.accesstoken
                          );
                          sessionStorage.setItem(
                            "refreshtoken",
                            res.headers.refreshtoken
                          );
                          dispatch(
                            setLogIn({
                              pageName: res.data.pageName,
                              nickName: res.data.nickName,
                              themeColor: res.data.themeColor,
                              profileImagePath: res.data.imagePath,
                              walletAddress: accounts[0],
                            })
                          );
                        })
                        .catch((error) => {
                          sendToastMessage("Login Failed", "error");
                          console.log(
                            "An error occurred during the logIn process: ",
                            error
                          );
                        });
                    })
                    .catch((error) => {
                      sendToastMessage("Login Failed", "error");
                      console.log("[metamaskLogIn] failed : ", error);
                    });
                } else if (status === 204) {
                  handleModalOpen();
                }
              })
              .catch((error) => {
                sendToastMessage("Login Failed", "error");
                console.log("[metamaskLogIn] failed : ", error);
              });
          });
        })
        .catch((error) => {
          sendToastMessage("MetaMask is not logged in.", "error");
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
  } else {
    sendToastMessage("We do not support Mobile devices.", "error");
  }
};
