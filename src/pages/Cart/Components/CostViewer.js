import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from '@mui/material';
import { binanceImage, ensImage, solLogo } from 'utils/images';

import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useTheme } from 'contexts/theme';

const CostViewer = ({
  price,
  priceInUsd,
  gasPrice,
  cart,
  paymentOption,
  setPaymentOption,
  purchaseDomain,
  loading,
}) => {
  const { theme } = useTheme();
  // const [payMethod, setPayMethod] = useState('ETH');
  const handleChange = (e) => {
    // setPayMethod(e.target.value);
    setPaymentOption(e.target.value);
  };

  return (
    <Box
      mt={{ xs: '40px', md: '0px' }}
      sx={{
        position: 'relative',
        opacity: loading ? 0.5 : 1,
      }}
    >
      <Box
        display={loading ? 'block' : 'none'}
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <CircularProgress size={30} />
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography
          color={theme === 'dark-theme' ? 'white' : 'black'}
          sx={{
            letterSpacing: '-0.01em',
            fontWeight: '700',
            fontSize: '28px',
            lineHeight: '34px',
          }}
        >
          Total Cost
        </Typography>
        <FormControl sx={{ minWidth: 120 }} variant="standard" size="small">
          <InputLabel id="demo-select-small-label">Payment Method</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={paymentOption}
            label="Payment Option"
            onChange={handleChange}
          >
            <MenuItem value={'ETH'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <img src={ensImage} width={'20px'} alt="ETH" />
                <Typography ml={'5px'}>ETH</Typography>
              </Box>
            </MenuItem>
            <MenuItem value={'BNB'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <img src={binanceImage} width={'20px'} alt="BNB" />
                <Typography ml={'5px'}>BNB</Typography>
              </Box>
            </MenuItem>
            <MenuItem value={'SOL'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <img src={solLogo} width={'20px'} alt="SOL" />
                <Typography ml={'5px'}>SOL</Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={'8px'}
        mt={'7px'}
        sx={{
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
          width: '325px',
          borderBottom: '0.5px solid #D3D3D3',
        }}
      >
        <Typography>Total {paymentOption}</Typography>
        <Typography>{price}</Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={'8px'}
        sx={{
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
          width: '325px',
          borderBottom: '0.5px solid #D3D3D3',
        }}
      >
        <Typography>Total USD</Typography>
        <Typography>
          {Math.ceil(price * priceInUsd * 1000000) / 1000000}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={'8px'}
        sx={{
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
          width: '325px',
          borderBottom: '0.5px solid #D3D3D3',
        }}
      >
        <Typography>Network Fee</Typography>
        <Typography>
          {Math.ceil(gasPrice * priceInUsd * 10000) / 10000}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={'8px'}
        sx={{
          fontSize: '24px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
          width: '325px',
        }}
      >
        <Typography fontSize={'24px'} fontWeight={'700'}>
          Grand total($)
        </Typography>
        <Typography fontSize={'24px'} fontWeight={'700'}>
          {Math.ceil((price + gasPrice) * priceInUsd * 10000000) / 10000000}
        </Typography>
      </Box>
      <Box>
        <LoadingButton
          loading={loading}
          disabled={!cart || !cart.length}
          sx={{
            background:
              'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
            borderRadius: '12px',
            marginTop: '12px',
            color: 'white',
            // float: 'right',
            px: '40px',
          }}
          onClick={() => {
            // step === 0 ? _requestDomain() : buyDomain();
            purchaseDomain();
          }}
        >
          {/* {buttonText()} */}
          {'Purchase Domains'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CostViewer;
