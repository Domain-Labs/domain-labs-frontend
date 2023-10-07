import React, { useEffect, useState } from 'react';
import {
  useAccount,
  useNetwork,
  usePublicClient,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi';

import { DappContext } from './DappContext';
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react';

const DappProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { publicKey, connected } = useWallet();
  const { data: signer } = useWalletClient();

  return (
    <DappContext.Provider
      value={{
        address: address ? address : publicKey ? publicKey.toString() : '',
        isConnected: isConnected | connected,
        signer,
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
