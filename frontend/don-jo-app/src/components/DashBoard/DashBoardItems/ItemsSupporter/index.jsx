import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";
const ItemsSupporter = () => {
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const itemsEarnings = getEarningDataByType("item");
    setResult(itemsEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList type="item" pageNum="0" pageSize="10" />
    </div>
  );
};

export default ItemsSupporter;
