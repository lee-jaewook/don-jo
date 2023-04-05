import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const donate = async (pageMemberWalletAddress, price, thankmsg, message) => {
  const account = getAccount()
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xb4787A11745AfC48D76c2E603164118502447EC6',
    functionName: 'callBasicDonation',
    args: [pageMemberWalletAddress],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(price, "ether"),
    },
    chainId: 80001
  });

  const { hash } = await writeContract(config).catch((error) => {
    sendToastMessage("Donate fail")
    return
  })

  const donationDto = {
    amountEth: parseFloat(price),
    fromAddress: account.address,
    sendMsg: message,
    supportType: "donation",
    supportTypeUid: "",
    toAddress: pageMemberWalletAddress,
    transactionHash: hash,
  };

  await saveDonation(donationDto)

  if (thankmsg !== "") {
    sendToastMessage(thankmsg)
  }
}

const saveDonation = (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {})
    .catch((error) => {});
};