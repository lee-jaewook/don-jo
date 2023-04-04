import { Web3Button } from "@web3modal/react";
import Auth from "./Auth";

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
const WalletConnectLogin = () => {
  return (
    <>
      <Auth />
      <Web3Button icon={"hide"} label={"Wallet Connect"} />
    </>
  );
};

export default WalletConnectLogin;
