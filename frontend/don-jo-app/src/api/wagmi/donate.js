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
    address: '0xA07bD0a21C0589a8f102CE1D762E5B3550b8cE10',
    functionName: 'callBasicDonation',
    args: [pageMemberWalletAddress],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(price, "ether"),
    },
    chainId: 137
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