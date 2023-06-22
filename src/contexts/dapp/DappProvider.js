import React, { useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner, useSwitchNetwork } from 'wagmi';

import { DappContext } from './DappContext';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import localStorage from 'redux-persist/es/storage';
import { rpcUrls } from '../../config';

const DappProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [provider, setProvider] = useState();
  const [networkId, setNetwork] = useState(1);
  const { switchNetwork } = useSwitchNetwork();
  const { data: signer } = useSigner();
  const web3Provider = useProvider();

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
      const chainId = (await web3Provider.getNetwork()).chainId;
      if (networkId !== chainId && switchNetwork) {
        switchNetwork(`0x${networkId.toString(16)}`);
      } else {
      }
    }
    setChainId();
  }, [networkId, signer]);

  useEffect(() => {
    if (isConnected) {
      setProvider(web3Provider);
    } else {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrls[networkId]);
      console.log(provider, rpcUrls[networkId], '----------');
      setProvider(provider);
    }
  }, [isConnected, networkId, web3Provider]);

  useEffect(() => {
    const getNetworkId = async () => {
      const data = await localStorage.getItem('networkId');

      if (data) {
        console.log(data, 'networkId 2----');
        setNetwork(Number(data));
      } else {
        console.log(data, 'networkId 1----');
        setNetwork(1);
      }
    };
    getNetworkId();
  }, []);

  return (
    <DappContext.Provider
      value={{
        address,
        isConnected,
        provider,
        signer,
        networkId,
        setNetworkId,
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
