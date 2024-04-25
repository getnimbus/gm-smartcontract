// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MockToken = await ethers.getContractFactory("MockToken");
  const mockToken = await MockToken.deploy("Mock USDC", "USDC", 6, ethers.utils.parseEther("10000000000"));
  console.log("Mock ERC20 token deployed to:", mockToken.address);

  const GMPrizePool = await ethers.getContractFactory("GMPrizePool");
  const instance = await GMPrizePool.deploy(mockToken.address);
  await instance.deployed();

  const approveTx = await mockToken.approve(instance.address, 10000000000);
  await approveTx.wait();

  console.log("Mock GM Prize pool token deployed to:", instance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
