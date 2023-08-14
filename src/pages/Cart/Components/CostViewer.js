import { Box, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useTheme } from 'contexts/theme';

const CostViewer = ({
  price,
  priceInUsd,
  gasPrice,
  cart,
  domainName,
  purchaseDomain,
  loading,
}) => {
  const { theme } = useTheme();

  return (
    <Box mt={{ xs: '40px', md: '0px' }}>
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
        <Typography>Total {domainName}</Typography>
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
        <Typography>{Math.floor(price * priceInUsd * 100) / 100}</Typography>
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
        <Typography>Gas Price</Typography>
        <Typography>
          {Math.floor(gasPrice * priceInUsd * 100000) / 100000}
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
          {Math.floor((price + gasPrice) * priceInUsd * 100000) / 100000}
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
