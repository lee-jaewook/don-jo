import React, { useEffect, useState } from "react";
import { getEarningDataByType } from "../../../../utils/getEarningDataByType";
import DashBoardEarning from "../../DashBoardEarning";
import DashBoardSupportList from "../../DashBoardSupportList";
const WishlistSupporter = () => {
  const [pageNum, setPageNum] = useState(0);
  const [result, setResult] = useState([]);

  const handleGetEarning = async () => {
    const wishlistEarnings = await getEarningDataByType("wishlist");
    setResult(wishlistEarnings);
  };

  useEffect(() => {
    handleGetEarning();
  }, []);

  return (
    <div>
      <DashBoardEarning text="Data" result={result} unit="" />
      <DashBoardSupportList
        type="wishlist"
        pageNum={pageNum}
        pageSize="10"
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default WishlistSupporter;
