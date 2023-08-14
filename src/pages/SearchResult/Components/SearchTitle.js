import { Box, Typography } from '@mui/material';
import { blackVectorImage, whiteVectorImage } from 'utils/images';

import { useNavigate } from 'react-router';
import { useTheme } from 'contexts/theme';

const SearchTitle = () => {
  const navigate = useNavigate();
  const { theme, color } = useTheme();
  const backHome = () => {
    navigate('/');
  };

  return (
    <Box display={{ xs: 'block', sm: 'flex' }} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'}>
        <img
          src={theme === 'dark-theme' ? whiteVectorImage : blackVectorImage}
          width={'15.5px'}
          height={'31px'}
          style={{ cursor: 'pointer' }}
          onClick={backHome}
          alt="back"
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
            color: color,
            fontSize: '40px',
            lineHeight: '48px',
            letterSpacing: '-0.01rem',
          }}
          onClick={backHome}
        >
          Search Result
        </Typography>
      </Box>

      <Box display={'flex'} mt={{ xs: '10px', sm: '0' }}>
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
          // onClick={gotoCartPage}
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
          {` Search results`}
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchTitle;
