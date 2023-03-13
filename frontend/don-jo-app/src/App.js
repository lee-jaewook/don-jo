import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";

const App = () => {
  // const web3 = useSelector((state) => state.member.web3);
  const [balance, setBalance] = useState(100);

  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider(
  //     "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
  //   )
  // );
  const toAddress = "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12";

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        // todo
        const web3 = new Web3(window.ethereum);
        web3.eth.net.getId().then((chainId) => {
          const infuraWeb3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
            )
          );
          web3.setProvider(infuraWeb3.currentProvider);
        });
        const accounts = await web3.eth.getAccounts();
        console.log("accounts", accounts);
        // 내 지갑 주소...
        // const address = accounts[0];
        // console.log(address);
        // const balanceWei = await wallet.eth.getBalance(address);
        // console.log("web3", balanceWei);
        // setBalance(balanceWei);

        alert("로그인 성공");
        console.log("여기까지2");
        const tx = {
          from: accounts,
          to: "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12",
          value: web3.utils.toWei("0.01", "ether"),
        };
        console.log("여기까지");
        web3.eth
          .sendTransaction(tx)
          .on("transactionHash", (hash) => {
            console.log(`Transaction hash: ${hash}`);
          })
          .on("receipt", (receipt) => {
            console.log(
              `Transaction receipt: ${JSON.stringify(receipt, null, 2)}`
            );
          })
          .on("error", (error) => {
            console.log(`Transaction error: ${error.message}`);
          });

        console.log("뭐지?");
      } else {
        alert("please install MetaMask");
      }
    } catch {
      console.log("여기로 오나요?");
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <div>balance: {balance}</div>
      <div>account:</div>
    </div>
  );
};

export default App;
