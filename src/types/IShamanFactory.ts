/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IShaman } from "./IShaman";

export class IShamanFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IShaman {
    return new Contract(address, _abi, signerOrProvider) as IShaman;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "loot",
        type: "uint96",
      },
      {
        internalType: "uint96",
        name: "shares",
        type: "uint96",
      },
    ],
    name: "memberAction",
    outputs: [
      {
        internalType: "uint96",
        name: "lootOut",
        type: "uint96",
      },
      {
        internalType: "uint96",
        name: "sharesOut",
        type: "uint96",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
