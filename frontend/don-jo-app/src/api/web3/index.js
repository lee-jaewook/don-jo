const Web3 = require("web3");
const contract = require("../../contracts/ItemManager.json");

const web3 = new Web3("http://localhost:8545");

const contractAbi = contract.abi;
const contractAddress = contract.networks["5777"].address;

const myContract = new web3.eth.Contract((contractAbi, contractAddress));
