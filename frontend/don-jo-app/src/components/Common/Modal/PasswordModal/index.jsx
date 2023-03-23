import * as S from "./style";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";

const PasswordModal = ({ handleSetShowModal }) => {
  const [password, setPassword] = useState("");
  //   const PASSWORD_MAX_LENGTH = 6;

  //0~9 배열
  const nums = Array.from({ length: 10 }, (v, k) => k);
  //키패드에 보여줄 12개
  const [showNums, setShowNums] = useState([]);

  //0~9 숫자 섞는 함수
  const shuffle = () => {
    const copyNums = [...nums];

    let numsLength = copyNums.length;
    while (numsLength) {
      let randomIndex = Math.floor(numsLength-- * Math.random());
      let temp = copyNums[randomIndex];
      copyNums[randomIndex] = copyNums[numsLength];
      copyNums[numsLength] = temp;
    }

    //섞여진 0~9 배열에 빈칸(10)과 지우기 버튼(11) 추가
    copyNums.splice(9, 0, 10);
    copyNums.splice(11, 0, 11);
    setShowNums(copyNums);
  };

  useEffect(() => {
    if (password.length >= 6) {
      handleSetShowModal(false);
      console.log(password);
    }
    shuffle();
  }, [password]);

  //패스워드 업데이트
  const updatePassword = (n) => {
    setPassword(password + n.toString());
  };

  //패스워드 지우기
  const deletePassword = (n) => {
    if (password.length > 1) {
      setPassword(password.slice(0, -1));
    }
  };

  return (
    <BasicModal handleSetShowModal={handleSetShowModal}>
      <S.Title>Set Password</S.Title>
      <S.Description>
        Set the password to use for login and payment.
      </S.Description>
      <S.PasswordContainer>
        <S.PasswordWrapper>
          {[...Array(6)].map((_, index) => {
            return <S.Circle key={index} isEnable={index < password.length} />;
          })}
        </S.PasswordWrapper>
      </S.PasswordContainer>
      <S.KeypadContainer>
        {showNums.map((n, i) => {
          const BasicButton = (
            <S.KeypadButton
              onClick={() => {
                updatePassword(n);
              }}
              key={i}
            >
              {n}
            </S.KeypadButton>
          );
          return i === 9 ? (
            <S.KeypadButton key={i} />
          ) : i === 11 ? (
            <S.KeypadButton
              key={i}
              onClick={() => {
                deletePassword();
              }}
            >
              <FiDelete size="28" />
            </S.KeypadButton>
          ) : (
            BasicButton
          );
        })}
      </S.KeypadContainer>
    </BasicModal>
  );
};

export default PasswordModal;

PasswordModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
