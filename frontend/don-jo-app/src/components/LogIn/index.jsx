import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import BasicModal from "../Common/Modal/BasicModal";
import BasicButton from "../Common/BasicButton";

const LogIn = ({ isModelOpen }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {};

  const children = () => {
    return (
      <>
        <BasicInput
          type="text"
          value={id}
          handleOnChangeValue={handleId}
          placeholder="아이디를 입력해주세요."
        />
        <BasicInput
          type="password"
          value={password}
          handleOnChangeValue={handlePassword}
          placeholder="비밀번호를 입력해주세요."
        />
        <BasicButton
          text="Submit"
          color="black"
          handleOnClickButton={handleSubmit}
        />
      </>
    );
  };

  return (
    <div>
      <BasicModal handleSetShowModal={isModelOpen} children={children()} />
    </div>
  );
};

export default LogIn;

LogIn.propTypes = {
  isModelOpen: PropTypes.func.isRequired,
};
