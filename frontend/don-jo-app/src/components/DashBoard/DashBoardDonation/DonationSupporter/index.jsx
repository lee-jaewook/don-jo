import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";
const DonationSupporter = () => {
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const donationEarnings = getEarningDataByType("donation");
    setResult(donationEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList type="donation" pageNum="0" pageSize="10" />
    </div>
  );
};

export default DonationSupporter;
