import './index.scss';
import {} from '@solana/wallet-adapter-react';

import * as React from 'react';

import { Box, DialogTitle, Typography } from '@mui/material';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { colors } from 'config';
import { useTheme } from 'contexts/theme';
import whiteLogoImage from 'assets/image/logo_white_mode.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WalletSelectModal({ open, handleClose }) {
  const { color, bgColor } = useTheme();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      scroll="body"
      sx={{
        zIndex: '1000 !important',
      }}
    >
      <DialogContent
        sx={{
          bgcolor: bgColor,
          color: color,
          height: '540px',
        }}
      >
        <Box
          sx={{
            padding: 5,
            textAlign: 'center',
          }}
        >
          <img
            src={whiteLogoImage}
            style={{
              height: '60px',
            }}
            alt="logo"
          />
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            DomainLabs Wallet Connection
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Ethereum Wallet Connection
          </Typography>
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
              label="Select Wallet"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '1px',
              background: colors.primary,
              mb: '20px',
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Solana Wallet Connection
          </Typography>
          <Box sx={{ justifyContent: 'center', display: 'flex', mt: '20px' }}>
            <WalletMultiButton
              // className="solana-button"
              onClick={() => {
                handleClose();
              }}
              style={{
                borderRadius: '12px',
                lineHeight: 'normal',
                display: 'flex',
                justifyContent: 'center',
                width: '200px',
                height: '50px',
                background: colors.primary,
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
