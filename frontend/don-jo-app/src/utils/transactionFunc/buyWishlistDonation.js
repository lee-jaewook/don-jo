import Web3 from "web3";
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import { supportApi } from "../../api/support";
import { isMobile } from "react-device-detect";

export const buyWishlistDonation = (item) => {
  // 모바일 여부 확인
  if (!isMobile) {
    // 메타마스크 설치 여부 확인
    if (typeof window.ethereum !== "undefined") {
      // 메타마스크가 설치되어 있으면, 로그인 요청
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const web3 = new Web3(window.ethereum);
          web3.eth.net.getId().then((chainId) => {
            const infuraWeb3 = new Web3(
              new Web3.providers.HttpProvider(
                "https://polygon-mumbai.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
              )
            );
            web3.setProvider(infuraWeb3.currentProvider);
            const valueInWei = web3.utils.toWei(item.price.toString(), "ether");

            const myContract = new web3.eth.Contract(
              ApplicationHandler.abi, // abi 설정
              "0x785251d4d21B80415210aD4b8419d1fB300cC29B" // contract 주소
            );

            const tx = myContract.methods.buyWishilistDonation(
              item.seller,
              item.id
            );

            window.ethereum
              .request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: accounts[0],
                    to: "0x785251d4d21B80415210aD4b8419d1fB300cC29B",
                    value: valueInWei.toString(),
                    data: tx.encodeABI(),
                  },
                ],
              })
              .then((txHash) => {
                const receiptPromise = new Promise(function (resolve, reject) {
                  const intervalId = setInterval(function () {
                    web3.eth.getTransactionReceipt(txHash).then((receipt) => {
                      if (receipt !== undefined && receipt !== null) {
                        clearInterval(intervalId);
                        resolve({ receipt, txHash });
                      }
                    });
                  }, 1000);
                });
                return receiptPromise;
              })
              .then(({ receipt, txHash }) => {
                console.log("Transaction successful");
                console.log("receipt: ", receipt);
                const donationDto = {
                  amountEth: item.price,
                  fromAddress: accounts[0],
                  sendMsg: item.message,
                  supportType: "item",
                  supportTypeUid: item.id,
                  supportUid: "0",
                  toAddress: item.seller,
                  transactionHash: txHash,
                };
                saveDonation(donationDto);
              })
              .catch((err) => console.log(err));
          });
        });
    } else {
      // Metamask를 설치할 수 있도록 코드 추가...
      const downloadLink = "https://metamask.io/download.html";
      const message =
        "MetaMask extension is not installed. Do you want to go to the download page?";

      if (window.confirm(message)) {
        window.open(downloadLink, "_blank");
      }
    }
  }
};

const saveDonation = async (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {
      console.log("저장 성공!");
    })
    .catch((error) => {
      console.log("저장 실패");
    });
};
