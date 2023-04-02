import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
const DashBoardCard = ({
  isFirstCard = false,
  classification,
  data,
  unit = "MATIC",
}) => {
  return (
    <S.Container>
      <S.Classification isFirstCard={isFirstCard}>
        {classification}
      </S.Classification>
      <S.Data isFirstCard={isFirstCard}>
        {data}
        <S.Unit isFirstCard={isFirstCard}>{unit}</S.Unit>
      </S.Data>
    </S.Container>
  );
};
export default React.memo(DashBoardCard);

DashBoardCard.propTypes = {
  isFirstCard: PropTypes.bool,
  classification: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  unit: PropTypes.string,
};
