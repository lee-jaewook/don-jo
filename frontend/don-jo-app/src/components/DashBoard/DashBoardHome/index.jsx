import React, { useCallback, useEffect, useState } from "react";
import { supportApi } from "../../../api/support";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";
const earningData = [0, 30, 90];

const DashBoardHome = () => {
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);

  const handleGetEarning = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Earnings" result={result} />
      <DashBoardSupportList
        pageNum={pageNum}
        pageSize="10"
        type="all"
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default React.memo(DashBoardHome);
