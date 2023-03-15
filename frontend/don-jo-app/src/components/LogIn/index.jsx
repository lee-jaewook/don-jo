import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import * as S from "./style";

const LogIn = () => {
  const handleOnChangeValue = () => {};

  return (
    <S.Container>
      <BasicInput
        type="text"
        value=""
        handleOnChangeValue
        placeholder
        isReadOnly
      />

      <BasicInput type="password" />
    </S.Container>
  );
};

export default LogIn;
