// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
import hre from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const mockToken = await MockToken.deploy("Mock ERC20", "MOCK", 18, hre.ethers.utils.parseEther("1000000"));
  console.log("Mock ERC20 token deployed to:", mockToken.address);

  const GMPrizePool = await hre.ethers.getContractFactory("GMPrizePool");
  const instance = await GMPrizePool.deploy(mockToken.address);
  await instance.deployed();
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
