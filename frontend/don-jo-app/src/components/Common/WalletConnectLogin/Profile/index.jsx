import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogIn } from "../../../../stores/member";
import { memberApi } from "../../../../api/member";
import SignUp from "../../SignUp";

const Profile = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  // const recoveredAddress = React.useRef<string>()
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
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

  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const SignUpCheck = () => {
    // signMessage({ message: "don jo log in test" });
    memberApi.checkMemberAddress(address).then(({ status }) => {
      console.log("wallet connect 주소:", address);
      if (status === 200) {
        console.log("회원정보 있음");
        if (window.confirm("Do you want to SignIn?")) {
          signMessage({ message: "don jo log in test" });
        } else {
          //월렛 디스커넥트
        }
      } else if (status === 204) {
        console.log("회원가입 모달 띄우기");
        setIsShowSignUp(true);
      }
    });
  };

  useEffect(() => {
    if (isConnected) {
      SignUpCheck();
    }
  }, [isConnected]);

  return (
    <>
      <div>
        {isLoading && <label>실행중</label>}
        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
      {isShowSignUp && (
        <SignUp isShowSignUp={isShowSignUp} setIsShowSignUp={setIsShowSignUp} />
      )}
    </>
  );
};

export default Profile;
