import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const donateWishlist = async (wishlist, donatorMessage) => {
  const account = getAccount();
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xA07bD0a21C0589a8f102CE1D762E5B3550b8cE10',
    functionName: 'buyWishlistDonation',
    args: [wishlist.seller, wishlist.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(wishlist.price.toString(), "ether"),
    },
    chainId: 137
  });

  const { hash } = await writeContract(config).catch((error) => {
    sendToastMessage("wishlist donate fail")
    return
  })

  const donationDto = {
    amountEth: parseFloat(wishlist.price),
    fromAddress: account.address,
    sendMsg: donatorMessage,
    supportType: "wishlist",
    supportTypeUid: wishlist.id, // 아이템 uid
    toAddress: wishlist.seller,
    transactionHash: hash,
  };

  await saveDonation(donationDto)

  if (wishlist.sendMsg !== "") {
    sendToastMessage(wishlist.sendMsg)
  }

  return hash
}

export const waitDonateWishlist = async (hash) => {
  const data = await waitForTransaction({
    hash,
  })

  if (data) {
    return true;
  }
  return false;
}

const saveDonation = (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {})
    .catch((error) => {});
};