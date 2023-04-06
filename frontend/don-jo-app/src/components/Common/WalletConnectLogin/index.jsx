import * as S from "./style";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { memberApi } from "../../../api/member";
import SignUp from "../SignUp";
import LogIn from "./Login";

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
const WalletConnectLogin = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [isShowLogIn, setIsShowLogin] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [startButtonStatus, setStartButtonStatus] = useState(false);

  const memberCheck = () => {
    memberApi.checkMemberAddress(address).then(({ status }) => {
      if (status === 200) {
        setIsShowLogin(true);
      } else if (status === 204) {
        setIsShowSignUp(true);
      }
    });
  };

  const startClick = () => {
    if (isConnected) {
      memberCheck();
      return;
    }
    open();
    setStartButtonStatus(true);
  };

  useEffect(() => {
    if (isConnected && startButtonStatus) {
      memberCheck();
      setStartButtonStatus(false);
    }
  }, [isConnected]);
  return (
    <>
      <S.Startbtn onClick={startClick}>Start</S.Startbtn>
      {isShowSignUp && (
        <SignUp isShowSignUp={isShowSignUp} setIsShowSignUp={setIsShowSignUp} />
      )}
      {isShowLogIn && (
        <LogIn memberAddress={address} setIsShowLogin={setIsShowLogin} />
      )}
    </>
  );
};

export default WalletConnectLogin;
