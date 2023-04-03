import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { calculateEth } from "../../../utils/calculateEth";
const DashBoardCard = ({
  isFirstCard = false,
  classification,
  data = 0,
  unit = "MATIC",
}) => {
  return (
    <S.Container>
      <S.Classification isFirstCard={isFirstCard}>
        {classification}
      </S.Classification>
      <S.Data isFirstCard={isFirstCard}>
        {classification === "Supporters" ? data : calculateEth(data)}
        <S.Unit isFirstCard={isFirstCard}>{unit}</S.Unit>
      </S.Data>
    </S.Container>
  );
};
export default DashBoardCard;

DashBoardCard.propTypes = {
  isFirstCard: PropTypes.bool,
  classification: PropTypes.string.isRequired,
  unit: PropTypes.string,
};
