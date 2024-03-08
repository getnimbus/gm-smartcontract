import { expect } from "chai";
import { ethers } from "hardhat";

describe("GMPrizePool", () => {
  it("GMPrizePool full flow", async () => {
    const [owner, winner] = await ethers.getSigners();

    console.log("Deploying Mock ERC20 token...");

    const MockToken = await ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy("Mock ERC20", "MOCK", 18, ethers.utils.parseEther("1000000"));
    console.log("Mock ERC20 token deployed to:", mockToken.address);

    const GMPrizePool = await ethers.getContractFactory("GMPrizePool");
    const instance = await GMPrizePool.deploy(mockToken.address);
    await instance.deployed();

    const winners = [
      {
        winnerAddress: winner.add`ress,
        prizeAmount: 100000,
      },
    ];

    const approveTx = await mockToken.approve(instance.address, 100000);
    await approveTx.wait();

    const depositTx = await instance.depositPrize(winners, 6);

    // Wait until the transaction is mined
    await depositTx.wait();

    expect(await instance.connect(winner).getMyPrize()).to.equal(100000);

    const redeemTx = await instance.connect(winner).redeemPrize();
    await redeemTx.wait();

    expect(await instance.connect(winner).getMyPrize()).to.equal(0);

    // expect(await instance.getBackprize()).to.not.equal(true);
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    const getBackTx = await instance.getBackprize();
    await getBackTx.wait();
    console.log(getBackTx);
    // expect(await instance.getBackprize()).to.equal(true);
  });
});
