import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import BasicModal from "../Common/Modal/BasicModal";

export const SignUp = ({ isModelOpen }) => {
  const children = () => {
    return <></>;
  };

  return (
    <div>
      <BasicModal
        handleSetShowModal={isModelOpen}
        children={children()}
      ></BasicModal>
    </div>
  );
};

export default SignUp;

SignUp.propTypes = {};
