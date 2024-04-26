import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { config } from "dotenv";
import { type HardhatUserConfig, task } from "hardhat/config";

config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const hardHatConfig: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./src/artifacts",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // Should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: [], // Optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0, // Workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    ropsten: {
      url: process.env.ROPSTEN_PROVIDER_URL ?? "",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
    tomotestnet: {
      chainId: 89,
      url: process.env.TOMO_PROVIDER_URL ?? "https://rpc.testnet.tomochain.com",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
    mumbai: {
      chainId: 80001,
      url: process.env.MATIC_PROVIDER_URL ?? "https://polygon-testnet.public.blastapi.io",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
    bsctestnet: {
      chainId: 97,
      url: process.env.BSC_PROVIDER_URL ?? "https://speedy-nodes-nyc.moralis.io/036063875a28828fa0c00596/bsc/testnet",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
    nebulastestnet: {
      chainId: 2484,
      url: process.env.MATIC_PROVIDER_URL ?? "https://rpc-nebulas-testnet.uniultra.xyz",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
    scrollsepolia: {
      chainId: 534351,
      url: process.env.MATIC_PROVIDER_URL ?? "https://sepolia-rpc.scroll.io",
      accounts: [process.env.PRIVATE_KEY ?? ""].filter(Boolean),
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // ApiKey: process.env.ETHERSCAN_API_KEY,
    // apiKey: {
    //   polygonMumbai: "MAH7N9J9VBNKU7FVGSGD59JNPGS5CFK6VH",
    // },
    apiKey: {
      nebulastestnet: "api-key",
      scrollsepolia: process.env.SCROLLSCAN_API_KEY ?? "api_key",
    },
    customChains: [
      {
        network: "nebulastestnet",
        chainId: 2484,
        urls: {
          apiURL: "https://testnet.u2uscan.xyz/api",
          browserURL: "https://testnet.u2uscan.xyz/",
        },
      },
      {
        network: "scrollsepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};

export default hardHatConfig;
