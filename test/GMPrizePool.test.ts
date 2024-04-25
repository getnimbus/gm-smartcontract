import { expect } from "chai";
import { ethers } from "hardhat";
import { createWalletClient, http, defineChain, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const contractAbi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [{ type: "address", name: "_token", internalType: "address" }],
  },
  {
    type: "event",
    name: "RedeemSuccess",
    inputs: [
      { type: "address", name: "sender", internalType: "address", indexed: true },
      { type: "uint256", name: "value", internalType: "uint256", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "depositPrize",
    inputs: [
      {
        type: "tuple[]",
        name: "_winnersList",
        internalType: "struct GMPrizePool.Winner[]",
        components: [
          { type: "address", name: "winnerAddress", internalType: "address" },
          { type: "uint256", name: "prizeAmount", internalType: "uint256" },
        ],
      },
      { type: "uint256", name: "_expiredTime", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "expiredTime",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "getPrizeBack",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct GMPrizePool.Winner",
        components: [
          { type: "address", name: "winnerAddress", internalType: "address" },
          { type: "uint256", name: "prizeAmount", internalType: "uint256" },
        ],
      },
    ],
    name: "getWinner",
    inputs: [{ type: "address", name: "account", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "redeemPrize",
    inputs: [],
  },
];

const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

const u2uTestnet = defineChain({
  id: 2484,
  name: "U2U Nebulas Testnet",
  network: "nebulas-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "U2U",
    symbol: "U2U",
  },
  rpcUrls: {
    default: { http: ["https://rpc-nebulas-testnet.uniultra.xyz/"] },
    public: { http: ["https://rpc-nebulas-testnet.uniultra.xyz/"] },
  },
  blockExplorers: {
    default: { name: "NebulasTestnet", url: "https://testnet.u2uscan.xyz/" },
  },
  testnet: true,
});

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
        winnerAddress: winner.address,
        prizeAmount: 100000,
      },
    ];

    const approveTx = await mockToken.approve(instance.address, 100000);
    await approveTx.wait();

    const depositTx = await instance.depositPrize(winners, 6);

    // Wait until the transaction is mined
    await depositTx.wait();

    let winnerData = await instance.connect(winner).getWinner(winner.address);
    expect(winnerData.prizeAmount).to.equal(100000);

    const redeemTx = await instance.connect(winner).redeemPrize();
    await redeemTx.wait();

    winnerData = await instance.connect(winner).getWinner(winner.address);
    expect(winnerData.prizeAmount).to.equal(0);

    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    const getBackTx = await instance.getPrizeBack();
    await getBackTx.wait();
    console.log(getBackTx);
  });

  it("GMPrizePool deposit when already have reward", async () => {
    const [owner, winner, winner2] = await ethers.getSigners();

    console.log("Deploying Mock ERC20 token...");

    const MockToken = await ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy("Mock ERC20", "MOCK", 18, ethers.utils.parseEther("1000000"));
    console.log("Mock ERC20 token deployed to:", mockToken.address);

    const GMPrizePool = await ethers.getContractFactory("GMPrizePool");
    const instance = await GMPrizePool.deploy(mockToken.address);
    await instance.deployed();

    const winners = [
      {
        winnerAddress: winner.address,
        prizeAmount: 100000,
      },
    ];

    const approveTx = await mockToken.approve(instance.address, 100000);
    await approveTx.wait();

    const depositTx = await instance.depositPrize(winners, 7);

    // Wait until the transaction is mined
    await depositTx.wait();

    let winnerData = await instance.connect(winner).getWinner(winner.address);
    expect(winnerData.prizeAmount).to.equal(100000);

    const approveTx2 = await mockToken.approve(instance.address, 200000);
    await approveTx2.wait();

    const winners2 = [
      {
        winnerAddress: winner2.address,
        prizeAmount: 200000,
      },
    ];

    const beforeBalance = await mockToken.balanceOf(owner.address);
    console.log({ beforeBalance });

    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);
    await ethers.provider.send("evm_mine", []);

    const depositTx2 = await instance.depositPrize(winners2, 100);
    await depositTx2.wait();

    winnerData = await instance.connect(winner2).getWinner(winner2.address);
    expect(winnerData.prizeAmount).to.equal(200000);

    const withdrawBalance = await mockToken.balanceOf(owner.address);
    expect(withdrawBalance).to.eq(beforeBalance.add(100000).sub(200000));
  });

  it.only("deposit prize", async () => {
    const account = privateKeyToAccount("0x1eb40dcf0c44aba73f1e16865df8f2f3f960f649c64d3d3200618701fe3c26a7");

    const client = createWalletClient({
      account,
      chain: u2uTestnet,
      transport: http(undefined, {
        batch: true,
      }),
    });

    const contract = getContract({
      address: "0xC5EFb7bd30b7AA7Fae16B44e34Aee946f1Eb2AFd",
      abi: contractAbi,
      client,
    });

    const result = await contract.write.depositPrize([
      [["0x50987dd3755c0D54dE4970429F09DBa85e660258", BigInt("10000000000000000000")]],
      21916209,
    ]);
    console.log(result);
  });

  it("call erc20", async () => {
    const account = privateKeyToAccount("0x1eb40dcf0c44aba73f1e16865df8f2f3f960f649c64d3d3200618701fe3c26a7");

    const client = createWalletClient({
      account,
      chain: u2uTestnet,
      transport: http(undefined, {
        batch: true,
      }),
    });

    const contract = getContract({
      address: "0x577D71Da6F467069dF976be4314cEf26Fcf932F2",
      abi: erc20Abi,
      client,
    });

    const result = await contract.read.decimals();
    console.log(result);
  });
});
