import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicTitle from "../../Common/BasicTitle";
import DashBoardCard from "../DashBoardCard";
import { useLocation } from "react-router-dom";
const DashBoardEarning = ({ text, result, unit }) => {
  const location = useLocation();

  return (
    <S.EarningWrapper>
      <BasicTitle text={text} />
      <S.CardWrapper>
        <DashBoardCard
          className="first-card"
          classification={
            location.pathname === "/dashboard/home" ? "All" : "Supporters"
          }
          data={result[0]}
          isFirstCard={true}
          unit={unit}
        />
        <DashBoardCard
          classification={
            location.pathname === "/dashboard/home"
              ? "Last 30 days"
              : "All Time"
          }
          data={result[1]}
        />
        <DashBoardCard
          classification={
            location.pathname === "/dashboard/home"
              ? "Last 90 days"
              : "Last 30 days"
          }
          data={result[2]}
        />
      </S.CardWrapper>
    </S.EarningWrapper>
  );
};

export default DashBoardEarning;

DashBoardEarning.protoTypes = {
  text: PropTypes.string.isRequired,
  result: PropTypes.array.isRequired,
};
