import * as S from "./style";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogIn } from "../../../../stores/member";
import { memberApi } from "../../../../api/member";
import { setIsMember } from "../../../../stores/member";
import SignUp from "../../SignUp";

const Auth = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const isMember = useSelector((state) => state.member.isMember);
  // const recoveredAddress = React.useRef<string>()
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const loginMemberCond = {
        memberAddress: address.toLowerCase(),
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
              walletAddress: address,
            })
          );
        })
        .catch((error) => {
          console.log("login로그인 실패: ", error);
        });
    },
  });

  // const [isShowAskContinueLoginModal, setIsShowAskContinueLoginModal] =
  //   useState(false);

  // const AskContinueLogin = () => {
  //   const doSign = () => {
  //     signMessage({ message: "don jo log in test" });
  //     setIsShowAskContinueLoginModal(false);
  //   };

  //   return (
  //     <BasicModal handleSetShowModal={setIsShowAskContinueLoginModal} width={1}>
  //       <S.Container>
  //         <S.Title>Your account is</S.Title>
  //         <S.AddressWrapper>{address}</S.AddressWrapper>
  //         <S.BasicButtonWrapper>
  //           <BasicButton
  //             text="Sign In"
  //             isBackground={true}
  //             color="black"
  //             handleOnClickButton={doSign}
  //           />
  //         </S.BasicButtonWrapper>
  //       </S.Container>
  //     </BasicModal>
  //   );
  // };

  // const SignUpCheck = () => {
  //   // signMessage({ message: "don jo log in test" });
  //   memberApi.checkMemberAddress(address).then(({ status }) => {
  //     console.log("wallet connect 주소:", address);
  //     if (status === 200) {
  //       console.log("회원정보 있음");
  //       if (window.confirm("Do you want to SignIn?")) {
  //         signMessage({ message: "don jo log in test" });
  //       } else {
  //         //월렛 디스커넥트
  //       }
  //     } else if (status === 204) {
  //       console.log("회원가입 모달 띄우기");
  //       setIsShowSignUp(true);
  //     }
  //   });
  // };

  const MemberCheck = () => {
    memberApi.checkMemberAddress(address).then(({ status }) => {
      console.log("wallet connect 주소:", address);
      if (status === 200) {
        dispatch(setIsMember(true));
      } else if (status === 204) {
        dispatch(setIsMember(false));
      }
    });
  };

  useEffect(() => {
    if (isConnected) {
      MemberCheck();
    }
  }, [isConnected]);

  const handleSign = () => {
    signMessage({ message: "don jo log in test" });
  };

  const handleModalOpen = () => {
    setIsShowSignUp(true);
  };

  return (
    <>
      {isConnected &&
        (isMember ? (
          <S.Startbtn onClick={handleSign}>로그인</S.Startbtn>
        ) : (
          <S.Startbtn onClick={handleModalOpen}>회원가입</S.Startbtn>
        ))}
      {isShowSignUp && (
        <SignUp isShowSignUp={isShowSignUp} setIsShowSignUp={setIsShowSignUp} />
      )}
    </>
  );
};

export default Auth;
