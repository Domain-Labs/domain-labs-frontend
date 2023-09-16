import { Avatar, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import WalletSelectModal from 'components/Modal/WalletSelectModal';
import { colors } from 'config';
import { sampleAvatar } from 'utils/images';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useDapp } from 'contexts/dapp';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

// import {} from '@wagmi/core'

export default function WalletConnectButton({ ...others }) {
  const [walletSelectOpen, setWalletSelectOpen] = useState(false);

  const { openConnectModal } = useConnectModal();
  const { setVisible } = useWalletModal();
  const { isConnected } = useAccount();
  const { publicKey } = useWallet();
  const dappInfo = useDapp();

  const connectSolana = () => {
    setWalletSelectOpen(false);
    setVisible(true);
  };

  const connectEVM = async () => {
    setWalletSelectOpen(false);
    if (!isConnected) openConnectModal();
  };

  useEffect(() => {
    // console.log(publicKey.toString(), 'public key');
  }, [publicKey]);

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: colors.primary,
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '28px',
          alignItems: 'center',
          alignContent: 'center',
          letterSpacing: '-0.01em',
          height: '45px',
          textTransform: 'none',
        }}
        onClick={() => setWalletSelectOpen(true)}
        {...others}
      >
        {dappInfo.isConnected ? (
          <Avatar
            alt="avatar"
            variant="circular"
            src={sampleAvatar}
            sx={{
              border: 'none',
              width: '30px',
              height: '30px',
            }}
          />
        ) : (
          ''
        )}
        {dappInfo.isConnected
          ? dappInfo.address
            ? dappInfo.address.slice(0, 4) +
              '...' +
              dappInfo.address.slice(-4, -1)
            : ''
          : 'Connect Wallet'}
      </Button>
      <WalletSelectModal
        open={walletSelectOpen}
        handleClose={() => setWalletSelectOpen(false)}
        solanaConnect={connectSolana}
        evmConnect={connectEVM}
      />
    </Box>
  );
}
