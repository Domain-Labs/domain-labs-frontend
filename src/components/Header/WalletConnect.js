import { ConnectButton } from '@rainbow-me/rainbowkit';
import { chainId, useAccount, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import { useCounterStore } from '../../utils/store'
const WalletConnect = () => {
  const { data } = useAccount();
  const { activeChain } = useNetwork();
  const [hasMounted, setHasMounted] = useState(false);
  const [count, setCount] = useCounterStore();
  useEffect(() => {
    setHasMounted(true);

  }, []);
  useEffect(() => {
    if (data)
      setCount({ ...count, address: data })
  }, [])
  if (!hasMounted) {
    return null;
  }

  // This when the wallet is not connected
  if (!data) {

    return (
      <div className='justify-center items-center h-screen flex '>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className='justify-center items-center flex '>
      <ConnectButton />
    </div>
  );
};

export default WalletConnect;