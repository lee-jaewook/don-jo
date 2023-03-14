import { useState } from "react";
import * as S from "./style";
import { FiChevronDown } from "react-icons/fi";
import PropTypes from "prop-types";

const SelectBox = ({ width }) => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <S.SelectBox width={width}>
      <S.Label onClick={() => setIsDropdown((prev) => !prev)}>
        Guide
        <S.Icon>
          <FiChevronDown size="18" color="var(--color-text)" />
        </S.Icon>
      </S.Label>
      {isDropdown && (
        <S.SelectOptions>
          <S.Option>Guide1</S.Option>
          <S.Option>Guide2</S.Option>
          <S.Option>Guide3</S.Option>
        </S.SelectOptions>
      )}
    </S.SelectBox>
  );
};

export default SelectBox;

SelectBox.propTypes = {
  width: PropTypes.func,
};
