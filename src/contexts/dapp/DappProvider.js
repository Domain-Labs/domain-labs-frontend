import React, { useEffect, useState } from "react";
import { useAccount, useSigner, useProvider } from "wagmi";
import PropTypes from "prop-types";
import { DappContext } from "./DappContext";

const DappProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [provider, setProvider] = useState();
  const [networkId, setNetworkId] = useState(1);
  const { data: signer } = useSigner();
  const web3Provider = useProvider();
  
  useEffect(() => {
    // setProvider((signer?.provider).provider);
    // const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    // setProvider((signer?.provider).provider)
    setProvider(web3Provider);
    async function setChainId() {
      setNetworkId((await web3Provider.getNetwork()).chainId);
    }
    setChainId();
  }, [signer, web3Provider]);

  return (
    <DappContext.Provider
      value={{
        address,
        isConnected,
        provider,
        signer,
        networkId,
        setNetworkId
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
