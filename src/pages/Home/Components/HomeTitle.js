import { Box, Typography } from '@mui/material';

import { useTheme } from 'contexts/theme';

const HomeTitle = () => {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        paddingLeft: '0px',
        borderRadius: '12px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* title of main page*/}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '40px',
        }}
      >
        <Typography
          fontSize={{ xs: '25px', md: '33px' }}
          mr={{ xs: '2px', sm: '5px' }}
          py="5px"
          sx={{
            borderRadius: '12px',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme === 'dark-theme' ? 'white' : 'black',
            lineHeight: '1',
            fontWeight: '700',
            whiteSpace: 'nowrap',
          }}
          fontWeight={400}
          align="center"
        >
          {'Search For Web3 Domains'}
        </Typography>
      </Box>

      {/* description of main page*/}
      <Box>
        <Typography
          fontSize={{ xs: '12px', md: '16px' }}
          px={1}
          fontFamily={'Inter'}
          py="5px"
          sx={{
            borderRadius: '12px',
            textAlign: 'center',
            color: theme === 'dark-theme' ? '#BABABA' : '#515151',
          }}
          fontWeight={400}
          align="center"
        >
          {
            'Effortlessly manage your Blockchain Domains including .ETH, .BNB, and .Sol with Domain Labs.'
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeTitle;
