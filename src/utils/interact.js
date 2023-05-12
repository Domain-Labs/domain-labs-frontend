import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useAccount,
  useWaitForTransaction,
} from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { bscChainId, bscTestnetChainId, chainParams, contractAddresses, } from '../config';
import { useDappContext } from './context';
import { ClioPaymentABI, contractABI } from './assets';

export const useBulkIsDomain = () => {
  const { cartStatus, newCartStatus, } = useDappContext();
  const { chain } = useNetwork();
  const chainId = chain?.id != undefined ? chain.id :
    process.env.REACT_APP_NET_TYPE == "testnet" ? bscTestnetChainId : bscChainId;

  const { data: bulkIsdomain, error, isLoading } = useContractRead({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: "bulkIsdomain",
    cacheTime: 2_000,
    args: [
      newCartStatus.map(item => { return item.name }) ?? ['example']
    ],
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
    process.env.REACT_APP_NET_TYPE == "testnet" ? bscTestnetChainId : bscChainId;

  const { data: readDomainByName, error, isLoading } = useContractRead({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: "readDomainByName",
    cacheTime: 2_000,
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
    process.env.REACT_APP_NET_TYPE == "testnet" ? bscTestnetChainId : bscChainId;

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddresses[chainId],
    abi: contractABI,
    functionName: 'bulkBuyDomain',
    cacheTime: 2_000,
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
  const { write: bulkBuyDomainFunction, data } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
    hash: data?.hash,
    cacheTime: 2_000,
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
    bulkBuyDomainFunction,
    isSuccess,
  }
}

export const getContract = (contractAddress, contractABI, provider) => {
  const contract = new ethers.Contract(contractAddress, contractABI, provider?.getSigner());

  return contract;
}