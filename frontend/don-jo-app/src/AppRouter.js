import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import Personal from "./pages/Personal";
import DashBoard from "./pages/DashBoard";
import Error from "./pages/Error";
import { useDispatch, useSelector } from "react-redux";

import { connectWallet } from "./utils/connectWallet";

const AppRouter = () => {
  const member = useSelector((state) => state.member);
  const webState = useSelector((state) => state.web3);
  const dispatch = useDispatch();

  useEffect(() => {
    connectWallet(dispatch);
  }, []);

  // 로그인 여부 체크
  let isLogin = member.isLogin;
  console.log(webState);

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
