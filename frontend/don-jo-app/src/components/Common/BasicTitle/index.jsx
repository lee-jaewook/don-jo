import React from "react";
import PropTypes from "prop-types";
import * as S from "./style";
const BasicTitle = ({ text }) => {
  return <S.Text>{text}</S.Text>;
};

export default BasicTitle;

BasicTitle.propTypes = {
  text: PropTypes.string.isRequired,
};
