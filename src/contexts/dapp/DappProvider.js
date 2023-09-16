import React, { useEffect, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi';

import { DappContext } from './DappContext';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import localStorage from 'redux-persist/es/storage';
import { rpcUrls } from '../../config';
import { useWallet } from '@solana/wallet-adapter-react';

const DappProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { publicKey, connected } = useWallet();
  const [provider, setProvider] = useState();
  const [networkId, setNetwork] = useState(1);
  const [networkType, setNetworkType] = useState('');
  const { data: signer } = useWalletClient();
  const web3Provider = usePublicClient();

  const setNetworkId = async (id) => {
    setNetwork(id);
    console.log('networkId', id);
    await localStorage.setItem('networkId', id);
  };

  useEffect(() => {
    // setProvider((signer?.provider).provider);
    // const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    // setProvider((signer?.provider).provider)

    async function setChainId() {
      // const chainId = (await web3Provider.getNetwork()).chainId;
      // if (networkId !== chainId && switchNetwork) {
      //   switchNetwork(`0x${networkId.toString(16)}`);
      // } else {
      // }
    }
    setChainId();
  }, [networkId, signer]);

  useEffect(() => {
    if (networkType === 'Solana') {
    } else if (networkType === 'Ethereum') {
    }
  }, [networkType]);

  useEffect(() => {
    if (isConnected) {
      setProvider(web3Provider);
    } else {
      const provider = new ethers.providers.AlchemyProvider(
        1,
        '8MZNUTLCQugMhLsclCvpCahkvf2TmKun',
      );
      setProvider(provider);
    }
  }, [isConnected, networkId, web3Provider]);

  useEffect(() => {
    const getNetworkId = async () => {
      const data = await localStorage.getItem('networkId');

      if (data) {
        setNetwork(Number(data));
      } else {
        setNetwork(1);
      }
    };
    getNetworkId();
  }, []);

  return (
    <DappContext.Provider
      value={{
        address: address ? address : publicKey ? publicKey.toString() : '',
        isConnected: isConnected | connected,
        provider,
        signer,
        networkId,
        setNetworkType,
        networkType,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

DappProvider.propTypes = {
  children: PropTypes.element,
};

export default DappProvider;
