import {
  getBNBRegisterContract,
  getBaseRegisterContract,
  getDomainLabsBNBContract,
} from './Contracts';

import { BigNumber } from 'ethers';
import { Buffer } from 'buffer';
import Web3 from 'web3';
import { getTransactionReceiptMined } from './EtherUtils';
import { labelhash } from './labelhash';
import { namehash } from './namehash';

// order is very important
window.Buffer = window.Buffer || Buffer;
const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');

const SPACE_ID_RESOLVER_ADDR = '0x7a18768edb2619e73c4d5067b90fd84a71993c1d';
const SPACE_ID_BNB_REGISTER_ADDR = '0xD9A99AE1f5D173cCf36E19777ACa5B8268B5F291';
const SPACE_ID_BASE_REGISTER_ADDR =
  '0xE3b1D32e43Ce8d658368e2CBFF95D57Ef39Be8a6';

const BNS_DOMAIN_LABS = '0xE945FfDebB4e2b710B39816cdD018709E7A9eD68';

export const checkAvailability = async (name, provider) => {
  const Register = getBNBRegisterContract({
    address: SPACE_ID_BNB_REGISTER_ADDR,
    provider,
  });
  const available = await Register['available(string)'](name);
  if (!available) {
    const sid = new SID({
      provider,
      sidAddress: SIDfunctions.getSidAddress(56),
    });
    const address = await sid.name(`${name}.bnb`).getAddress(); // 0x123
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
  const Register = getBaseRegisterContract({
    address: SPACE_ID_BASE_REGISTER_ADDR,
    provider,
  });
  const labelhashedName = labelhash(name);
  const expiry = await Register['nameExpires(uint256)'](labelhashedName);
  return expiry;
};

export const getRentPrice = async (name, days, provider) => {
  const Register = getDomainLabsBNBContract({
    address: BNS_DOMAIN_LABS,
    provider,
  });
  console.log(Register, 'register');
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
  const Register = getDomainLabsBNBContract({
    address: BNS_DOMAIN_LABS,
    provider,
  });
  const [rentPrice] = await Register['rentPrices((string,uint256,bytes32)[])'](
    results,
  );
  return rentPrice;
};

export const commits = async (results, provider, signer) => {
  const Register = getDomainLabsBNBContract({
    address: BNS_DOMAIN_LABS,
    provider,
  });
  const rlts = results.map((item) => {
    return {
      name: item.name,
      duration: item.duration,
      secret: item.secret,
    };
  });
  // console.log(Register, rlts);
  const permanantRegister = Register.connect(signer);
  try {
    const commitment = await permanantRegister[
      'commits((string,uint256,bytes32)[])'
    ](rlts, { gasLimit: 400000 * rlts.length });
    // const web3 = new Web3(provider.connection.url);
    const web3 = new Web3(provider.connection.url);
    const receipt = await getTransactionReceiptMined(web3, commitment.hash);
    if (receipt.status) {
      return true;
    } else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const register = async (results, provider, signer) => {
  const Register = getDomainLabsBNBContract({
    address: BNS_DOMAIN_LABS,
    provider,
  });
  const rlts = results.map((item) => {
    return {
      name: item.name,
      duration: item.duration,
      secret: item.secret,
    };
  });
  try {
    const price = await getRentPrices(rlts, provider);
    const permanantRegister = Register.connect(signer);
    const regRlts = await permanantRegister[
      'registerBnb((string,uint256,bytes32)[],address)'
    ](rlts, SPACE_ID_RESOLVER_ADDR, {
      value: BigNumber.from(price)
        .mul(BigNumber.from(105))
        .div(BigNumber.from(100)),
      gasLimit: 500000 * rlts.length,
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
  const Register = getBNBRegisterContract({
    address: SPACE_ID_BNB_REGISTER_ADDR,
    provider,
  });
  const rentPrice = await Register['rentPrice(string,uint256)'](
    name,
    days * 24 * 3600,
  );

  const web3 = new Web3(provider.connection.url);
  const gasPrice = await web3.eth.getGasPrice();
  const gasPriceInETH =
    Math.round((gasPrice * 100000) / Math.pow(10, 14)) / 10000;
  return {
    price: Math.round(rentPrice['base'] / Math.pow(10, 14)) / 10000,
    gasPrice: gasPriceInETH,
  };
};

export const extend = async (result, provider, signer) => {
  const Register = getBNBRegisterContract({
    address: SPACE_ID_BNB_REGISTER_ADDR,
    provider,
  });
  const permanentRegister = Register.connect(signer);
  try {
    const rentPrice = await Register['rentPrice(string,uint256)'](
      result.name,
      result.duration * 24 * 3600,
    );
    const rlts = await permanentRegister['renewWithPoint(string,uint256,bool)'](
      result.name,
      result.duration,
      false,
      {
        value: BigNumber.from(rentPrice['base'])
          .mul(BigNumber.from(105))
          .div(BigNumber.from(100)),
        gasLimit: 200000,
      },
    );
    console.log(rlts, 'rewnew results');
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
  const Register = getBaseRegisterContract({
    address: SPACE_ID_BASE_REGISTER_ADDR,
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
