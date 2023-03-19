import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BasicLink = ({ text, to }) => {
  return <Link to={to}>{text}</Link>;
};

export default BasicLink;

BasicLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
