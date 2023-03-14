import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import Intro from "./pages/Intro";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import Personal from "./pages/Personal";
import DashBoard from "./pages/DashBoard";
import Error from "./pages/Error";

const AppRouter = () => {
  // 비로그인 상태인 경우(isLogin 임시 처리)
  let isLogin = true;
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
        <Route
          path="/dashboard"
          element={<Navigate replace to="/dashboard/home" />}
        />
        <Route path="/dashboard/:category" element={<DashBoard />} />
        <Route path="/:pageName" element={<Personal />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
