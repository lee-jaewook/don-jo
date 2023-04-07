import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";

const ItemsSupporter = () => {
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const itemsEarnings = await getEarningDataByType("item");
    setResult(itemsEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList
        type="item"
        pageNum={pageNum}
        pageSize="10"
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default ItemsSupporter;
