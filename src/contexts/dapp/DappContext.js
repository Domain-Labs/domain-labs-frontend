import { createContext } from "react";

const initialState = {
  address: '0x0',
  isConnected: false,
  provider: undefined,
  signer: undefined,
  networkId: 1,
  setNetworkId: () => {}
}

export const DappContext = createContext(initialState);

