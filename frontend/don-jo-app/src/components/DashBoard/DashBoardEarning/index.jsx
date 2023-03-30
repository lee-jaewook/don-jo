import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicTitle from "../../Common/BasicTitle";
import DashBoardCard from "../DashBoardCard";
import { calculateEth } from "../../../utils/calculateEth";
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
          data={calculateEth(result.all)}
          isFirstCard={true}
          unit={unit}
        />
        <DashBoardCard
          classification={
            location.pathname === "/dashboard/home"
              ? "Last 30 days"
              : "All Time"
          }
          data={calculateEth(result.period30)}
        />
        <DashBoardCard
          classification={
            location.pathname === "/dashboard/home"
              ? "Last 90 days"
              : "Last 30 days"
          }
          data={calculateEth(result.period90)}
        />
      </S.CardWrapper>
    </S.EarningWrapper>
  );
};

export default React.memo(DashBoardEarning);

DashBoardEarning.protoTypes = {
  text: PropTypes.string.isRequired,
  result: PropTypes.array.isRequired,
};
