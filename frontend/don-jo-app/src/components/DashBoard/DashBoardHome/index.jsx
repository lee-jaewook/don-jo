import React from "react";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";
const DashBoardHome = () => {
  return (
    <div>
      <DashBoardEarning text="Earnings" />
      <DashBoardSupportList />
    </div>
  );
};

export default DashBoardHome;
