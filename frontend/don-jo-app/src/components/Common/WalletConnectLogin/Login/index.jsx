import * as S from "./style";
import PropTypes from "prop-types";
import React from "react";
import BasicTitle from "../../BasicTitle";
import BasicModal from "../../Modal/BasicModal";
import { useSignMessage } from "wagmi";
import { memberApi } from "../../../../api/member";
import { useDispatch } from "react-redux";
import { setLogIn } from "../../../../stores/member";

export const LogIn = ({
  isModalOpen,
  MemberAddress
}) => {
  const dispatch = useDispatch();
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const loginMemberCond = {
        memberAddress: MemberAddress.toLowerCase(),
        signMessage: variables.message,
        memberSignature: data,
      };
      memberApi
        .login(loginMemberCond)
        .then((res) => {
          console.log("로그인 성공: ", res);
          localStorage.setItem("accesstoken", res.headers.accesstoken);
          sessionStorage.setItem("refreshtoken", res.headers.refreshtoken);
          dispatch(
            setLogIn({
              pageName: res.data.pageName,
              nickName: res.data.nickName,
              themeColor: res.data.themeColor,
              profileImagePath: res.data.imagePath,
              walletAddress: MemberAddress,
            })
          );
        })
        .catch((error) => {
          console.log("login로그인 실패: ", error);
        });
    },
  });

  const handleCancleButtonClick = () => {
    document.body.style.overflow = "auto";
    isModalOpen(false);
  }

  const handleLoginButtonClick = async () => {
    await signMessage({ message: "don jo log in test" });
    isModalOpen(false);
  }

  return (
    <BasicModal handleSetShowModal={isModalOpen}>
      <S.ContentWrap>
        <S.RequiredInputWrapper>
          <BasicTitle text="Welcome To DonJo" />
        </S.RequiredInputWrapper>
      </S.ContentWrap>

      <S.CancleButton
        color="var(--color-primary)"
        onClick={handleCancleButtonClick}
      >Cancle</S.CancleButton>
      <S.LoginButton
        color="var(--color-primary)"
        onClick={handleLoginButtonClick}
      >LogIn</S.LoginButton>
    </BasicModal>
  );
};

export default LogIn;

LogIn.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  MemberAddress: PropTypes.string
};
