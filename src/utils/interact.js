import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useAccount,
  useWaitForTransaction,
} from 'wagmi';
import { ethers } from 'ethers';
import axios from 'axios';
import { bscChainId, bscTestnetChainId, contractAddresses, } from '../config';
import contractABI from '../assets/abi/contract-abi.json';
import { useDappContext } from './context';

export const useBulkIsDomain = () => {
  const { cartStatus, } = useDappContext();
  const { chain } = useNetwork();
  const chainId = chain?.id != undefined ? chain.id :
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId;

  const { data: bulkIsdomain, error, isLoading } = useContractRead({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: "bulkIsdomain",
    args: [cartStatus.names ?? ['example']],
    onSuccess() {
      console.log("bulk is domain success: ", bulkIsdomain);
    },
    onError(error) {
      console.log("error occured in use bulk is domain: ", error);
    }
  });

  return {
    status: error == undefined ? true : false,
    result: bulkIsdomain,
    isLoading,
  }
}

export const useReadDomainByName = (detailName) => {
  const { chain } = useNetwork();
  const chainId = chain?.id != undefined ? chain.id :
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId;

  const { data: readDomainByName, error, isLoading } = useContractRead({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: "readDomainByName",
    args: [detailName],
    onSuccess() {
      console.log("read domain by name success: ", readDomainByName);
    },
    onError(error) {
      console.log("error occured in read domain by name: ", error);
    }
  });

  return {
    status: error == undefined ? true : false,
    result: readDomainByName,
    isLoading,
  }
}

export const useBulkBuyDomain = (names, deadlines, totalValue) => {
  const { chain } = useNetwork();
  const { address, } = useAccount();
  const chainId = chain?.id != undefined ? chain.id :
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId;

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: 'bulkBuyDomain',
    args: [names, deadlines],
    overrides: {
      value: ethers.utils.parseEther(totalValue?.toString()),
    },
    onSuccess(data) {
      console.log('prepare contract write Success', data)
    },
    onError(prepareError) {
      console.log('prepare contract write Error', prepareError)
    },
  })
  const { write: buyFunction, data } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("wait for transaction success: ", data);
    },
    onError(error) {
      console.log('wait for transaction result error: ', error);
    },
  })

  return {
    status: error == undefined ? true : false,
    isLoading,
    buyFunction,
    isSuccess,
  }
}