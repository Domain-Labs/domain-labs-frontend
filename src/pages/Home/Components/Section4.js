import { Box, Typography } from '@mui/material';

import { colors } from 'config';
import section4 from 'assets/image/home-page/section4.png';
import section4_after from 'assets/image/home-page/section4_after.png';
import section4_after_dark from 'assets/image/home-page/section4_after_dark.png';
import section4_before from 'assets/image/home-page/section4_before.png';
import section4_before_dark from 'assets/image/home-page/section4_before_dark.png';
import { useTheme } from 'contexts/theme';

const Section4 = () => {
  const { theme, bgColor } = useTheme();

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
        Your Name, Your Security{' '}
      </Typography>
      <Typography
        fontSize={{ xs: '14px', md: '16px' }}
        sx={{
          textAlign: 'center',
          fontWeight: '400',
          color: theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
        }}
      >
        Safeguard your crypto transactions. No more confusing, long wallet
        addresses - just an easy-to-remember name.
      </Typography>
      <Box
        sx={{
          maxWidth: '960px',
          mt: '50px',
          justifyContent: 'center',
          mx: 'auto',
        }}
        display={{
          xs: 'block',
          sm: 'flex',
        }}
      >
        <Box
          width={{
            sm: '320px',
            md: '360px',
          }}
          sx={{
            borderRadius: '35px',
            background: 'rgba(255,255,255,0.01)',
            boxShadow:
              '0px 1px 40px 0px rgba(13, 137, 207, 0.15) inset, 0px 4px 18px 0px rgba(8, 59, 88, 0.30) inset, 0px 0px 15px -6px #0D89CF inset, 0px 4px 50px 20px rgba(13, 137, 207, 0.02) inset',
            backdropFilter: 'blur(12.5px)',
            marginX: 'auto',
            mt: '50px',
            // height: '400px',
            backgroundImage: `url(${section4})`,
            padding: '40px',
          }}
        >
          <Box
            sx={{
              borderRadius: '10px',
              background: bgColor,
              padding: '20px',
            }}
          >
            <Typography
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Before
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
                wordBreak: 'break-word',
              }}
            >
              Imagine trying to send money to an address like
              '0x1234abc567def890ghi12jkl345mno678pqr90stu'. It's easy to make
              mistakes.
            </Typography>
            <img
              src={
                theme === 'dark-theme' ? section4_before_dark : section4_before
              }
              width={'100%'}
              alt="before"
            />
          </Box>
        </Box>
        <Box
          width={{
            sm: '320px',
            md: '360px',
          }}
          sx={{
            borderRadius: '35px',
            background: 'rgba(255,255,255,0.01)',
            boxShadow:
              '0px 1px 40px 0px rgba(13, 137, 207, 0.15) inset, 0px 4px 18px 0px rgba(8, 59, 88, 0.30) inset, 0px 0px 15px -6px #0D89CF inset, 0px 4px 50px 20px rgba(13, 137, 207, 0.02) inset',
            backdropFilter: 'blur(12.5px)',
            marginX: 'auto',
            mt: '50px',
            // height: '400px',
            backgroundImage: `url(${section4})`,
            padding: '40px',
          }}
        >
          <Box
            sx={{
              borderRadius: '10px',
              background: bgColor,
              padding: '20px',
            }}
          >
            <Typography
              fontSize={{ xs: '16px', md: '18px' }}
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              After
            </Typography>
            <Typography
              fontSize={{ xs: '12px', md: '14px' }}
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              With Domain Labs, it’s transformed to ‘Clio.eth sends $50 to
              Nick.eth’. It’s just as easy as sending money through Venmo.
            </Typography>
            <img
              src={
                theme === 'dark-theme' ? section4_after_dark : section4_after
              }
              width={'100%'}
              alt="after"
            />
          </Box>
        </Box>
      </Box>
      <Typography
        fontSize={{
          xs: '18px',
          sm: '20px',
        }}
        sx={{
          mt: '30px',
          textAlign: 'center',
          fontWeight: '400',
          color: theme === 'dark-theme' ? colors.whiteSmoke : 'black',
        }}
      >
        It’s happening on the secure and decentralized blockchain network,{' '}
        <br />
        thanks to the Ethereum Name Service (ENS).
      </Typography>
    </Box>
  );
};

export default Section4;
