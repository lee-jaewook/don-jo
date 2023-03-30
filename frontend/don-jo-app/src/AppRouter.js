import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Common/Header";
import { handleWalletChange } from "./utils/handleWalletChange";
import { isMobile } from "react-device-detect";

const Intro = lazy(() => import("./pages/Intro"));
const Personal = lazy(() => import("./pages/Personal"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Error = lazy(() => import("./pages/Error"));

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMobile && window.ethereum) {
      window.ethereum.on("accountsChanged", (newAccounts) => {
        handleWalletChange(newAccounts, dispatch);
      });
    }
  }, []);

  // 로그인 여부 체크
  const isLogin = useSelector((state) => state.member.isLogIn);

  if (!isLogin) {
    return (
      <Router>
        <Suspense fallback={null}>
          <Header />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/dashboard" element={<Error />} />
            <Route path="/:pageName" element={<Personal />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    );
  }

  return (
    <Router>
      <Suspense fallback={null}>
        <Header />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route
            path="/dashboard"
            element={<Navigate replace to="/dashboard/home" />}
          />
          <Route path="/dashboard/:category" element={<DashBoard />} />
          <Route path="/:pageName" element={<Personal />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
