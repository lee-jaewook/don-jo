import * as S from "./style";
import PropTypes from "prop-types";
import React from "react";
import BasicButton from "../../BasicButton";
import BasicModal from "../../Modal/BasicModal";
import { useSignMessage } from "wagmi";
import { memberApi } from "../../../../api/member";
import { useDispatch } from "react-redux";
import { setLogIn } from "../../../../stores/member";
import Logo from "../../../../assets/img/common/app-logo.svg";

export const LogIn = ({ setIsShowLogin, memberAddress }) => {
  const dispatch = useDispatch();
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const loginMemberCond = {
        memberAddress: memberAddress.toLowerCase(),
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
              walletAddress: memberAddress,
            })
          );
        })
        .catch((error) => {
          console.log("login로그인 실패: ", error);
        });
    },
  });

  const handleCancelButtonClick = () => {
    document.body.style.overflow = "auto";
    setIsShowLogin(false);
  };

  const handleLoginButtonClick = async () => {
    await signMessage({ message: "don jo log in test" });
    document.body.style.overflow = "auto";
    setIsShowLogin(false);
  };

  return (
    <BasicModal handleSetShowModal={setIsShowLogin} width={1}>
      <S.Container>
        <S.LogoImg src={Logo} />
        <S.Title>Welcome To DonJo</S.Title>
        <S.Description>
          If you log in, you can use all the services on our site.
        </S.Description>
        <S.ButtonContainer>
          <S.ButtonWrapper>
            <BasicButton
              text="Cancel"
              color="black"
              handleOnClickButton={handleCancelButtonClick}
            />
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <BasicButton
              text="LogIn"
              color="black"
              isBackground={true}
              handleOnClickButton={handleLoginButtonClick}
            />
          </S.ButtonWrapper>
        </S.ButtonContainer>
      </S.Container>
    </BasicModal>
  );
};

export default LogIn;

LogIn.propTypes = {
  setIsShowLogin: PropTypes.func.isRequired,
  MemberAddress: PropTypes.string,
};
