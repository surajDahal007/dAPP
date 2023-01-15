// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


const hre = require("hardhat");

async function getBalance(address){
  const balanceBigInt= await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);

}

async function consoleBalances(addresses){
  let counter=0;

  for(const address of addresses){
    console.log(`Address ${counter} balance: `,await getBalance(address));
    counter++;
  }
}

async function consoleMomos(memos){
  for(const memo of memos){
    const timestamp= memo.timestamp;
    const name= memo.name;
    const from= memo.from;
    const message= memo.message;
    console.log(`At ${timestamp}, name ${name}, address ${from}, message ${message}`);
  }
}

async function main() {
    const [owner,from1,from2,from3]= await hre.ethers.getSigners();
    const chai = await hre.ethers.getContractFactory("chai");//"actual contract name which is to be deployed"
    const contract= await chai.deploy();// instance of contract
    

    await contract.deployed();// will be deployed in hardhat address
    console.log("Address of Contract: ",contract.address);

    const addresses = [
      owner.address,
      from1.address,
      from2.address,
      from3.address
    ];

    console.log("Before buying chai ");
    await consoleBalances(addresses);


    const amount= {value: hre.ethers.utils.parseEther("1")};
    await contract.connect(from1).buyChai("form1","Very nice",amount);
    await contract.connect(from2).buyChai("from2","Very nice",amount);
    await contract.connect(from3).buyChai("from3","Very nice",amount);
    
 
    console.log("After buying chai ");
    await consoleBalances(addresses);



    const memos= await contract.getMemos();
    consoleMomos(memos);

  } 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
