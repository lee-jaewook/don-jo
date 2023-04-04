import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const buyItem = async (item) => {
  console.log(item)
  const account = getAccount()
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xb4787A11745AfC48D76c2E603164118502447EC6',
    functionName: 'buyItemDonation',
    args: [item.seller, item.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(item.price.toString(), "ether"),
    },
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
    supportTypeUid: "", // 아이템 uid
    toAddress: item.seller,
    transactionHash: hash,
  };

  saveDonation(donationDto)

  const receipt = await waitForTransaction({
    hash,
  }).catch((error) => {
    sendToastMessage("Item Donate Fail")
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