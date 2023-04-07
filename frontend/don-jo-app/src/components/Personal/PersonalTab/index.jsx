import React from "react";
import * as S from "./style";
import PropTypes from "prop-types";

const PersonalTab = ({ currentItem, changeItem }) => {
  return (
    <S.TabWrapper>
      <S.Tabs>
        <S.TabItem
          current={currentItem.index === 0 ? 1 : 0}
          onClick={() => changeItem(0)}
        >
          Home
          <S.Indicator current={currentItem.index === 0 ? 1 : 0} />
        </S.TabItem>
        <S.TabItem
          current={currentItem.index === 1 ? 1 : 0}
          onClick={() => changeItem(1)}
        >
          Items
          <S.Indicator current={currentItem.index === 1 ? 1 : 0} />
        </S.TabItem>
        <S.TabItem
          current={currentItem.index === 2 ? 1 : 0}
          onClick={() => changeItem(2)}
        >
          Wishlist
          <S.Indicator current={currentItem.index === 2 ? 1 : 0} />
        </S.TabItem>
      </S.Tabs>
    </S.TabWrapper>
  );
};

export default PersonalTab;

PersonalTab.propTypes = {
  currentItem: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }).isRequired,
  changeItem: PropTypes.func.isRequired,
};
