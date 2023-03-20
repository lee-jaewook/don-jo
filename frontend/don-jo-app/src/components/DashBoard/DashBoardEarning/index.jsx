import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicTitle from "../../Common/BasicTitle";
import DashBoardCard from "../DashBoardCard";
const DashBoardEarning = ({ text }) => {
  return (
    <S.EarningWrapper>
      <BasicTitle text={text} />
      <S.CardWrapper>
        <DashBoardCard
          className="first-card"
          classification="All"
          data="1000.000"
          isFirstCard={true}
        />
        <DashBoardCard classification="Last 30 days" data="85.090" />
        <DashBoardCard classification="Last 90 days" data="489.000" />
      </S.CardWrapper>
    </S.EarningWrapper>
  );
};

export default DashBoardEarning;

DashBoardEarning.protoTypes = {
  text: PropTypes.string.isRequired,
};
