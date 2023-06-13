import * as BNS from '../../../utils/BNBDomain';
import * as ENS from '../../../utils/ENSDomain';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { RxCrossCircled } from 'react-icons/rx';
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { useDapp } from '../../../contexts/dapp';
import { useState } from 'react';

const web3 = new Web3();

export default function TransferDialog(props) {
  const { open, close, domain } = props;
  const { networkId, address, provider, signer } = useDapp();
  const [loading, setLoading] = useState(false);
  const [toAddr, setToAddr] = useState('');
  const linearGradient =
    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)';

  const transferDomain = async () => {
    const isValidAddr = web3.utils.isAddress(toAddr);
    if (!isValidAddr || toAddr === address) {
      toast.error('Input valid address');
      return;
    }
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    setLoading(true);
    try {
      const result = await domainFuncs.transfer(
        { from: address, to: toAddr, name: domain.name },
        provider,
        signer,
      );
      if (result) {
        toast.success('Successfully Transfered a domain');
      } else {
        toast.error('Failed to transfer');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setTimeout(() => close(), 500);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxHeight: 435,
          background: '#2A2A2A',
        },
      }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <RxCrossCircled color={'#4BD8D8'} onClick={close} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            color={'white'}
            sx={{
              fontSize: '20px',
              fontWeight: '800',
            }}
          >
            Transfer Domains
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Approve
        </Typography>
        <Typography
          sx={{ color: 'white', wordBreak: 'break-all', fontSize: '14px' }}
        >
          Contract approval allows the contract to perform transfering of
          domains on your behalf
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '16px',
          }}
        >
          Domainlabs Marketplace:
        </Typography>
        <TextField
          required
          variant="filled"
          sx={{
            width: '100%',
            marginTop: '10px',
            '& input': {
              padding: '10px 16px !important',
              fontSize: '16px',
              fontFamily: 'Inter',
              color: 'white',
            },
            backgroundColor: '#AAA',
            border: 'none',
            color: 'white',
          }}
          value={toAddr}
          onChange={(e) => setToAddr(e.target.value)}
          placeholder={address}
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: '16px 24px',
        }}
      >
        <LoadingButton
          autoFocus
          onClick={transferDomain}
          loading={loading}
          sx={{
            background: linearGradient,
            width: '100%',
            color: 'white',
          }}
        >
          Approve
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
