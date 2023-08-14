import { Box, Typography } from '@mui/material';

import { colors } from 'config';
import section2 from 'assets/image/home-page/section2.png';
import section2_dark from 'assets/image/home-page/section2_dark.png';
import section2_side from 'assets/image/home-page/section2_side.png';
import { useTheme } from 'contexts/theme';

const Section2 = () => {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        marginTop: '200px',
        position: 'relative',
      }}
    >
      <Typography
        fontSize={{ xs: '25px', md: '33px' }}
        sx={{
          textAlign: 'center',
          fontWeight: '700',
          color: theme === 'dark-theme' ? 'white' : 'black',
        }}
      >
        {' '}
        Your Digital Passport{' '}
      </Typography>
      <Typography
        fontSize={{ xs: '14px', md: '16px' }}
        sx={{
          textAlign: 'center',
          fontWeight: '400',
          color: theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
        }}
      >
        Envision your domain as a universal name that encapsulates everything
        you are and own in the blockchain universe.
      </Typography>
      <Box
        sx={{
          maxWidth: '960px',
          mt: '50px',
          mx: 'auto',
        }}
        display={{
          xs: 'block',
          sm: 'flex',
        }}
      >
        <Box
          width={{
            xs: '100%',
            sm: '450px',
            md: '620px',
          }}
        >
          <img
            src={theme === 'dark-theme' ? section2_dark : section2}
            width={'100%'}
            alt=""
          />
        </Box>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Your Website
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              Personalize your digital space with your domain.
            </Typography>
          </Box>
          <Box>
            <Typography
              mt={'20px'}
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Payments
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              Use your domain to simplify crypto transactions.
            </Typography>
          </Box>

          <Box>
            <Typography
              mt={'20px'}
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Digital Identity
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              Establish your unique presence in the blockchain world.
            </Typography>
          </Box>
          <Box>
            <Typography
              mt={'20px'}
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Easy Addresses
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              Replace lengthy blockchain addresses with easy-to-remember
              domains.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '-80px',
          top: 0,
          bottom: 0,
          width: '300px',
        }}
      >
        <img src={section2_side} width={'100%'} alt="" />
      </Box>
    </Box>
  );
};

export default Section2;
