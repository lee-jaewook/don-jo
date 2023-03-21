import React from "react";
const contract = require("../../contracts/ItemManager.json");

export const index = ({ web3 }) => {
  const contractAbi = contract.abi;
  const contractAddress = contract.networks["5777"].address;

  const myContract = web3.eth.Contract((contractAbi, contractAddress));

  // 기부자 주소, 기부 금액, 기부 유형을 이용하여 서명 값을 생성합니다
  const privateKey = "0x..."; // 기부자의 개인 키
  const donationType = "컴퓨터";
  const value = 1; // wei
  const message = web3.utils.soliditySha3(
    { type: "address", value: web3.eth.accounts.wallet[0].address },
    { type: "uint256", value: value },
    { type: "string", value: donationType }
  );

  return (
    <div>
      <div></div>
    </div>
  );
};

// const to = "0x..."; // 기부 받을 주소
// const nickname = "alice";
// const gasPrice = web3.utils.toWei("10", "gwei");
// const gasLimit = 300000;
// contract.methods
//   .makeDonation(to, donationType, nickname, ethUtil.toBuffer(signature))
//   .send(
//     {
//       from: web3.eth.accounts.wallet[0].address,
//       gasPrice: gasPrice,
//       gas: gasLimit,
//       value: value,
//     },
//     (error, transactionHash) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log("Transaction hash:", transactionHash);
//       }
//     }
//   );

// const Web3 = require("web3");
// const contract = require("../../contracts/ItemManager.json");

// const web3 = new Web3("http://localhost:8545");

// const contractAbi = contract.abi;
// const contractAddress = contract.networks["5777"].address;

// const myContract = new web3.eth.Contract((contractAbi, contractAddress));

// // 스마트 컨트랙트 객체를 생성합니다
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // 기부자 주소, 기부 금액, 기부 유형을 이용하여 서명 값을 생성합니다
// const privateKey = "0x..."; // 기부자의 개인 키
// const donationType = "컴퓨터";
// const value = 1; // wei
// const message = web3.utils.soliditySha3(
//   { type: "address", value: web3.eth.accounts.wallet[0].address },
//   { type: "uint256", value: value },
//   { type: "string", value: donationType }
// );
// const signature = ethUtil.ecsign(
//   ethUtil.toBuffer(message),
//   ethUtil.toBuffer(privateKey)
// );

// // 서명 값을 이용하여 스마트 컨트랙트 함수를 호출합니다
// const to = "0x..."; // 기부 받을 주소
// const nickname = "alice";
// const gasPrice = web3.utils.toWei("10", "gwei");
// const gasLimit = 300000;
// contract.methods
//   .makeDonation(to, donationType, nickname, ethUtil.toBuffer(signature))
//   .send(
//     {
//       from: web3.eth.accounts.wallet[0].address,
//       gasPrice: gasPrice,
//       gas: gasLimit,
//       value: value,
//     },
//     (error, transactionHash) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log("Transaction hash:", transactionHash);
//       }
//     }
//   );
