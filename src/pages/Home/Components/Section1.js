import { Box, Grid, Typography } from '@mui/material';

import { colors } from 'config';
import discover_i from 'assets/image/home-page/discover_i.png';
import manage_i from 'assets/image/home-page/manage_i.png';
import register_i from 'assets/image/home-page/register_i.png';
import section1_dark from 'assets/image/home-page/section1_dark.png';
import section1_light from 'assets/image/home-page/section1.png';
import section1_side from 'assets/image/svgs/home-page/section1_side.svg';
import { useTheme } from 'contexts/theme';

const ItemComponent = ({ bgColor, theme, img, text1, text2 }) => {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        padding: '20px',
        background: bgColor,
      }}
    >
      <Box
        sx={{
          width: '45px',
          height: '45px',
          borderRadius: '15px',
          background: colors.primary,
        }}
      >
        <img
          src={img}
          style={{
            borderRadius: '15px',
          }}
          width={'100%'}
          alt="discover"
        />
      </Box>
      <Typography
        fontSize={{
          xs: '14px',
          sm: '16px',
        }}
        sx={{
          fontWeight: 600,
          mt: '10px',
          color: theme === 'dark-theme' ? 'white' : 'black',
        }}
      >
        {text1}
      </Typography>
      <Typography
        fontSize={{
          xs: '12px',
          sm: '14px',
        }}
        sx={{
          fontWeight: 400,
          color: theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
        }}
      >
        {text2}
      </Typography>
    </Box>
  );
};

const Section1 = () => {
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
        Domain Labs: Your All-in-One Platform for .ETH, .BNB, .SOL{' '}
      </Typography>
      <Box
        sx={{
          maxWidth: '960px',
          display: 'flex',
          borderRadius: '35px',
          background: 'rgba(255,255,255,0.01)',
          boxShadow:
            '0px 1px 40px 0px rgba(13, 137, 207, 0.15) inset, 0px 4px 18px 0px rgba(8, 59, 88, 0.30) inset, 0px 0px 15px -6px #0D89CF inset, 0px 4px 50px 20px rgba(13, 137, 207, 0.02) inset',
          backdropFilter: 'blur(12.5px)',
          marginX: 'auto',
          mt: '50px',
          backgroundImage: `url(${
            theme === 'dark-theme' ? section1_dark : section1_light
          })`,
          backgroundSize: 'cover',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              padding: '20px',
            }}
          >
            <ItemComponent
              bgColor={bgColor}
              theme={theme}
              img={discover_i}
              text1={'Discover'}
              text2={
                <span>
                  Find your perfect domain name<br></br> from all available
                  TLDs.
                </span>
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              padding: '20px',
            }}
          >
            <ItemComponent
              bgColor={bgColor}
              theme={theme}
              img={register_i}
              text1={'Register'}
              text2={
                <span>
                  Easily secure your unique domain<br></br> from any naming
                  service.
                </span>
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              padding: '20px',
            }}
          >
            <ItemComponent
              bgColor={bgColor}
              theme={theme}
              img={manage_i}
              text1={'Manage'}
              text2={
                <span>
                  Keep track of all your Web3<br></br> domains in one convenient
                  place.
                </span>
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: '-80px',
          top: 0,
          bottom: 0,
          width: '300px',
        }}
      >
        <img src={section1_side} width={'100%'} alt="" />
      </Box>
    </Box>
  );
};

export default Section1;
