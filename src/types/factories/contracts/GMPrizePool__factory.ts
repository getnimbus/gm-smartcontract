/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GMPrizePool,
  GMPrizePoolInterface,
} from "../../contracts/GMPrizePool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "RedeemSuccess",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "winnerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
        ],
        internalType: "struct GMPrizePool.Winner[]",
        name: "_winnersList",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_expiredTime",
        type: "uint256",
      },
    ],
    name: "depositPrize",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "expiredTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBackprize",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyPrize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemPrize",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200175938038062001759833981810160405281019062000037919062000280565b6200007e6040518060400160405280601581526020017f4465706c6f79696e67206120506f6f6c20666f723a0000000000000000000000815250336200010660201b60201c565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620003c0565b620001a882826040516024016200011f9291906200035d565b6040516020818303038152906040527f319af333000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050620001ac60201b60201c565b5050565b620001d281620001cd620001d560201b62000b6d17620001f660201b60201c565b60201c565b50565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b6200020a60201b62000ce517819050919050565b6200021462000391565b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000248826200021b565b9050919050565b6200025a816200023b565b81146200026657600080fd5b50565b6000815190506200027a816200024f565b92915050565b60006020828403121562000299576200029862000216565b5b6000620002a98482850162000269565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015620002ee578082015181840152602081019050620002d1565b60008484015250505050565b6000601f19601f8301169050919050565b60006200031882620002b2565b620003248185620002bd565b935062000336818560208601620002ce565b6200034181620002fa565b840191505092915050565b62000357816200023b565b82525050565b600060408201905081810360008301526200037981856200030b565b90506200038a60208301846200034c565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fd5b61138980620003d06000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063315fe6841461006757806332fd9511146100855780635a0bc90a146100a35780638da5cb5b146100d35780638e32e421146100f1578063d2ac021a1461010f575b600080fd5b61006f61012d565b60405161007c9190610d08565b60405180910390f35b61008d610236565b60405161009a9190610d3e565b60405180910390f35b6100bd60048036038101906100b89190610df4565b6104cf565b6040516100ca9190610d3e565b60405180910390f35b6100db6108d8565b6040516100e89190610e95565b60405180910390f35b6100f96108fc565b6040516101069190610d08565b60405180910390f35b610117610902565b6040516101249190610d3e565b60405180910390f35b600080600090505b60018054905081101561022d573373ffffffffffffffffffffffffffffffffffffffff166001828154811061016d5761016c610eb0565b5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156101e757506000600182815481106101d3576101d2610eb0565b5b906000526020600020906002020160010154115b1561021a5760018181548110610200576101ff610eb0565b5b906000526020600020906002020160010154915050610233565b808061022590610f0e565b915050610135565b50600090505b90565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102be90610fb3565b60405180910390fd5b6103056040518060400160405280600c81526020017f426c6f636b204e756d6265720000000000000000000000000000000000000000815250610b8e565b61030e43610c27565b6002544311610352576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103499061101f565b60405180910390fd5b6000805b6001805490508110156103a9576001818154811061037757610376610eb0565b5b90600052602060002090600202016001015482610394919061103f565b915080806103a190610f0e565b915050610356565b506103e86040518060400160405280600f81526020017f53746172742073656e64206261636b0000000000000000000000000000000000815250610b8e565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610445929190611073565b6020604051808303816000875af1158015610464573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048891906110c8565b506104c76040518060400160405280600e81526020017f446f6e652073656e64206261636b000000000000000000000000000000000000815250610b8e565b600191505090565b600061050f6040518060400160405280600981526020017f47657420696e7075740000000000000000000000000000000000000000000000815250610b8e565b61051843610c27565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059d90610fb3565b60405180910390fd5b4382116105e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105df90611167565b60405180910390fd5b6106266040518060400160405280600a81526020017f446f6e6520636865636b00000000000000000000000000000000000000000000815250610b8e565b816002819055506000805b858590508110156107ac5761067a6040518060400160405280600481526020017f5075736800000000000000000000000000000000000000000000000000000000815250610b8e565b85858281811061068d5761068c610eb0565b5b90506040020160200135826106a2919061103f565b9150600060405180604001604052808888858181106106c4576106c3610eb0565b5b90506040020160000160208101906106dc91906111b3565b73ffffffffffffffffffffffffffffffffffffffff16815260200188888581811061070a57610709610eb0565b5b905060400201602001358152509050600181908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015550505080806107a490610f0e565b915050610631565b506107eb6040518060400160405280601081526020017f53746172742073656e64206d6f6e657900000000000000000000000000000000815250610b8e565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161084a939291906111e0565b6020604051808303816000875af1158015610869573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088d91906110c8565b506108cc6040518060400160405280600f81526020017f446f6e652073656e64206d6f6e65790000000000000000000000000000000000815250610b8e565b60019150509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b60006002544310610948576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093f90611263565b60405180910390fd5b60005b600180549050811015610b64573373ffffffffffffffffffffffffffffffffffffffff166001828154811061098357610982610eb0565b5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156109fd57506000600182815481106109e9576109e8610eb0565b5b906000526020600020906002020160010154115b15610b5157600060018281548110610a1857610a17610eb0565b5b9060005260206000209060020201600101549050600060018381548110610a4257610a41610eb0565b5b906000526020600020906002020160010181905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610ab4929190611073565b6020604051808303816000875af1158015610ad3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af791906110c8565b503373ffffffffffffffffffffffffffffffffffffffff167f30bd0eb794bd02c37541f0ad25908537ba61159bb9277ee27364927858a3037b82604051610b3e9190610d08565b60405180910390a2600192505050610b6a565b8080610b5c90610f0e565b91505061094b565b50600090505b90565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b610c2481604051602401610ba29190611302565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610cc0565b50565b610cbd81604051602401610c3b9190610d08565b6040516020818303038152906040527ff82c50f1000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610cc0565b50565b610cd781610ccf610b6d610cda565b63ffffffff16565b50565b610ce5819050919050565b610ced611324565b565b6000819050919050565b610d0281610cef565b82525050565b6000602082019050610d1d6000830184610cf9565b92915050565b60008115159050919050565b610d3881610d23565b82525050565b6000602082019050610d536000830184610d2f565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610d8857610d87610d63565b5b8235905067ffffffffffffffff811115610da557610da4610d68565b5b602083019150836040820283011115610dc157610dc0610d6d565b5b9250929050565b610dd181610cef565b8114610ddc57600080fd5b50565b600081359050610dee81610dc8565b92915050565b600080600060408486031215610e0d57610e0c610d59565b5b600084013567ffffffffffffffff811115610e2b57610e2a610d5e565b5b610e3786828701610d72565b93509350506020610e4a86828701610ddf565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e7f82610e54565b9050919050565b610e8f81610e74565b82525050565b6000602082019050610eaa6000830184610e86565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610f1982610cef565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610f4b57610f4a610edf565b5b600182019050919050565b600082825260208201905092915050565b7f4f6e6c792041646d696e00000000000000000000000000000000000000000000600082015250565b6000610f9d600a83610f56565b9150610fa882610f67565b602082019050919050565b60006020820190508181036000830152610fcc81610f90565b9050919050565b7f4e6f742065787069726564207965740000000000000000000000000000000000600082015250565b6000611009600f83610f56565b915061101482610fd3565b602082019050919050565b6000602082019050818103600083015261103881610ffc565b9050919050565b600061104a82610cef565b915061105583610cef565b925082820190508082111561106d5761106c610edf565b5b92915050565b60006040820190506110886000830185610e86565b6110956020830184610cf9565b9392505050565b6110a581610d23565b81146110b057600080fd5b50565b6000815190506110c28161109c565b92915050565b6000602082840312156110de576110dd610d59565b5b60006110ec848285016110b3565b91505092915050565b7f43616e206e6f74207365742065787069727465642074696d6520696e2074686560008201527f2070617374000000000000000000000000000000000000000000000000000000602082015250565b6000611151602583610f56565b915061115c826110f5565b604082019050919050565b6000602082019050818103600083015261118081611144565b9050919050565b61119081610e74565b811461119b57600080fd5b50565b6000813590506111ad81611187565b92915050565b6000602082840312156111c9576111c8610d59565b5b60006111d78482850161119e565b91505092915050565b60006060820190506111f56000830186610e86565b6112026020830185610e86565b61120f6040830184610cf9565b949350505050565b7f596f75206d697373656420796f757220646561646c696e650000000000000000600082015250565b600061124d601883610f56565b915061125882611217565b602082019050919050565b6000602082019050818103600083015261127c81611240565b9050919050565b600081519050919050565b60005b838110156112ac578082015181840152602081019050611291565b60008484015250505050565b6000601f19601f8301169050919050565b60006112d482611283565b6112de8185610f56565b93506112ee81856020860161128e565b6112f7816112b8565b840191505092915050565b6000602082019050818103600083015261131c81846112c9565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea2646970667358221220f9c6a4aa106849d84ebca5aeb4747c0855084c79663c6439b190149c1e1deb2464736f6c63430008140033";

type GMPrizePoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GMPrizePoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GMPrizePool__factory extends ContractFactory {
  constructor(...args: GMPrizePoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: string,
    overrides?: Overrides & { from?: string }
  ): Promise<GMPrizePool> {
    return super.deploy(_token, overrides || {}) as Promise<GMPrizePool>;
  }
  override getDeployTransaction(
    _token: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, overrides || {});
  }
  override attach(address: string): GMPrizePool {
    return super.attach(address) as GMPrizePool;
  }
  override connect(signer: Signer): GMPrizePool__factory {
    return super.connect(signer) as GMPrizePool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GMPrizePoolInterface {
    return new utils.Interface(_abi) as GMPrizePoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GMPrizePool {
    return new Contract(address, _abi, signerOrProvider) as GMPrizePool;
  }
}