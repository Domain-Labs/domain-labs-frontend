import { Box, Typography } from '@mui/material';
import { blackVectorImage, whiteVectorImage } from 'utils/images';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router';
import { useTheme } from 'contexts/theme';

const CartTitle = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/');
  };

  return (
    <Box>
      {' '}
      <Box display={{ md: 'block', lg: 'flex' }} alignItems={'center'}>
        <Box display={'flex'} alignItems={'center'}>
          <img
            src={theme === 'dark-theme' ? whiteVectorImage : blackVectorImage}
            width={'15.5px'}
            height={'31px'}
            style={{ cursor: 'pointer' }}
            onClick={backHome}
            alt="backHome"
          />
          <Typography
            fontSize={{
              md: '24px',
              xs: '18px',
            }}
            fontWeight={700}
            top={{
              md: 30,
              xs: 70,
            }}
            ml={{ xs: '20px', sm: '34.5px' }}
            left={{
              md: 200,
              xs: 20,
            }}
            sx={{
              fontFamily: 'Inter',
              fontWeight: '600',
              color: theme === 'dark-theme' ? 'white' : 'black',
              fontSize: '40px',
              lineHeight: '48px',
              letterSpacing: '-0.01rem',
            }}
            onClick={backHome}
          >
            Shopping Cart
          </Typography>
        </Box>

        <Box display={'flex'} mt={{ xs: '10px', lg: '0' }}>
          <Typography
            fontSize={{
              md: '24px',
              xs: '18px',
            }}
            fontWeight={700}
            top={{
              md: 30,
              xs: 70,
            }}
            left={{
              md: 200,
              xs: 20,
            }}
            sx={{
              fontSize: '14px',
              lineHeight: '17px',
              color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
              marginLeft: '20px',
            }}
          >
            {`Domain Labs  > `}
          </Typography>
          <Typography
            ml={'5px'}
            sx={{
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '17px',
              paddngRight: '5px',
              textDecoration: 'underline',
              background:
                'linear-gradient(87.95deg, #4BD8D8 -3.28%, #146EB4 106.25%)',
              webkitBackgroundClip: 'text',
              textDecorationLine: 'underline',
              webkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            {` Shopping Cart`}
          </Typography>
        </Box>
      </Box>
      <Box mt={5}>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '19px',
            letterSpacing: '-0.01em',
            color: '#7A7A7A',
          }}
        >
          These domains will be registered to
        </Typography>
        <Box
          px={10}
          sx={{
            background: 'white',
            boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.25)',
            borderRadius: '40px',
            height: '51px',
            marginTop: '22px',
            maxWidth: '640px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default CartTitle;
