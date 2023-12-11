require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config();

const { ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY, API_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [METAMASK_PRIVATE_KEY],
    },
  }
};
