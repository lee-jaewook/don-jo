import * as S from "./style";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";

export const PasswordModal = ({ handleSetShowModal }) => {
  const closeModal = () => {
    handleSetShowModal(false);
  };

  const [password, setPassword] = useState("");
  //   const PASSWORD_MAX_LENGTH = 6;

  //0~9 배열
  const nums = Array.from({ length: 10 }, (v, k) => k);
  //키패드에 보여줄 12개
  const [showNums, setShowNums] = useState([]);

  //초기 shuffle
  useEffect(() => {
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
  }, []);

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

  //패스워드 업데이트
  const updatePassword = (n) => {
    setPassword(password + n.toString());
  };

  return (
    <div>
      <S.BackgroundOpacity />
      <S.BackgroundBlur onClick={() => closeModal()} />
      <S.Modal>
        <S.CloseContainer>
          <FiX size="26" color="#666666" onClick={() => closeModal()} />
        </S.CloseContainer>
        <S.Title>Set Password</S.Title>
        <S.Description>
          Set the password to use for login and payment.
        </S.Description>
        <S.PasswordContainer>여기에비밀번호!</S.PasswordContainer>
        <S.KeypadContainer>
          {showNums.map((n, i) => {
            const BasicButton = (
              <S.KeypadButton
                onClick={() => {
                  shuffle(nums);
                  updatePassword(n);
                }}
                key={i}
              >
                {n}
              </S.KeypadButton>
            );
            return i === 9 ? (
              <S.KeypadButton />
            ) : i === 11 ? (
              <S.KeypadButton>
                <FiDelete size="28" />
              </S.KeypadButton>
            ) : (
              BasicButton
            );
          })}
        </S.KeypadContainer>
      </S.Modal>
    </div>
  );
};
