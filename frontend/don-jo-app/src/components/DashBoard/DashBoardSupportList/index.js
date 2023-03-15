import React from "react";
import { useLocation } from "react-router-dom";
import BasicTitle from "../../Common/BasicTitle";
import ShowMoreButton from "../../Common/ShowMoreButton";
import DashBoardListItem from "../DashBoardListItem";
import * as S from "./style";

const supportList = [
  {
    uid: 1,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 2,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 3,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 4,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 5,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 6,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 7,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 8,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 9,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 10,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
  {
    uid: 11,
    amountEth: 100.0,
    arrivedDate: "2023.02.01",
    from: {
      userNickname: "taebong",
    },
    to: {},
  },
];
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
