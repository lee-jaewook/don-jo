import Web3 from "web3";
import { setWeb3 } from "../stores/web3";
import { setLogOut } from "../stores/member";

export const handleWalletChange = (newAccounts, dispatch) => {
  if (newAccounts.length > 0) {
    const newWeb3 = new Web3(window.ethereum);
    newWeb3.eth.net.getId().then((chainId) => {
      const infuraWeb3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://polygon-mumbai.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
        )
      );
      newWeb3.setProvider(infuraWeb3.currentProvider);

      dispatch(setWeb3({ web3: newWeb3, walletAddress: newAccounts[0] }));
      dispatch(setLogOut());
      console.log("MetaMask account changed: ");
    });
  } else {
    dispatch(setWeb3({ web3: null, walletAddress: "" }));
    dispatch(setLogOut());
    console.log("MetaMask account disconnected");
  }
};
