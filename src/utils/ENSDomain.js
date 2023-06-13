import {
  getBaseRegisterContract,
  getDomainLabsENSContract,
  getENSBaseRegisterContract,
  getENSRegisterContract,
} from './Contracts';

import { BigNumber } from 'ethers';
import { ENS } from '@ensdomains/ensjs';
import Web3 from 'web3';
import { getTransactionReceiptMined } from '../utils/EtherUtils';
import { labelhash } from './labelhash';

const ENS_RESOLVER_ADDR = '0x231b0ee14048e9dccd1d247744d114a4eb5e8e63';
const ENS_REGISTER_ADDR = '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5';
const ENS_BASE_REGISTER_ADDR = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const ENS_DOMAIN_LABS = '0x84f742dCF445ed7e7Dce82Ae084936E489B53BA3';

export const checkAvailability = async (name, provider) => {
  const ENSInstance = new ENS();
  await ENSInstance.setProvider(provider);
  const Register = getENSRegisterContract({
    address: ENS_REGISTER_ADDR,
    provider,
  });

  const available = await Register['available(string)'](name);
  if (!available) {
    const address = await ENSInstance.getAddr(`${name}.eth`);
    const expiry = await getExpiryDate(name, provider);
    const timeLeft = expiry * 1000 - Date.now();
    const leftDays = (timeLeft / 1000 / 3600 / 24).toFixed(0);
    const expireDate = new Date(expiry * 1000).toUTCString();
    return {
      name,
      available,
      address,
      expireDate,
      leftDays,
    };
  }
  return { available, name };
};

export const getExpiryDate = async (name, provider) => {
  const Register = getENSBaseRegisterContract({
    address: ENS_BASE_REGISTER_ADDR,
    provider,
  });
  const labelhashedName = labelhash(name);
  const expiry = await Register['nameExpires(uint256)'](labelhashedName);
  return expiry;
};

export const getRentPrice = async (name, days, provider) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LABS,
    provider,
  });
  const rentPrice = await Register['rentPrice(string,uint256)'](
    name,
    days * 24 * 3600,
  );
  const web3 = new Web3(provider.connection.url);
  const gasPrice = await web3.eth.getGasPrice();
  const gasPriceInETH =
    Math.round((gasPrice * 500000) / Math.pow(10, 15)) / 1000;
  return {
    price: Math.round(rentPrice / Math.pow(10, 15)) / 1000,
    gasPrice: gasPriceInETH,
  };
};

export const getRentPrices = async (results, provider) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LABS,
    provider,
  });
  const [rentPrice] = await Register['rentPrices((string,uint256,bytes32)[])'](
    results,
  );
  return rentPrice;
};

export const commits = async (results, provider, signer) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LABS,
    provider,
  });
  const permanantRegister = Register.connect(signer);
  try {
    const commitment = await permanantRegister[
      'commits((string,uint256,bytes32)[],address)'
    ](results, ENS_RESOLVER_ADDR);
    const web3 = new Web3(provider.connection.url);
    const receipt = await getTransactionReceiptMined(web3, commitment.hash);
    if (receipt.status) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const register = async (results, provider, signer) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LABS,
    provider,
  });
  const permanantRegister = Register.connect(signer);
  const rentPrice = await getRentPrices(results, provider);
  try {
    const regRlts = await permanantRegister[
      'registerENS((string,uint256,bytes32)[],address)'
    ](results, ENS_RESOLVER_ADDR, {
      value: BigNumber.from(rentPrice)
        .mul(BigNumber.from(105))
        .div(BigNumber.from(100)),
      gasLimit: 500000 * results.length,
    });
    const web3 = new Web3(provider.connection.url);
    const receipt = await getTransactionReceiptMined(web3, regRlts.hash);
    if (receipt.status) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getExtendPrice = async (name, days, provider) => {
  const Register = getENSRegisterContract({
    address: ENS_REGISTER_ADDR,
    provider,
  });
  const rentPrice = await Register['rentPrice(string,uint256)'](
    name,
    days * 24 * 3600,
  );

  const web3 = new Web3(provider.connection.url);
  const gasPrice = await web3.eth.getGasPrice();
  const gasPriceInETH = Math.round((gasPrice * 0) / Math.pow(10, 14)) / 10000;
  return {
    price: Math.round(rentPrice / Math.pow(10, 14)) / 10000,
    gasPrice: gasPriceInETH,
  };
};

export const extend = async (result, provider, signer) => {
  const Register = getENSRegisterContract({
    address: ENS_REGISTER_ADDR,
    provider,
  });
  const permanentRegister = Register.connect(signer);
  try {
    const rentPrice = await Register['rentPrice(string,uint256)'](
      result.name,
      result.duration * 24 * 3600,
    );
    const rlts = await permanentRegister['renew(string,uint256)'](
      result.name,
      result.duration,
      {
        value: BigNumber.from(rentPrice)
          .mul(BigNumber.from(105))
          .div(BigNumber.from(100)),
        gasLimit: 200000,
      },
    );
    const web3 = new Web3(provider.connection.url);
    const receipt = await getTransactionReceiptMined(web3, rlts.hash);
    if (receipt.status) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const transfer = async (result, provider, signer) => {
  const Register = getENSBaseRegisterContract({
    address: ENS_BASE_REGISTER_ADDR,
    provider,
  });
  const { from, to, name } = result;
  const permanantRegister = Register.connect(signer);
  try {
    const transfer = await permanantRegister[
      'safeTransferFrom(address,address,uint256)'
    ](from, to, labelhash(name));
    const web3 = new Web3(provider.connection.url);
    const receipt = await getTransactionReceiptMined(web3, transfer.hash);
    if (receipt.status) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
