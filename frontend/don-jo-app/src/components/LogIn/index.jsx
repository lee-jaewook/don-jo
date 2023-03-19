import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasicInput from "../Common/BasicInput";
import BasicModal from "../Common/Modal/BasicModal";
import BasicButton from "../Common/BasicButton";

import * as S from "./style";

const LogIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <BasicButton text="Submit" handleOnClickButton={handleSubmit} />
      </>
    );
  };

  return (
    <div>
      <BasicModal handleSetShowModal={setIsModalOpen} children={children()} />
    </div>
  );
};

export default LogIn;
