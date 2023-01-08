import { useState } from "react";
import { DappContext } from "./context";
import {
  ethereumChain,
  bscChain,
} from "../config";

const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [currentChainIdDecimal, setCurrentChainIdDecimal] = useState(ethereumChain);
  const [walletLoginStatus, setWalletLoginStatus] = useState(false);
  const [web3Main, setWeb3Main] = useState();

  return (
    <DappContext.Provider
      value={{
        provider,
        setProvider,
        currentChainIdDecimal,
        setCurrentChainIdDecimal,
        walletLoginStatus,
        setWalletLoginStatus,
        web3Main,
        setWeb3Main,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

export default ContextProvider;
