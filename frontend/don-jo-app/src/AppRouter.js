import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleWalletChange } from "./utils/handleWalletChange";
import { isMobile } from "react-device-detect";

const Header = lazy(() => import("./components/Common/Header"));
const Footer = lazy(() => import("./components/Common/Footer"));
const Intro = lazy(() => import("./pages/Intro"));
const Personal = lazy(() => import("./pages/Personal"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Error = lazy(() => import("./pages/Error"));

const PrivateRoutes = ({ isLogin, component }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return component;
};

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMobile && window.ethereum) {
      window.ethereum.on("accountsChanged", (newAccounts) => {
        handleWalletChange(newAccounts, dispatch);
      });
    }
  }, []);

  const isLogin = useSelector((state) => state.member.isLogIn);

  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="/:pageName" element={<Personal />} />
            <Route path="/:pageName/items/:itemId" element={<Personal />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes
                  isLogin={isLogin}
                  component={<Navigate replace to="/dashboard/home" />}
                />
              }
            />
            <Route
              path="/dashboard/:category"
              element={
                <PrivateRoutes isLogin={isLogin} component={<DashBoard />} />
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default AppRouter;
