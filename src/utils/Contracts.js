import { Contract } from 'ethers';
import baseRegisterContract from '../assets/abi/BaseRegister-abi.json';
import bnbResolverContract from '../assets/abi/BNBResolver-abi.json';
import clioContract from '../assets/abi/Clio-abi.json';
import domainLabsBNBContract from '../assets/abi/Domainlabs-abi.json';
import domainLabsEnsContract from '../assets/abi/DomainlabsEns-abi.json';
import ensBaseRegisterContract from '../assets/abi/EnsBaseRegister-abi.json';
import ensRegisterContract from '../assets/abi/EnsRegister-abi.json';
import ensResolverContract from '../assets/abi/EnsResolver-abi.json';
import registerContract from '../assets/abi/BNBRegister-abi.json';

export const getBNBResolverContract = ({ address, provider }) => {
  return new Contract(address, bnbResolverContract, provider);
};

export const getBNBRegisterContract = ({ address, provider }) => {
  return new Contract(address, registerContract, provider);
};

export const getBaseRegisterContract = ({ address, provider }) => {
  return new Contract(address, baseRegisterContract, provider);
};

export const getDomainLabsBNBContract = ({ address, provider }) => {
  return new Contract(address, domainLabsBNBContract, provider);
};

export const getENSRegisterContract = ({ address, provider }) => {
  return new Contract(address, ensRegisterContract, provider);
};

export const getENSResolverContract = ({ address, provider }) => {
  return new Contract(address, ensResolverContract, provider);
};

export const getENSBaseRegisterContract = ({ address, provider }) => {
  return new Contract(address, ensBaseRegisterContract, provider);
};

export const getDomainLabsENSContract = ({ address, provider }) => {
  return new Contract(address, domainLabsEnsContract, provider);
};

export const getClioContract = ({ address, provider }) => {
  return new Contract(address, clioContract, provider);
};
