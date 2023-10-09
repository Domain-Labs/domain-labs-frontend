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
import {
  binanceIcon,
  binanceImage,
  ensImage,
  ethereumIcon,
  solLogo,
  solanaIcon,
} from 'utils/images';

import { LoadingButton } from '@mui/lab';
import PaymentItem from './PaymentItem';
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
  const handleChange = (val) => {
    // setPayMethod(e.target.value);
    setPaymentOption(val);
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
      <Box>
        <Typography
          color={theme === 'dark-theme' ? 'white' : 'black'}
          sx={{
            letterSpacing: '-0.01em',
            fontWeight: '700',
            fontSize: '32px',
            lineHeight: '34px',
          }}
        >
          Checkout
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 5,
            gap: 1,
          }}
        >
          <PaymentItem
            type={'ETH'}
            selected={paymentOption === 'ETH'}
            icon={ethereumIcon}
            onClick={() => handleChange('ETH')}
            backColor={'rgba(97, 128, 231, 0.20)'}
          />
          <PaymentItem
            type={'BNB'}
            selected={paymentOption === 'BNB'}
            icon={binanceIcon}
            onClick={() => handleChange('BNB')}
            backColor={'rgba(240, 185, 11, 0.20)'}
          />
          <PaymentItem
            type={'SOL'}
            selected={paymentOption === 'SOL'}
            icon={solanaIcon}
            onClick={() => handleChange('SOL')}
            backColor={'rgba(60, 154, 185, 0.20)'}
          />
        </Box>
        {/* <FormControl sx={{ minWidth: 120 }} variant="standard" size="small">
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
        </FormControl> */}
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
        }}
      >
        <Typography fontFamily={'Murecho'}>Subtotal</Typography>
        <Typography
          fontFamily={'Murecho'}
          sx={{
            color: 'black',
            fontWeight: 600,
          }}
        >
          ${Math.ceil((price + gasPrice) * priceInUsd * 10000000) / 10000000}
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
        }}
      >
        <Typography fontFamily={'Murecho'}>Platform fees</Typography>
        <Typography
          fontFamily={'Murecho'}
          sx={{
            color: 'black',
            fontWeight: 600,
          }}
        >
          ${Math.ceil(price * priceInUsd * 1000000) / 1000000}
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
        }}
      >
        <Typography fontFamily={'Murecho'}>Registration fees</Typography>
        <Typography
          fontFamily={'Murecho'}
          sx={{
            color: 'black',
            fontWeight: 600,
          }}
        >
          ${Math.ceil(gasPrice * priceInUsd * 10000) / 10000}
        </Typography>
      </Box>
      <Box width={'100%'} my={3} height="0.5px" bgcolor={'#BABABA'}></Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={'8px'}
        sx={{
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
          // width: '325px',
        }}
      >
        <Typography
          fontFamily={'Murecho'}
          fontSize={'16px'}
          color={'black'}
          fontWeight={'600'}
        >
          Total checkout
        </Typography>
        <Box>
          <Typography
            fontFamily={'Murecho'}
            fontSize={'16px'}
            color={'black'}
            fontWeight={'600'}
            sx={{
              float: 'right',
            }}
          >
            {Math.ceil((price + gasPrice) * 1000) / 1000} {paymentOption}
          </Typography>
          <Typography
            fontFamily={'Murecho'}
            fontSize={'16px'}
            fontWeight={'600'}
          >
            ${Math.ceil((price + gasPrice) * priceInUsd * 10000000) / 10000000}
          </Typography>
        </Box>
      </Box>
      <Box>
        <LoadingButton
          // loading={loading}
          disabled={!cart || !cart.length}
          fontFamily={'Murecho'}
          sx={{
            background:
              'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
            borderRadius: '12px',
            marginTop: '12px',
            color: 'white',
            // float: 'right',
            width: '100%',
            px: '40px',
          }}
          onClick={() => {
            // step === 0 ? _requestDomain() : buyDomain();
            purchaseDomain();
          }}
        >
          {/* {buttonText()} */}
          {'Proceed to Payment'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CostViewer;
