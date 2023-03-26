import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";
const WishlistSupporter = () => {
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const wishlistEarnings = getEarningDataByType("wishlist");
    setResult(wishlistEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList type="wishlist" pageNum="0" pageSize="10" />
    </div>
  );
};

export default WishlistSupporter;
