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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IRemixInterface extends ethers.utils.Interface {
  functions: {
    "requestDerivative(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "requestDerivative",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "requestDerivative",
    data: BytesLike
  ): Result;

  events: {};
}

export class IRemix extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IRemixInterface;

  functions: {
    requestDerivative(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "requestDerivative(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  requestDerivative(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "requestDerivative(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    requestDerivative(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "requestDerivative(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    requestDerivative(arg0: string, overrides?: Overrides): Promise<BigNumber>;

    "requestDerivative(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    requestDerivative(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "requestDerivative(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}