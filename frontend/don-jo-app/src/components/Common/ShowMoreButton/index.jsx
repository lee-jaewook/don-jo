import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown.js";
const ShowMoreButton = ({ handleOnClickButton }) => {
  return (
    <S.Button onClick={handleOnClickButton}>
      Show More <FiChevronDown size="16px" />
    </S.Button>
  );
};

export default ShowMoreButton;

ShowMoreButton.propTypes = {
  handleOnClickButton: PropTypes.func.isRequired,
};
