import React, { useCallback, useEffect, useState } from "react";
import { supportApi } from "../../../api/support";
import DashBoardEarning from "../DashBoardEarning";
import DashBoardSupportList from "../DashBoardSupportList";

const DashBoardHome = () => {
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);

  const handleGetEarning = useCallback(async () => {
    const homeEarnings = [];

    try {
      const { data: allData } = await supportApi.getAllEarnings(0, "all");
      const { data: dataOf30 } = await supportApi.getAllEarnings(30, "all");
      const { data: dataOf90 } = await supportApi.getAllEarnings(90, "all");
      homeEarnings.push(allData);
      homeEarnings.push(dataOf30);
      homeEarnings.push(dataOf90);
    } catch (error) {
      console.log("[Dashboard - Home] handleGetEarning()... ", error);
    }
    setResult(homeEarnings);
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
