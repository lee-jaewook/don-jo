import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const buyItem = async (item) => {
  const account = getAccount()
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xA07bD0a21C0589a8f102CE1D762E5B3550b8cE10',
    functionName: 'buyItemDonation',
    args: [item.seller, item.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(item.price.toString(), "ether"),
    },
    chainId: 137
  });

  const { hash } = await writeContract(config).catch((error) => {
    sendToastMessage("Item Donate Fail")
    return
  })

  const donationDto = {
    amountEth: parseFloat(item.price),
    fromAddress: account.address,
    sendMsg: "",
    supportType: "item",
    supportTypeUid: item.id, // 아이템 uid
    toAddress: item.seller,
    transactionHash: hash,
  };

  await saveDonation(donationDto)

  sendToastMessage("Item Purchase Success")

}

const saveDonation = (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {})
    .catch((error) => {});
};