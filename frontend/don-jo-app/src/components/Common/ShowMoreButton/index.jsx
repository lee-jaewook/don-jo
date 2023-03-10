import React from "react";
import PropTypes from "prop-types";
const ShowMoreButton = ({ handleOnClickButton }) => {
  return <button onClick={handleOnClickButton}>Show More</button>;
};

export default ShowMoreButton;

ShowMoreButton.propTypes = {
  handleOnClickButton: PropTypes.func.isRequired,
};
