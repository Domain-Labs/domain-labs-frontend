import { Box, Button, Link, Typography } from '@mui/material';

import { colors } from 'config';
import section3_elipse from 'assets/image/home-page/section3_elipse.png';
import section3_partner1 from 'assets/image/home-page/section3_partner1.png';
import section3_partner1_dark from 'assets/image/home-page/section3_partner1_dark.png';
import section3_partner2 from 'assets/image/home-page/section3_partner2.png';
import section3_partner2_dark from 'assets/image/home-page/section3_partner2_dark.png';
import section3_side from 'assets/image/home-page/section3_side.png';
import section3_union from 'assets/image/home-page/section3_union.png';
import { useTheme } from 'contexts/theme';

const Section3 = () => {
  const { theme, bgColor } = useTheme();
  return (
    <Box
      sx={{
        marginTop: '200px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxWidth: '840px',
          mt: '50px',
          mx: 'auto',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'translate(-50%, 50%)',
          }}
        >
          <img src={section3_elipse} width={'100%'} alt="union" />
        </Box>
        <Box
          display={{
            xs: 'block',
            sm: 'flex',
          }}
          sx={{
            justifyContent: 'space-around',
            borderRadius: '35px',
            // background: 'rgba(255,255,255, 1)',
            boxShadow:
              '0px 1px 40px 0px rgba(13, 137, 207, 0.15) inset, 0px 4px 18px 0px rgba(8, 59, 88, 0.30) inset, 0px 0px 15px -6px #0D89CF inset, 0px 4px 50px 20px rgba(13, 137, 207, 0.02) inset',
            backdropFilter: 'blur(12.5px)',
            position: 'relative',
            padding: '60px',
            background: `url(${section3_side})`,
            backgroundSize: 'cover',
          }}
        >
          <Box>
            {/* <Box
              sx={{
                background: bgColor,
                padding: '20px',
                borderRadius: '20px',
              }}
            >
              <img
                src={
                  theme === 'dark-theme'
                    ? section3_partner1_dark
                    : section3_partner1
                }
                width={'100%'}
                alt="unstoppable"
              />
            </Box> */}
            <Box
              sx={{
                background: bgColor,
                padding: '20px',
                // mt: '20px',
                borderRadius: '20px',
              }}
            >
              <Link href="https://bonfida.org/" target="_blank">
                <img
                  src={
                    theme === 'dark-theme'
                      ? section3_partner2_dark
                      : section3_partner2
                  }
                  width={'100%'}
                  alt="bonfida"
                />
              </Link>
            </Box>
          </Box>
          <Box
            mt={{
              xs: '20px',
              sm: 0,
            }}
          >
            <Typography
              fontSize={{ xs: '25px', md: '33px' }}
              sx={{
                fontWeight: '700',
                color: theme === 'dark-theme' ? 'white' : 'black',
              }}
            >
              Partners
            </Typography>
            <Typography
              fontSize={{ xs: '14px', md: '16px' }}
              sx={{
                fontWeight: '400',
                color:
                  theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
              }}
            >
              Empowering innovation and success through
              <br /> strong partnerships, hand in hand towards a<br /> brighter
              tomorrow
            </Typography>
            <Button
              sx={{
                background: colors.primary,
                mt: '40px',
                borderRadius: '10px',
                textTransform: 'none',
              }}
              variant="contained"
            >
              <a
                href="mailto:contact@domainlabs.app"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Become a Partner
              </a>
            </Button>
          </Box>
          <Box
            sx={{
              width: '100px',
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(50%, -50%)',
            }}
          >
            <img
              src={section3_union}
              className="home_rotate"
              width={'100%'}
              alt="union"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Section3;
