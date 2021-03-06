/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface MemeNftInterface extends ethers.utils.Interface {
  functions: {
    "acceptBid()": FunctionFragment;
    "balanceOf(address,uint256)": FunctionFragment;
    "balanceOfBatch(address[],uint256[])": FunctionFragment;
    "baseRoyalties()": FunctionFragment;
    "bid()": FunctionFragment;
    "enterBid(uint256)": FunctionFragment;
    "hasBeenMinted()": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "licenseActive(address)": FunctionFragment;
    "minPurchasePrice()": FunctionFragment;
    "mintPrimary(string,address[],uint256,bytes32,uint256)": FunctionFragment;
    "purchase(address)": FunctionFragment;
    "royaltiesSplitter()": FunctionFragment;
    "royaltyCount()": FunctionFragment;
    "royaltyMerkleRoot()": FunctionFragment;
    "royaltyValues(uint256)": FunctionFragment;
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "sumRoyalties(uint256,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "uri(uint256)": FunctionFragment;
    "weth()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "acceptBid", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "baseRoyalties",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "bid", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "enterBid",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasBeenMinted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "licenseActive",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "minPurchasePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintPrimary",
    values: [string, string[], BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "purchase", values: [string]): string;
  encodeFunctionData(
    functionFragment: "royaltiesSplitter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyMerkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyValues",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "sumRoyalties",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;

  decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "baseRoyalties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "enterBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasBeenMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "licenseActive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minPurchasePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintPrimary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "purchase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "royaltiesSplitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "royaltyValues",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sumRoyalties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;

  events: {
    "ApprovalForAll(address,address,bool)": EventFragment;
    "TransferBatch(address,address,address,uint256[],uint256[])": EventFragment;
    "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    "URI(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "URI"): EventFragment;
}

export class MemeNft extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: MemeNftInterface;

  functions: {
    acceptBid(overrides?: Overrides): Promise<ContractTransaction>;

    "acceptBid()"(overrides?: Overrides): Promise<ContractTransaction>;

    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "balanceOf(address,uint256)"(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    "balanceOfBatch(address[],uint256[])"(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    baseRoyalties(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "baseRoyalties()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    bid(overrides?: CallOverrides): Promise<{
      bidder: string;
      value: BigNumber;
      0: string;
      1: BigNumber;
    }>;

    "bid()"(overrides?: CallOverrides): Promise<{
      bidder: string;
      value: BigNumber;
      0: string;
      1: BigNumber;
    }>;

    enterBid(
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "enterBid(uint256)"(
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    hasBeenMinted(overrides?: CallOverrides): Promise<{
      0: boolean;
    }>;

    "hasBeenMinted()"(overrides?: CallOverrides): Promise<{
      0: boolean;
    }>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "isApprovedForAll(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    licenseActive(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "licenseActive(address)"(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    minPurchasePrice(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "minPurchasePrice()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    mintPrimary(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "mintPrimary(string,address[],uint256,bytes32,uint256)"(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    purchase(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "purchase(address)"(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    royaltiesSplitter(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "royaltiesSplitter()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    royaltyCount(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "royaltyCount()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    royaltyMerkleRoot(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "royaltyMerkleRoot()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    royaltyValues(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "royaltyValues(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,uint256,bytes)"(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setApprovalForAll(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    sumRoyalties(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "sumRoyalties(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    uri(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "uri(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    weth(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "weth()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;
  };

  acceptBid(overrides?: Overrides): Promise<ContractTransaction>;

  "acceptBid()"(overrides?: Overrides): Promise<ContractTransaction>;

  balanceOf(
    account: string,
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "balanceOf(address,uint256)"(
    account: string,
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfBatch(
    accounts: string[],
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "balanceOfBatch(address[],uint256[])"(
    accounts: string[],
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  baseRoyalties(overrides?: CallOverrides): Promise<BigNumber>;

  "baseRoyalties()"(overrides?: CallOverrides): Promise<BigNumber>;

  bid(overrides?: CallOverrides): Promise<{
    bidder: string;
    value: BigNumber;
    0: string;
    1: BigNumber;
  }>;

  "bid()"(overrides?: CallOverrides): Promise<{
    bidder: string;
    value: BigNumber;
    0: string;
    1: BigNumber;
  }>;

  enterBid(
    _value: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "enterBid(uint256)"(
    _value: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  hasBeenMinted(overrides?: CallOverrides): Promise<boolean>;

  "hasBeenMinted()"(overrides?: CallOverrides): Promise<boolean>;

  isApprovedForAll(
    account: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isApprovedForAll(address,address)"(
    account: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  licenseActive(_holder: string, overrides?: CallOverrides): Promise<boolean>;

  "licenseActive(address)"(
    _holder: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minPurchasePrice(overrides?: CallOverrides): Promise<BigNumber>;

  "minPurchasePrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  mintPrimary(
    uri_: string,
    _licenses: string[],
    _baseRoyalties: BigNumberish,
    _royaltiesRoot: BytesLike,
    _basePrice: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "mintPrimary(string,address[],uint256,bytes32,uint256)"(
    uri_: string,
    _licenses: string[],
    _baseRoyalties: BigNumberish,
    _royaltiesRoot: BytesLike,
    _basePrice: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  purchase(
    _currentOwner: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "purchase(address)"(
    _currentOwner: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  royaltiesSplitter(overrides?: CallOverrides): Promise<string>;

  "royaltiesSplitter()"(overrides?: CallOverrides): Promise<string>;

  royaltyCount(overrides?: CallOverrides): Promise<BigNumber>;

  "royaltyCount()"(overrides?: CallOverrides): Promise<BigNumber>;

  royaltyMerkleRoot(overrides?: CallOverrides): Promise<string>;

  "royaltyMerkleRoot()"(overrides?: CallOverrides): Promise<string>;

  royaltyValues(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "royaltyValues(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,uint256,bytes)"(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setApprovalForAll(address,bool)"(
    operator: string,
    approved: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  sumRoyalties(
    _start: BigNumberish,
    _end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "sumRoyalties(uint256,uint256)"(
    _start: BigNumberish,
    _end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  uri(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "uri(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  weth(overrides?: CallOverrides): Promise<string>;

  "weth()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptBid(overrides?: CallOverrides): Promise<void>;

    "acceptBid()"(overrides?: CallOverrides): Promise<void>;

    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOf(address,uint256)"(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "balanceOfBatch(address[],uint256[])"(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    baseRoyalties(overrides?: CallOverrides): Promise<BigNumber>;

    "baseRoyalties()"(overrides?: CallOverrides): Promise<BigNumber>;

    bid(overrides?: CallOverrides): Promise<{
      bidder: string;
      value: BigNumber;
      0: string;
      1: BigNumber;
    }>;

    "bid()"(overrides?: CallOverrides): Promise<{
      bidder: string;
      value: BigNumber;
      0: string;
      1: BigNumber;
    }>;

    enterBid(_value: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "enterBid(uint256)"(
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    hasBeenMinted(overrides?: CallOverrides): Promise<boolean>;

    "hasBeenMinted()"(overrides?: CallOverrides): Promise<boolean>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isApprovedForAll(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    licenseActive(_holder: string, overrides?: CallOverrides): Promise<boolean>;

    "licenseActive(address)"(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minPurchasePrice(overrides?: CallOverrides): Promise<BigNumber>;

    "minPurchasePrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    mintPrimary(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "mintPrimary(string,address[],uint256,bytes32,uint256)"(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    purchase(_currentOwner: string, overrides?: CallOverrides): Promise<void>;

    "purchase(address)"(
      _currentOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    royaltiesSplitter(overrides?: CallOverrides): Promise<string>;

    "royaltiesSplitter()"(overrides?: CallOverrides): Promise<string>;

    royaltyCount(overrides?: CallOverrides): Promise<BigNumber>;

    "royaltyCount()"(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyMerkleRoot(overrides?: CallOverrides): Promise<string>;

    "royaltyMerkleRoot()"(overrides?: CallOverrides): Promise<string>;

    royaltyValues(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "royaltyValues(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,uint256,bytes)"(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setApprovalForAll(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    sumRoyalties(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sumRoyalties(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    uri(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "uri(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    weth(overrides?: CallOverrides): Promise<string>;

    "weth()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    ApprovalForAll(
      account: string | null,
      operator: string | null,
      approved: null
    ): EventFilter;

    TransferBatch(
      operator: string | null,
      from: string | null,
      to: string | null,
      ids: null,
      values: null
    ): EventFilter;

    TransferSingle(
      operator: string | null,
      from: string | null,
      to: string | null,
      id: null,
      value: null
    ): EventFilter;

    URI(value: null, id: BigNumberish | null): EventFilter;
  };

  estimateGas: {
    acceptBid(overrides?: Overrides): Promise<BigNumber>;

    "acceptBid()"(overrides?: Overrides): Promise<BigNumber>;

    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOf(address,uint256)"(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOfBatch(address[],uint256[])"(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    baseRoyalties(overrides?: CallOverrides): Promise<BigNumber>;

    "baseRoyalties()"(overrides?: CallOverrides): Promise<BigNumber>;

    bid(overrides?: CallOverrides): Promise<BigNumber>;

    "bid()"(overrides?: CallOverrides): Promise<BigNumber>;

    enterBid(_value: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    "enterBid(uint256)"(
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    hasBeenMinted(overrides?: CallOverrides): Promise<BigNumber>;

    "hasBeenMinted()"(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isApprovedForAll(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    licenseActive(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "licenseActive(address)"(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minPurchasePrice(overrides?: CallOverrides): Promise<BigNumber>;

    "minPurchasePrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    mintPrimary(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "mintPrimary(string,address[],uint256,bytes32,uint256)"(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    purchase(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "purchase(address)"(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    royaltiesSplitter(overrides?: CallOverrides): Promise<BigNumber>;

    "royaltiesSplitter()"(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyCount(overrides?: CallOverrides): Promise<BigNumber>;

    "royaltyCount()"(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    "royaltyMerkleRoot()"(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyValues(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "royaltyValues(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,uint256,bytes)"(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setApprovalForAll(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    sumRoyalties(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "sumRoyalties(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uri(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "uri(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<BigNumber>;

    "weth()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptBid(overrides?: Overrides): Promise<PopulatedTransaction>;

    "acceptBid()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address,uint256)"(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOfBatch(address[],uint256[])"(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    baseRoyalties(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "baseRoyalties()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bid(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "bid()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    enterBid(
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "enterBid(uint256)"(
      _value: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    hasBeenMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "hasBeenMinted()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isApprovedForAll(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    licenseActive(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "licenseActive(address)"(
      _holder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minPurchasePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "minPurchasePrice()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintPrimary(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "mintPrimary(string,address[],uint256,bytes32,uint256)"(
      uri_: string,
      _licenses: string[],
      _baseRoyalties: BigNumberish,
      _royaltiesRoot: BytesLike,
      _basePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    purchase(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "purchase(address)"(
      _currentOwner: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    royaltiesSplitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "royaltiesSplitter()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    royaltyCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "royaltyCount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    royaltyMerkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "royaltyMerkleRoot()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    royaltyValues(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "royaltyValues(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,uint256,bytes)"(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setApprovalForAll(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    sumRoyalties(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "sumRoyalties(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uri(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "uri(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "weth()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
