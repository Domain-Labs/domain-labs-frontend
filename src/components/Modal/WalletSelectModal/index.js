import './index.scss';

import * as React from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletSelectModal({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Select Wallet'}</DialogTitle>
      <DialogContent>
        <Box className="wallet_connect_button_group">
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
            chainStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
            label="Evm Wallet"
          />
          <WalletMultiButton
            style={{
              marginTop: '10px',
              borderRadius: '12px',
            }}
          ></WalletMultiButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
