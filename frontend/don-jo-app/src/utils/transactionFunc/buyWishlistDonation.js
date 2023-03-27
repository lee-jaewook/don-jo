import Web3 from "web3";
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import { supportApi } from "../../api/support";
import { isMobile } from "react-device-detect";

export const buyWishilistDonation = ({ wishlistId }) => {
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
                "https://sepolia.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
              )
            );
            web3.setProvider(infuraWeb3.currentProvider);
            // const address = "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12";
            const valueInWei = web3.utils.toWei("0.000003", "ether");

            // const myWallet = web3.walletAddress;
            const myContract = new web3.eth.Contract(
              ApplicationHandler.abi, // abi 설정
              "0xc45694392A301B63a1FD0A1b2762521915a78f44" // contract 주소
            );

            const tx = myContract.methods.buyWishilistDonation(
              "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12",
              wishlistId
            );
            window.ethereum
              .request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: accounts[0],
                    to: "0x6c3ea1dD30BEb9B449272d393693A47727a5dF12",
                    value: valueInWei,
                    gas: "20000",
                    data: tx.encodeABI(),
                  },
                ],
              })
              .then((res) => {
                console.log("transaction 성공");
                console.log("res: ", res);
                // const donationDto = {
                //   amountEth: 0,
                //   fromAddress: myWallet,
                //   sendMsg: "string",
                //   supportType: "donation",
                //   supportUid: 0,
                //   toAddress: "string",
                //   transactionHash: res,
                // };
                // saveDonation(donationDto);
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
