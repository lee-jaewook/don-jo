const ItemManager = artifacts.require("../contracts/ApplicationHandler.sol");

module.exports = function (deployer) {
  deployer.deploy(ItemManager);
};
