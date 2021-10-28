/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MemeNft } from "./MemeNft";

export class MemeNftFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    uri_: string,
    _wethAddress: string,
    _royaltiesSplitter: string,
    overrides?: Overrides
  ): Promise<MemeNft> {
    return super.deploy(
      uri_,
      _wethAddress,
      _royaltiesSplitter,
      overrides || {}
    ) as Promise<MemeNft>;
  }
  getDeployTransaction(
    uri_: string,
    _wethAddress: string,
    _royaltiesSplitter: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      uri_,
      _wethAddress,
      _royaltiesSplitter,
      overrides || {}
    );
  }
  attach(address: string): MemeNft {
    return super.attach(address) as MemeNft;
  }
  connect(signer: Signer): MemeNftFactory {
    return super.connect(signer) as MemeNftFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MemeNft {
    return new Contract(address, _abi, signerOrProvider) as MemeNft;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        internalType: "address",
        name: "_wethAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_royaltiesSplitter",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseRoyalties",
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
    name: "bid",
    outputs: [
      {
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "enterBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "hasBeenMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minPurchasePrice",
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
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "mintActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "_badges",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_baseRoyalties",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_royaltiesRoot",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_basePrice",
        type: "uint256",
      },
    ],
    name: "mintPrimary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_currentOwner",
        type: "address",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltiesSplitter",
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
    name: "royaltyCount",
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
    name: "royaltyMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "royaltyValues",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "sumRoyalties",
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
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWeth",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620028983803806200289883398101604081905262000034916200015a565b8262000040816200007e565b5060038054610100600160a81b0319166101006001600160a01b0394851602179055600480546001600160a01b0319169190921617905550620002b0565b80516200009390600290602084019062000097565b5050565b828054620000a5906200025d565b90600052602060002090601f016020900481019282620000c9576000855562000114565b82601f10620000e457805160ff191683800117855562000114565b8280016001018555821562000114579182015b8281111562000114578251825591602001919060010190620000f7565b506200012292915062000126565b5090565b5b8082111562000122576000815560010162000127565b80516001600160a01b03811681146200015557600080fd5b919050565b6000806000606084860312156200017057600080fd5b83516001600160401b03808211156200018857600080fd5b818601915086601f8301126200019d57600080fd5b815181811115620001b257620001b26200029a565b604051601f8201601f19908116603f01168101908382118183101715620001dd57620001dd6200029a565b81604052828152602093508984848701011115620001fa57600080fd5b600091505b828210156200021e5784820184015181830185015290830190620001ff565b82821115620002305760008484830101525b9650620002429150508682016200013d565b9350505062000254604085016200013d565b90509250925092565b600181811c908216806200027257607f821691505b602082108114156200029457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6125d880620002c06000396000f3fe60806040526004361061013f5760003560e01c80634173a085116100b6578063c640e5c61161006f578063c640e5c6146103b0578063e52a7874146103d0578063e7328873146103e5578063e985e9c514610405578063f242432a1461044e578063fc9150111461046e57600080fd5b80634173a085146102f35780634e1273f4146103135780636a68c481146103405780639d83e65414610360578063a22cb46514610376578063c52b8e201461039657600080fd5b80631998aeef116101085780631998aeef1461020b5780631ba882e91461024e57806325b31a971461026e5780632771b12e146102815780632eb2c2d6146102965780633fc8cef3146102b657600080fd5b8062fdd58e1461014457806301ffc9a71461017757806309063af6146101a75780630e89341c146101bc57806311507f6e146101e9575b600080fd5b34801561015057600080fd5b5061016461015f366004611f3a565b610484565b6040519081526020015b60405180910390f35b34801561018357600080fd5b50610197610192366004611fe5565b61051b565b604051901515815260200161016e565b3480156101b357600080fd5b50600854610164565b3480156101c857600080fd5b506101dc6101d73660046120b5565b61056d565b60405161016e9190612273565b3480156101f557600080fd5b5061020961020436600461201f565b610601565b005b34801561021757600080fd5b50600954600a5461022f916001600160a01b03169082565b604080516001600160a01b03909316835260208301919091520161016e565b34801561025a57600080fd5b506101646102693660046120b5565b6107f0565b61020961027c366004611da6565b610811565b34801561028d57600080fd5b50600654610164565b3480156102a257600080fd5b506102096102b1366004611df4565b610871565b3480156102c257600080fd5b506003546102db9061010090046001600160a01b031681565b6040516001600160a01b03909116815260200161016e565b3480156102ff57600080fd5b506004546102db906001600160a01b031681565b34801561031f57600080fd5b5061033361032e366004611f64565b610901565b60405161016e9190612232565b34801561034c57600080fd5b5061020961035b3660046120b5565b610a2b565b34801561036c57600080fd5b50610164600b5481565b34801561038257600080fd5b50610209610391366004611f03565b610d7a565b3480156103a257600080fd5b506003546101979060ff1681565b3480156103bc57600080fd5b506101976103cb366004611da6565b610e51565b3480156103dc57600080fd5b50610209610e94565b3480156103f157600080fd5b506101646104003660046120e7565b610f90565b34801561041157600080fd5b50610197610420366004611dc1565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b34801561045a57600080fd5b50610209610469366004611e9e565b610fe3565b34801561047a57600080fd5b5061016460055481565b60006001600160a01b0383166104f55760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201526a65726f206164647265737360a81b60648201526084015b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216636cdb3d1360e11b148061054c57506001600160e01b031982166303a24d0760e21b145b8061056757506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606002805461057c90612413565b80601f01602080910402602001604051908101604052809291908181526020018280546105a890612413565b80156105f55780601f106105ca576101008083540402835291602001916105f5565b820191906000526020600020905b8154815290600101906020018083116105d857829003601f168201915b50505050509050919050565b60035460ff16156106545760405162461bcd60e51b815260206004820152601c60248201527f7072696d61727920746f6b656e20616c7265616479206d696e7465640000000060448201526064016104ec565b6127108311156106a65760405162461bcd60e51b815260206004820152601560248201527f526f79616c74696573206578636565647320636170000000000000000000000060448201526064016104ec565b60005b84518110156107a5578481815181106106c4576106c46124ac565b602090810291909101015160405163632072e360e11b81523360048201526001600160a01b039091169063c640e5c69060240160206040518083038186803b15801561070f57600080fd5b505afa158015610723573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107479190611fc8565b6107935760405162461bcd60e51b815260206004820152601560248201527f446f6573206e6f7420686f6c64206c6963656e7365000000000000000000000060448201526064016104ec565b8061079d8161247b565b9150506106a9565b506107af8561106a565b6003805460ff1916600117905560088290556005839055600b8190556107e93360005b600160405180602001604052806000815250611081565b5050505050565b6007818154811061080057600080fd5b600091825260209091200154905081565b600b543410156108635760405162461bcd60e51b815260206004820152601e60248201527f6d696e696d756d207075726368617365207072696365206e6f74206d6574000060448201526064016104ec565b61086e813334611191565b50565b6001600160a01b03851633148061088d575061088d8533610420565b6108f45760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f74206044820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b60648201526084016104ec565b6107e9858585858561141e565b606081518351146109665760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016104ec565b6000835167ffffffffffffffff811115610982576109826124c2565b6040519080825280602002602001820160405280156109ab578160200160208202803683370190505b50905060005b8451811015610a23576109f68582815181106109cf576109cf6124ac565b60200260200101518583815181106109e9576109e96124ac565b6020026020010151610484565b828281518110610a0857610a086124ac565b6020908102919091010152610a1c8161247b565b90506109b1565b509392505050565b6003546040516370a0823160e01b8152336004820152829161010090046001600160a01b0316906370a0823190602401602060405180830381600087803b158015610a7557600080fd5b505af1158015610a89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aad91906120ce565b1015610af25760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742042616c616e636560601b60448201526064016104ec565b600354604051636eb1769f60e11b8152336004820152306024820152829161010090046001600160a01b03169063dd62ed3e90604401602060405180830381600087803b158015610b4257600080fd5b505af1158015610b56573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7a91906120ce565b1015610bc85760405162461bcd60e51b815260206004820152601560248201527f496e73756666696369656e7420417070726f76616c000000000000000000000060448201526064016104ec565b6009546001600160a01b031615610d3f57600a546003546009546040516370a0823160e01b81526001600160a01b03918216600482015261010090920416906370a0823190602401602060405180830381600087803b158015610c2a57600080fd5b505af1158015610c3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6291906120ce565b1080610cf55750600a54600354604051636eb1769f60e11b81523360048201523060248201526101009091046001600160a01b03169063dd62ed3e90604401602060405180830381600087803b158015610cbb57600080fd5b505af1158015610ccf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf391906120ce565b105b80610d015750600a5481115b610d3f5760405162461bcd60e51b815260206004820152600f60248201526e125b9d985b1a59081b995dc8189a59608a1b60448201526064016104ec565b604080518082019091523380825260209091018290526009805473ffffffffffffffffffffffffffffffffffffffff19169091179055600a55565b336001600160a01b0383161415610de55760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016104ec565b3360008181526001602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6000610e5f6103e8436123a3565b6001600160a01b0383166000908152600c60205260409020541115806105675750610e8b826000610484565b60011492915050565b610e9f336000610484565b600114610ef85760405162461bcd60e51b815260206004820152602160248201527f6f6e6c792063757272656e74206f776e65722063616e206163636570742062696044820152601960fa1b60648201526084016104ec565b612710612328600b54610f0b91906123dd565b610f1591906123bb565b600a5411610f655760405162461bcd60e51b815260206004820152601e60248201527f6d696e696d756d207075726368617365207072696365206e6f74206d6574000060448201526064016104ec565b600a54610f7190611609565b600954600a54610f8e9133916001600160a01b0390911690611191565b565b600080835b838111610a23576007610fa96001836123fc565b81548110610fb957610fb96124ac565b906000526020600020015482610fcf91906123a3565b915080610fdb8161247b565b915050610f95565b6001600160a01b038516331480610fff5750610fff8533610420565b61105d5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201526808185c1c1c9bdd995960ba1b60648201526084016104ec565b6107e985858585856116bd565b805161107d906002906020840190611b84565b5050565b6001600160a01b0384166110e15760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b60648201526084016104ec565b33611101816000876110f2886117d1565b6110fb886117d1565b8761181c565b6000848152602081815260408083206001600160a01b0389168452909152812080548592906111319084906123a3565b909155505060408051858152602081018590526001600160a01b0380881692600092918516917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46107e9816000878787876118b6565b61271061119f6001826123a3565b6111a990836123dd565b6111b391906123bb565b600b55600554600090612710906111ca90826123fc565b6111d490846123dd565b6111de91906123bb565b90506000612710600554846111f391906123dd565b6111fd91906123bb565b905061122b6040518060400160405280600a815260200169746f4f776e657220257360b01b81525083611a21565b61125b6040518060400160405280600e81526020016d746f526f79616c7469657320257360901b81525082611a21565b6006805490600061126b8361247b565b90915550506007805460018101825560009182527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c688018290556040516001600160a01b0387169084908381818185875af1925050503d80600081146112ec576040519150601f19603f3d011682016040523d82523d6000602084013e6112f1565b606091505b50509050806113425760405162461bcd60e51b815260206004820152601760248201527f6661696c656420746f2073656e6420746f206f776e657200000000000000000060448201526064016104ec565b6004546040516000916001600160a01b03169084908381818185875af1925050503d806000811461138f576040519150601f19603f3d011682016040523d82523d6000602084013e611394565b606091505b50509050816113e55760405162461bcd60e51b815260206004820152601b60248201527f6661696c656420746f2073656e6420746f20726f79616c74696573000000000060448201526064016104ec565b611403878760006001604051806020016040528060008152506116bd565b61140c86611a66565b61141586611a8e565b50505050505050565b81518351146114805760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016104ec565b6001600160a01b0384166114a65760405162461bcd60e51b81526004016104ec906122f0565b336114b581878787878761181c565b60005b845181101561159b5760008582815181106114d5576114d56124ac565b6020026020010151905060008583815181106114f3576114f36124ac565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156115435760405162461bcd60e51b81526004016104ec90612335565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906115809084906123a3565b92505081905550505050806115949061247b565b90506114b8565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516115eb929190612245565b60405180910390a4611601818787878787611a99565b505050505050565b600354604051632e1a7d4d60e01b815260048101839052479161010090046001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561165457600080fd5b505af1158015611668573d6000803e3d6000fd5b5047925084915061167b905083836123fc565b146116b85760405162461bcd60e51b815260206004820152600d60248201526c155b9ddc985c0819985a5b1959609a1b60448201526064016104ec565b505050565b6001600160a01b0384166116e35760405162461bcd60e51b81526004016104ec906122f0565b336116f38187876110f2886117d1565b6000848152602081815260408083206001600160a01b038a168452909152902054838110156117345760405162461bcd60e51b81526004016104ec90612335565b6000858152602081815260408083206001600160a01b038b81168552925280832087850390559088168252812080548692906117719084906123a3565b909155505060408051868152602081018690526001600160a01b03808916928a821692918616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46114158288888888886118b6565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061180b5761180b6124ac565b602090810291909101015292915050565b60005b835181101561141557600184828151811061183c5761183c6124ac565b602002602001015114158061185857506001600160a01b038616155b6118a45760405162461bcd60e51b815260206004820152601b60248201527f42616467657320617265206e6f74207472616e7366657261626c65000000000060448201526064016104ec565b806118ae8161247b565b91505061181f565b6001600160a01b0384163b156116015760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906118fa90899089908890889088906004016121ef565b602060405180830381600087803b15801561191457600080fd5b505af1925050508015611944575060408051601f3d908101601f1916820190925261194191810190612002565b60015b6119f1576119506124d8565b806308c379a0141561198a57506119656124f4565b80611970575061198c565b8060405162461bcd60e51b81526004016104ec9190612273565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016104ec565b6001600160e01b0319811663f23a6e6160e01b146114155760405162461bcd60e51b81526004016104ec906122a8565b61107d8282604051602401611a37929190612286565b60408051601f198184030181529190526020810180516001600160e01b03166309710a9d60e41b179052611b63565b611a726103e8436123a3565b6001600160a01b039091166000908152600c6020526040902055565b61086e8160016107d2565b6001600160a01b0384163b156116015760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190611add9089908990889088908890600401612191565b602060405180830381600087803b158015611af757600080fd5b505af1925050508015611b27575060408051601f3d908101601f19168201909252611b2491810190612002565b60015b611b33576119506124d8565b6001600160e01b0319811663bc197c8160e01b146114155760405162461bcd60e51b81526004016104ec906122a8565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054611b9090612413565b90600052602060002090601f016020900481019282611bb25760008555611bf8565b82601f10611bcb57805160ff1916838001178555611bf8565b82800160010185558215611bf8579182015b82811115611bf8578251825591602001919060010190611bdd565b50611c04929150611c08565b5090565b5b80821115611c045760008155600101611c09565b600067ffffffffffffffff831115611c3757611c376124c2565b604051611c4e601f8501601f19166020018261244e565b809150838152848484011115611c6357600080fd5b83836020830137600060208583010152509392505050565b80356001600160a01b0381168114611c9257600080fd5b919050565b600082601f830112611ca857600080fd5b81356020611cb58261237f565b604051611cc2828261244e565b8381528281019150858301600585901b87018401881015611ce257600080fd5b60005b85811015611d0857611cf682611c7b565b84529284019290840190600101611ce5565b5090979650505050505050565b600082601f830112611d2657600080fd5b81356020611d338261237f565b604051611d40828261244e565b8381528281019150858301600585901b87018401881015611d6057600080fd5b60005b85811015611d0857813584529284019290840190600101611d63565b600082601f830112611d9057600080fd5b611d9f83833560208501611c1d565b9392505050565b600060208284031215611db857600080fd5b611d9f82611c7b565b60008060408385031215611dd457600080fd5b611ddd83611c7b565b9150611deb60208401611c7b565b90509250929050565b600080600080600060a08688031215611e0c57600080fd5b611e1586611c7b565b9450611e2360208701611c7b565b9350604086013567ffffffffffffffff80821115611e4057600080fd5b611e4c89838a01611d15565b94506060880135915080821115611e6257600080fd5b611e6e89838a01611d15565b93506080880135915080821115611e8457600080fd5b50611e9188828901611d7f565b9150509295509295909350565b600080600080600060a08688031215611eb657600080fd5b611ebf86611c7b565b9450611ecd60208701611c7b565b93506040860135925060608601359150608086013567ffffffffffffffff811115611ef757600080fd5b611e9188828901611d7f565b60008060408385031215611f1657600080fd5b611f1f83611c7b565b91506020830135611f2f8161257e565b809150509250929050565b60008060408385031215611f4d57600080fd5b611f5683611c7b565b946020939093013593505050565b60008060408385031215611f7757600080fd5b823567ffffffffffffffff80821115611f8f57600080fd5b611f9b86838701611c97565b93506020850135915080821115611fb157600080fd5b50611fbe85828601611d15565b9150509250929050565b600060208284031215611fda57600080fd5b8151611d9f8161257e565b600060208284031215611ff757600080fd5b8135611d9f8161258c565b60006020828403121561201457600080fd5b8151611d9f8161258c565b600080600080600060a0868803121561203757600080fd5b853567ffffffffffffffff8082111561204f57600080fd5b818801915088601f83011261206357600080fd5b61207289833560208501611c1d565b9650602088013591508082111561208857600080fd5b5061209588828901611c97565b959895975050505060408401359360608101359360809091013592509050565b6000602082840312156120c757600080fd5b5035919050565b6000602082840312156120e057600080fd5b5051919050565b600080604083850312156120fa57600080fd5b50508035926020909101359150565b600081518084526020808501945080840160005b838110156121395781518752958201959082019060010161211d565b509495945050505050565b6000815180845260005b8181101561216a5760208185018101518683018201520161214e565b8181111561217c576000602083870101525b50601f01601f19169290920160200192915050565b60006001600160a01b03808816835280871660208401525060a060408301526121bd60a0830186612109565b82810360608401526121cf8186612109565b905082810360808401526121e38185612144565b98975050505050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a0608083015261222760a0830184612144565b979650505050505050565b602081526000611d9f6020830184612109565b6040815260006122586040830185612109565b828103602084015261226a8185612109565b95945050505050565b602081526000611d9f6020830184612144565b6040815260006122996040830185612144565b90508260208301529392505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b600067ffffffffffffffff821115612399576123996124c2565b5060051b60200190565b600082198211156123b6576123b6612496565b500190565b6000826123d857634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156123f7576123f7612496565b500290565b60008282101561240e5761240e612496565b500390565b600181811c9082168061242757607f821691505b6020821081141561244857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f1916810167ffffffffffffffff81118282101715612474576124746124c2565b6040525050565b600060001982141561248f5761248f612496565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d11156124f15760046000803e5060005160e01c5b90565b600060443d10156125025790565b6040516003193d81016004833e81513d67ffffffffffffffff816024840111818411171561253257505050505090565b828501915081518181111561254a5750505050505090565b843d87010160208285010111156125645750505050505090565b6125736020828601018761244e565b509095945050505050565b801515811461086e57600080fd5b6001600160e01b03198116811461086e57600080fdfea26469706673582212202536c5dda8971b43abfef094d521dbd0a72a2455124211c98d5c999114cd742a64736f6c63430008070033";
