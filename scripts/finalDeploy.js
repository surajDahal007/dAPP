//TO DEPLOY SMART CONTRACT IN GOERLI TESTNET

const hre = require("hardhat");

async function main() {
    const chai = await hre.ethers.getContractFactory("chai");//"actual contract name which is to be deployed"
    const contract= await chai.deploy();// instance of contract
    await contract.deployed();
    console.log("Address of Contract: ",contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  