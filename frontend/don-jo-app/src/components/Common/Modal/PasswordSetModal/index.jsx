import * as S from "./style";
import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";

const PasswordSetModal = ({ handleSetShowModal }) => {
  const [prevPassword, setPrevPassword] = useState("init");
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  //패스워드 모달 창 닫기
  const closeModal = () => {
    document.body.style.overflow = "auto";
    handleSetShowModal(false);
  };

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
    shuffle();
  }, []);

  useEffect(() => {
    if (password.length >= 6) {
      if (prevPassword === "init") {
        setPrevPassword(password);
        setPassword("");
        shuffle();
      }
      // 이전 비밀번호와 일치한지
      else if (prevPassword === password) {
        console.log("비밀번호 일치: ", password);
        closeModal();
      }
      // 이전 비밀번호와 다르다면
      else {
        setIsWrong(true);
        setTimeout(() => {
          setIsWrong(false);
          setPrevPassword("init");
          setPassword("");
          shuffle();
        }, 2000);
      }
    }
  }, [password]);

  //패스워드 업데이트
  const updatePassword = (n) => {
    setPassword(password + n.toString());
  };

  //패스워드 지우기
  const deletePassword = (n) => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  return (
    <BasicModal handleSetShowModal={handleSetShowModal} width={1}>
      <S.Title isWrong={isWrong}>
        {isWrong ? (
          <label>Wrong Password</label>
        ) : prevPassword === "init" ? (
          <label>Set Password</label>
        ) : (
          <label>Confirm Password</label>
        )}
      </S.Title>
      <S.Description isWrong={isWrong}>
        {isWrong ? (
          <label>Try again</label>
        ) : prevPassword === "init" ? (
          <label>Set the password to use for login and payment.</label>
        ) : (
          <label>Enter the same password as the previous one.</label>
        )}
      </S.Description>
      <S.PasswordContainer>
        <S.PasswordWrapper>
          {[...Array(6)].map((_, index) => {
            return (
              <S.Circle
                key={index}
                isEnable={index < password.length}
                isWrong={isWrong}
              />
            );
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

export default PasswordSetModal;

PasswordSetModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};
