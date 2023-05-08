import {
  getDomainLabsENSContract,
  getENSBaseRegisterContract,
  getENSRegisterContract,
  getENSResolverContract,
} from './Contracts';

import { BigNumber } from 'ethers';
import { ENS } from '@ensdomains/ensjs';
import { labelhash } from './labelhash';
import { namehash } from './namehash';

const ENS_RESOLVER_ADDR = '0x231b0ee14048e9dccd1d247744d114a4eb5e8e63';
const ENS_REGISTER_ADDR = '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5';
const ENS_BASE_REGISTER_ADDR = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const ENS_DOMAIN_LBAS = '0x84f742dCF445ed7e7Dce82Ae084936E489B53BA3';

export const checkAvailability = async (name, provider) => {
  const ENSInstance = new ENS();
  await ENSInstance.setProvider(provider);
  const Register = getENSRegisterContract({
    address: ENS_REGISTER_ADDR,
    provider,
  });
  const Resolver = getENSResolverContract({
    address: ENS_RESOLVER_ADDR, //ENS_RESOLVER_ADDR,
    provider,
  });
  const available = await Register['available(string)'](name);
  const namedHash = namehash(`${name}.eth`);
  if (!available) {
    const address = await Resolver['addr(bytes32)'](namedHash);
    const profile = await ENSInstance.getProfile(`${name}.eth`);
    console.log(profile, 'profile');
    console.log(address, 'address');
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
    address: ENS_DOMAIN_LBAS,
    provider,
  });
  const rentPrice = await Register['rentPrice(string,uint256)'](
    name,
    days * 24 * 3600,
  );
  console.log(rentPrice, 'rent price');
  return Math.round(rentPrice / Math.pow(10, 15)) / 1000;
  // return rentPrice;
};

export const getRentPrices = async (results, provider) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LBAS,
    provider,
  });
  const [rentPrice] = await Register['rentPrices((string,uint256,bytes32)[])'](
    results,
  );
  return rentPrice;
};

export const commits = async (results, provider, signer) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LBAS,
    provider,
  });
  const permanantRegister = Register.connect(signer);
  try {
    await permanantRegister['commits((string,uint256,bytes32)[],address)'](
      results,
      ENS_RESOLVER_ADDR,
    );
  } catch (error) {
    console.log(error);
  }
};

export const register = async (results, provider, signer) => {
  const Register = getDomainLabsENSContract({
    address: ENS_DOMAIN_LBAS,
    provider,
  });
  const permanantRegister = Register.connect(signer);
  const rentPrice = await getRentPrices(results, provider);
  console.log(rentPrice, 'rent price');
  await permanantRegister['registerENS((string,uint256,bytes32)[],address)'](
    results,
    ENS_RESOLVER_ADDR,
    {
      value: BigNumber.from(rentPrice)
        .mul(BigNumber.from(105))
        .div(BigNumber.from(100)),
      gasLimit: 300000 * results.length,
    },
  );
};
