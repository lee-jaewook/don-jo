import React from "react";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";

const DashBoardHome = () => {
  return (
    <>
      <DashBoardEarning text="Earnings" />
      <DashBoardSupportList />
    </>
  );
};

export default DashBoardHome;
