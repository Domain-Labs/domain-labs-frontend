import {
  getBNBRegisterContract,
  getBNBResolverContract,
  getBaseRegisterContract,
  getDomainLabsBNBContract,
} from './Contracts';

import { BigNumber } from 'ethers';
import { Buffer } from 'buffer';
import Web3 from 'web3';
import axios from 'axios';
import { labelhash } from './labelhash';
import { namehash } from './namehash';

// import SID, {SIDfunctions} from '@siddomains/sidjs'

const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');
window.Buffer = window.Buffer || Buffer;

const SPACE_ID_RESOLVER_ADDR = '0x7a18768edb2619e73c4d5067b90fd84a71993c1d';
const SPACE_ID_BNB_REGISTER_ADDR = '0xD9A99AE1f5D173cCf36E19777ACa5B8268B5F291';
const SPACE_ID_BASE_REGISTER_ADDR =
  '0xE3b1D32e43Ce8d658368e2CBFF95D57Ef39Be8a6';

const DOMAINLABS_ADDR = '0xE945FfDebB4e2b710B39816cdD018709E7A9eD68';

export const checkAvailability = async (name, provider) => {
  const Register = getBNBRegisterContract({
    address: SPACE_ID_BNB_REGISTER_ADDR,
    provider,
  });
  const Resolver = getBNBResolverContract({
    address: SPACE_ID_RESOLVER_ADDR,
    provider,
  });
  const available = await Register['available(string)'](name);
  const namedHash = namehash(`${name}.bnb`);
  if (!available) {
    const sid = new SID({
      provider,
      sidAddress: SIDfunctions.getSidAddress(56),
    });
    const address = await sid.name(`${name}.bnb`).getAddress(); // 0x123
    // const address1 = await Resolver['addr(bytes32)'](namedHash);
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
    address: DOMAINLABS_ADDR,
    provider,
  });
  const rentPrice = await Register['rentPrice(string,uint256)'](
    name,
    days * 24 * 3600,
  );
  console.log(Math.round(rentPrice / Math.pow(10, 15)) / 1000, 'rer');
  return Math.round(rentPrice / Math.pow(10, 15)) / 1000;
};

export const getRentPrices = async (results, provider) => {
  const Register = getDomainLabsBNBContract({
    address: DOMAINLABS_ADDR,
    provider,
  });
  const [rentPrice] = await Register['rentPrices((string,uint256,bytes32)[])'](
    results,
  );
  console.log(rentPrice, 'rent prices');
  return rentPrice;
};

export const commits = async (results, provider, signer) => {
  const Register = getDomainLabsBNBContract({
    address: DOMAINLABS_ADDR,
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
    console.log(provider.connection.url);
    // const transRlts = await web3.eth.getTransactionReceipt(commitment.hash);
    // console.log(commitment, transRlts, 'transRlts');
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const register = async (results, provider, signer) => {
  const Register = getDomainLabsBNBContract({
    address: DOMAINLABS_ADDR,
    provider,
  });
  const rlts = results.map((item) => {
    return {
      name: item.name,
      duration: item.duration,
      secret: item.secret,
    };
  });
  const price = await getRentPrices(rlts, provider);
  console.log(price, 'price');
  const permanantRegister = Register.connect(signer);
  const regRlts = await permanantRegister[
    'registerBnb((string,uint256,bytes32)[],address)'
  ](rlts, SPACE_ID_RESOLVER_ADDR, {
    value: BigNumber.from(price)
      .mul(BigNumber.from(105))
      .div(BigNumber.from(100)),
    gasLimit: 600000 * rlts.length,
  });
  // return true;
  console.log(regRlts, 'register hash');
  const web3 = new Web3(provider.connection.url);
  let transRlts;
  do {
    transRlts = await web3.eth.getTransactionReceipt(regRlts.hash);
    console.log(transRlts, 'transaction hash');
    // if (transRlts && transRlts.status) {
    //   return true;
    // } else {
    //   return false;
    // }
  } while (transRlts);
};

export const getPriceInUSD = async () => {
  const res = await axios.get(
    'https://binance.com/api/v3/ticker/price?symbol=BNBUSDT',
    {},
  );
  return res.data.price;
  // return 307;
};
