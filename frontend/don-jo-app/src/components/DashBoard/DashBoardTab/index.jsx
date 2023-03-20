import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";
const DashBoardTab = ({ currentItem, changeItem }) => {
  return (
    <S.TabWrapper>
      <S.Tabs>
        <S.TabItem
          current={currentItem.index === 0 ? 1 : 0}
          onClick={() => changeItem(0)}
        >
          Supporters
          <S.Indicator current={currentItem.index === 0 ? 1 : 0} />
        </S.TabItem>
        <S.TabItem
          current={currentItem.index === 1 ? 1 : 0}
          onClick={() => changeItem(1)}
        >
          Setting
          <S.Indicator current={currentItem.index === 1 ? 1 : 0} />
        </S.TabItem>
      </S.Tabs>
    </S.TabWrapper>
  );
};

export default DashBoardTab;
DashBoardTab.propTypes = {
  currentItem: PropTypes.object.isRequired,
  changeItem: PropTypes.func.isRequired,
};
