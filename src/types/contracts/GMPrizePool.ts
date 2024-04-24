/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../common";

export declare namespace GMPrizePool {
  export type WinnerStruct = {
    winnerAddress: string;
    prizeAmount: BigNumberish;
  };

  export type WinnerStructOutput = [string, BigNumber] & {
    winnerAddress: string;
    prizeAmount: BigNumber;
  };
}

export interface GMPrizePoolInterface extends utils.Interface {
  functions: {
    "depositPrize((address,uint256)[],uint256)": FunctionFragment;
    "expiredTime()": FunctionFragment;
    "getPrizeBack()": FunctionFragment;
    "getWinner(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "redeemPrize()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "depositPrize" | "expiredTime" | "getPrizeBack" | "getWinner" | "owner" | "redeemPrize",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "depositPrize", values: [GMPrizePool.WinnerStruct[], BigNumberish]): string;
  encodeFunctionData(functionFragment: "expiredTime", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPrizeBack", values?: undefined): string;
  encodeFunctionData(functionFragment: "getWinner", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "redeemPrize", values?: undefined): string;

  decodeFunctionResult(functionFragment: "depositPrize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "expiredTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrizeBack", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getWinner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeemPrize", data: BytesLike): Result;

  events: {
    "RedeemSuccess(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RedeemSuccess"): EventFragment;
}

export interface RedeemSuccessEventObject {
  sender: string;
  value: BigNumber;
}
export type RedeemSuccessEvent = TypedEvent<[string, BigNumber], RedeemSuccessEventObject>;

export type RedeemSuccessEventFilter = TypedEventFilter<RedeemSuccessEvent>;

export interface GMPrizePool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GMPrizePoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    depositPrize(
      _winnersList: GMPrizePool.WinnerStruct[],
      _expiredTime: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    expiredTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPrizeBack(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

    getWinner(account: string, overrides?: CallOverrides): Promise<[GMPrizePool.WinnerStructOutput]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    redeemPrize(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;
  };

  depositPrize(
    _winnersList: GMPrizePool.WinnerStruct[],
    _expiredTime: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  expiredTime(overrides?: CallOverrides): Promise<BigNumber>;

  getPrizeBack(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  getWinner(account: string, overrides?: CallOverrides): Promise<GMPrizePool.WinnerStructOutput>;

  owner(overrides?: CallOverrides): Promise<string>;

  redeemPrize(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  callStatic: {
    depositPrize(
      _winnersList: GMPrizePool.WinnerStruct[],
      _expiredTime: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    expiredTime(overrides?: CallOverrides): Promise<BigNumber>;

    getPrizeBack(overrides?: CallOverrides): Promise<boolean>;

    getWinner(account: string, overrides?: CallOverrides): Promise<GMPrizePool.WinnerStructOutput>;

    owner(overrides?: CallOverrides): Promise<string>;

    redeemPrize(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "RedeemSuccess(address,uint256)"(sender?: string | null, value?: null): RedeemSuccessEventFilter;
    RedeemSuccess(sender?: string | null, value?: null): RedeemSuccessEventFilter;
  };

  estimateGas: {
    depositPrize(
      _winnersList: GMPrizePool.WinnerStruct[],
      _expiredTime: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    expiredTime(overrides?: CallOverrides): Promise<BigNumber>;

    getPrizeBack(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    getWinner(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    redeemPrize(overrides?: Overrides & { from?: string }): Promise<BigNumber>;
  };

  populateTransaction: {
    depositPrize(
      _winnersList: GMPrizePool.WinnerStruct[],
      _expiredTime: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    expiredTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPrizeBack(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;

    getWinner(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemPrize(overrides?: Overrides & { from?: string }): Promise<PopulatedTransaction>;
  };
}
