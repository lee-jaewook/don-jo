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
  // const dispatch = useDispatch();
  // // Metamask Login이 안돼 있다면

  // const handleAccountsChanged = (accounts) => {
  //   if (accounts.length === 0) {
  //   } else {
  //   }
  // };

  // const connectWallet = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     // 메타마스크 설치되어 있으면, 로그인 요청
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       console.log("MetaMask is connected");
  //     } catch (error) {
  //       // 메타마스크가 설치는 되어 있지만, 로그인은 안된 상태.
  //     }
  //   }

  //   try {
  //     const web3 = new Web3(window.ethereum);
  //     web3.eth.net.getId().then((chainId) => {
  //       const infuraWeb3 = new Web3(
  //         new Web3.providers.HttpProvider(
  //           "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
  //         )
  //       );
  //       web3.setProvider(infuraWeb3.currentProvider);
  //       dispatch(setWeb3(web3));
  //       window.ethereum.on("accountsChanged", handleAccountsChanged);
  //     });
  //   } catch {
  //     console.log("error!!!");
  //   }
  // };
  // useEffect(() => {
  //   connectWallet();
  // }, [member.web3]);

  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     // 이벤트 리스너 등록
  //     window.ethereum.on("accountsChanged", handleAccountsChanged);

  //     // cleanup 함수에서 이벤트 리스너 제거
  //     return () => {
  //       window.ethereum.off("accountsChanged", handleAccountsChanged);
  //     };
  //   }
  // }, []);

  // if (typeof window.ethereum !== "undefined") {
  //   connectWallet();
  // } else {
  //   console.log("이미 로그인돼있음");
  // }
  // 로그인 여부 체크
  let isLogin = member.isLogin;
  // console.log(member);

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
