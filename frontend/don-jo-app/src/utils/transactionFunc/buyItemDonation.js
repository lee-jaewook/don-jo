import Web3 from "web3";
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import { supportApi } from "../../api/support";
import { isMobile } from "react-device-detect";

export const buyItemDonation = (item) => {
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
            // const address = "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12";
            const valueInWei = web3.utils.toWei(
              (item.price * Math.pow(10, -3)).toString(),
              "ether"
            );
            // const valueInWei = item.price;
            console.log("valueInWei: ", valueInWei);
            // const myWallet = web3.walletAddress;
            const myContract = new web3.eth.Contract(
              ApplicationHandler.abi, // abi 설정
              "0x785251d4d21B80415210aD4b8419d1fB300cC29B" // contract 주소
            );

            const tx = myContract.methods.buyItemDonation(item.seller, item.id);

            // myContract.events
            //   .SupportEvent()
            //   .on("data", (event) => {
            //     console.log("data: ", event);
            //   })
            //   .on("error", (error) => {
            //     console.log("그런 거 안키워");
            //   });

            window.ethereum
              .request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: accounts[0],
                    to: item.seller,
                    value: valueInWei.toString(),
                    // gas: "100000000000000000",
                    data: tx.encodeABI(),
                  },
                ],
              })
              .then((txHash) => {
                const receiptPromise = new Promise(function (resolve, reject) {
                  const intervalId = setInterval(function () {
                    web3.eth.getTransactionReceipt(txHash).then((receipt) => {
                      if (receipt !== undefined && receipt !== null) {
                        const value = intervalId;
                        clearInterval(intervalId);
                        console.log("intervalId: ", intervalId);
                        resolve({ receipt, txHash, value });
                      }
                    });
                  }, 1000);
                });
                return receiptPromise;
              })
              .then(({ receipt, txHash, value }) => {
                console.log("Transaction successful");
                // console.log("events: ", events);
                console.log("receipt: ", receipt);
                const eventABI = {
                  anonymous: false,
                  inputs: [
                    {
                      indexed: false,
                      internalType: "uint64",
                      name: "value",
                      type: "uint64",
                    },
                  ],
                  name: "SupportEvent",
                  type: "event",
                };

                const logData1 = receipt.logs[1];
                const logData2 = receipt.logs[1].data;
                const decodeLog1 = web3.eth.abi.decodeLog(
                  eventABI.inputs,
                  logData1.data,
                  logData1.topics
                );
                const decodeLog2 = web3.eth.abi.decodeParameter(
                  "uint256",
                  logData2
                );
                console.log("decodeLog1: ", decodeLog1.value);
                console.log("decodeLog2: ", decodeLog2);

                const donationDto = {
                  amountEth: item.price,
                  fromAddress: accounts[0],
                  sendMsg: "",
                  supportType: "item",
                  supportTypeUid: item.id,
                  supportUid: value,
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
        "MetaMask 확장 프로그램이 설치되어 있지 않습니다. 다운로드 페이지로 이동하시겠습니까?";

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
