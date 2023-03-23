import React, { useEffect, useState } from "react";
import { supportApi } from "../../../api/support";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";
const DashBoardHome = () => {
  const [result, setResult] = useState([]);
  const earningData = [0, 30, 90];

  const handleGetEarning = async () => {
    const homeEarnings = [];

    earningData.map(async (earning) => {
      try {
        const { data } = await supportApi.getAllEarnings(earning, "all");
        homeEarnings.push(data);
      } catch (error) {
        console.log("error: ", error);
      }
    });

    setResult([...homeEarnings]);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Earnings" result={result} />
      <DashBoardSupportList />
    </div>
  );
};

export default DashBoardHome;
