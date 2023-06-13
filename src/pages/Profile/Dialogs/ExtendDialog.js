import * as BNS from '../../../utils/BNBDomain';
import * as ENS from '../../../utils/ENSDomain';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { RxCrossCircled } from 'react-icons/rx';
import { domainExtensions } from '../../../config';
import { getPriceInUSD } from '../../../utils/EtherUtils';
import { useDapp } from '../../../contexts/dapp';

export default function ExtendDialog(props) {
  const { open, close, domain } = props;
  const [duration, setDuration] = useState();
  const { networkId, provider, signer } = useDapp();
  const [price, setPrice] = useState(0);
  const [priceInUSD, setPriceInUSD] = useState(0);
  const [loading, setLoading] = useState(false);
  const options = useMemo(
    () => [
      { label: '1 Year', value: 365 },
      { label: '3 Years', value: 1095 },
      { label: '5 Years', value: 1825 },
    ],
    [],
  );

  const linearGradient =
    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)';

  const handleTimeSelect = async (e) => {
    setDuration(e.target.value);
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    const result = await domainFuncs.getExtendPrice(
      domain.name,
      e.target.value,
      provider,
    );
    setPrice(result.price + result.gasPrice);
  };

  const renewDomain = async () => {
    if (!duration) return;
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    setLoading(true);
    const result = await domainFuncs.extend(
      {
        name: domain.name,
        duration,
      },
      provider,
      signer,
    );
    setLoading(false);
    console.log(result, 'result');
    setTimeout(() => close(), 500);
  };

  useEffect(() => {
    const domainName = domainExtensions[networkId];
    getPriceInUSD(domainName)
      .then((res) => {
        setPriceInUSD(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [networkId]);

  useEffect(() => {
    setPrice(0);
    setDuration(null);
  }, [open]);

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
            Renew Domain
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Renewal Duration
        </Typography>
        <Box>
          <Select
            onChange={handleTimeSelect}
            value={duration}
            sx={{
              width: '100%',
              background: '#AAA',
              border: 'none',
              height: '45px',
              fieldset: {
                border: 'none',
              },
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {options.map((option, index) => (
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Typography
          sx={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '16px',
          }}
        >
          Estimated Cost:
        </Typography>
        <TextField
          required
          disabled
          variant="filled"
          value={`${price} ${domainExtensions[networkId]}`}
          sx={{
            width: '100%',
            marginTop: '10px',
            '& input': {
              padding: '10px 16px !important',
              fontSize: '16px',
              fontFamily: 'Inter',
              color: '#2A2A2A',
            },
            backgroundColor: '#AAA',
            borderRadius: '3px',
            border: 'none',
          }}
        />
        <TextField
          required
          variant="filled"
          disabled
          value={`${price * priceInUSD} USD`}
          sx={{
            width: '100%',
            marginTop: '10px',
            '& input': {
              padding: '10px 16px !important',
              fontSize: '16px',
              fontFamily: 'Inter',
              color: '#2A2A2A',
            },
            backgroundColor: '#AAA',
            borderRadius: '3px',
            border: 'none',
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: '16px 24px',
        }}
      >
        <LoadingButton
          autoFocus
          onClick={renewDomain}
          loading={loading}
          sx={{
            background: linearGradient,
            width: '100%',
            color: 'white',
          }}
        >
          Renew
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
