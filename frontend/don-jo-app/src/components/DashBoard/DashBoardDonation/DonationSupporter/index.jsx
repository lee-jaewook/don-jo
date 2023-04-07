import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";

const DonationSupporter = () => {
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const donationEarnings = await getEarningDataByType("donation");
    setResult(donationEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList
        type="donation"
        pageNum={pageNum}
        pageSize="10"
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default DonationSupporter;
