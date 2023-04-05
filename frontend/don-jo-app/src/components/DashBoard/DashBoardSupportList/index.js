import React, { useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import BasicTitle from "../../Common/BasicTitle";
import ShowMoreButton from "../../Common/ShowMoreButton";
import DashBoardListItem from "../DashBoardListItem";
import { supportApi } from "../../../api/support";
import { useSelector } from "react-redux";
import { calculateEth } from "../../../utils/calculateEth";

const DashBoardSupportList = ({ type, pageNum, pageSize, setPageNum }) => {
  const [result, setResult] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const location = useLocation();
  const memberAddress = useSelector((state) => state.member.walletAddress);

  const handleGetSupportList = async () => {
    try {
      const {
        status,
        data: { supportList, hasMore },
      } = await supportApi.getSupportList(
        memberAddress,
        pageNum,
        pageSize,
        type
      );

      if (status === 200) {
        setResult(supportList);
        setHasMore(hasMore);
        setPageNum((prev) => prev + 1);
      }
    } catch (error) {
      console.log("[Dashboard] handleGetSupportList()... ", error);
    }
  };

  useEffect(() => {
    handleGetSupportList();
  }, []);

  return (
    <S.SupportListWrapper>
      <S.SupportListHeader>
        <BasicTitle text="Recent Support" />
        {location.pathname === "/dashboard/home" && (
          <S.EmojiList>
            <S.EmojiItem>🙏 Wishlist</S.EmojiItem>
            <S.EmojiItem>💰 Donation</S.EmojiItem>
            <S.EmojiItem>📁 Items</S.EmojiItem>
          </S.EmojiList>
        )}
      </S.SupportListHeader>
      <S.SupportList length={result.length}>
        {result && result.length > 0 ? (
          result.map((item, index) => (
            <DashBoardListItem
              key={index}
              supportType={item.supportType}
              amount={calculateEth(item.amount)}
              from={item.fromMember}
              arriveTimeStamp={item.arriveTimeStamp}
              transactionHash={item.transactionHash}
            />
          ))
        ) : (
          <S.Message>There are no recent sponsorships.</S.Message>
        )}
        {hasMore && (
          <ShowMoreButton handleOnClickButton={handleGetSupportList} />
        )}
      </S.SupportList>
    </S.SupportListWrapper>
  );
};

export default React.memo(DashBoardSupportList);

DashBoardSupportList.propTypes = {
  type: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.string.isRequired,
  setPageNum: PropTypes.func.isRequired,
};
