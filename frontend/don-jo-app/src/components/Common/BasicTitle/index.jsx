import React from "react";
import PropTypes from "prop-types";
const BasicTitle = ({ text }) => {
  return <h1>{text}</h1>;
};

export default BasicTitle;

BasicTitle.propTypes = {
  text: PropTypes.string.isRequired,s
};
