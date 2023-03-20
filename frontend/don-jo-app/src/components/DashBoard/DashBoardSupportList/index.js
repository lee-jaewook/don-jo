import React from "react";
import * as S from "./style";
import { useLocation } from "react-router-dom";
import BasicTitle from "../../Common/BasicTitle";
import ShowMoreButton from "../../Common/ShowMoreButton";
import DashBoardListItem from "../DashBoardListItem";
import { supportList } from "../../../data/dashboard";

const DashBoardSupportList = () => {
  const location = useLocation();

  const handleGetSupportList = () => {
    console.log("handleGetSupportList()...");
  };

  return (
    <S.SupportListWrapper>
      <S.SupportListHeader>
        <BasicTitle text="Recent Support" />
        {location.pathname === "/dashboard/home" && (
          <S.EmojiList>
            <S.EmojiItem>🙏 Wishlist</S.EmojiItem>
            <S.EmojiItem>💰 Donation</S.EmojiItem>
            <S.EmojiItem>📁 items</S.EmojiItem>
          </S.EmojiList>
        )}
      </S.SupportListHeader>
      <S.SupportList>
        {supportList && supportList.length > 0 ? (
          supportList.map((item, index) => (
            <DashBoardListItem
              key={item.uid}
              supportType={item.supportType}
              amountEth={item.amountEth}
              arrivedDate={item.arrivedDate}
              from={item.fromMember}
              to={item.toMember}
            />
          ))
        ) : (
          <label>There are no recent sponsorships.</label>
        )}
        {supportList.length >= 10 && (
          <ShowMoreButton handleOnClickButton={handleGetSupportList} />
        )}
      </S.SupportList>
    </S.SupportListWrapper>
  );
};

export default DashBoardSupportList;
