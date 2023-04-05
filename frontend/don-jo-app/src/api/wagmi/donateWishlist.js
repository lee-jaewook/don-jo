import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const donateWishlist = async (wishlist) => {
  const account = getAccount()
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xb4787A11745AfC48D76c2E603164118502447EC6',
    functionName: 'buyWishlistDonation',
    args: [wishlist.seller, wishlist.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(wishlist.price.toString(), "ether"),
    },
  });

  const { hash } = await writeContract(config).catch((error) => {
    sendToastMessage("wishlist donate fail")
    return
  })

  const donationDto = {
    amountEth: parseFloat(wishlist.price),
    fromAddress: account.address,
    sendMsg: wishlist.sendMsg,
    supportType: "wishlist",
    supportTypeUid: "", // 아이템 uid
    toAddress: wishlist.seller,
    transactionHash: hash,
  };

  saveDonation(donationDto)

  const receipt = await waitForTransaction({
    hash,
  }).catch((error) => {
    sendToastMessage("wishlist donate fail")
    return
  })

  const logs = receipt.logs.filter(
    (log) =>
      log.topics[0] === web3.utils.sha3("SupportIdEvent(uint64)")
  );
  if (logs.length > 0) {
    const log = logs[0];
    const id = web3.eth.abi.decodeParameters(
      ["uint64"],
      log.topics[1]
    )[0];

    updateDondationInfo(id, hash);
    
    if (wishlist.sendMsg !== "") {
      sendToastMessage(wishlist.sendMsg)
    }

    return true;

  } else {
    sendToastMessage("Failed to register support record.");
    // handleLoading(false);
  }
}

const saveDonation = (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {})
    .catch((error) => {});
};

const updateDondationInfo = (supportUid, transactionHash) => {
  supportApi
    .updateSponsorshipArrived(supportUid, transactionHash)
    .then((res) => {
      sendToastMessage("✨ Success to register support record");
    })
    .catch((error) => {
      sendToastMessage("Failed to register support record.");
    });
};