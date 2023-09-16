import { createContext } from 'react';

const initialState = {
  address: '0x0',
  networkType: 'Solana' | 'Ethereum',
  isConnected: false,
  provider: undefined,
  signer: undefined,
  networkId: 1,
};

export const DappContext = createContext(initialState);
