import React, { useState } from "react";
import * as S from "./style";
import { FiChevronDown } from "react-icons/fi";
import PropTypes from "prop-types";

const CustomSelect = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <S.SelectBox onClick={() => setIsDropdown((prev) => !prev)}>
      <S.Label>About</S.Label>
      <S.SelectOptions show={isDropdown}>
        <S.Option></S.Option>
        <S.Option></S.Option>
        <S.Option></S.Option>
      </S.SelectOptions>
    </S.SelectBox>
  );
};

export default CustomSelect;
