import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import Personal from "./pages/Personal";
import DashBoard from "./pages/DashBoard";
import Error from "./pages/Error";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { setWeb3 } from "./stores/member";

const AppRouter = () => {
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // Metamask Login이 안돼 있다면
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
    } else {
    }
  };

  const connectWallet = () => {
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

  useEffect(() => {
    connectWallet();
  }, []);

  // 로그인 여부 체크
  let isLogin = member.isLogin;
  console.log(member);

  if (!isLogin) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/:title" element={<GuideDetail />} />
          <Route path="/dashboard" element={<Error />} />
          <Route path="/:pageName" element={<Personal />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:title" element={<GuideDetail />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/:pageName" element={<Personal />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
