import './index.scss';

import { Box, Link, Typography } from '@mui/material';
import { footer_side_1, footer_side_2, twitterImage } from 'utils/images';
import { resource1, resource2 } from 'utils/images';

import { colors } from 'config';
import footerSperator from 'assets/image/footer-seperator.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'contexts/theme';
import whiteLogoImage from 'assets/image/logo_white_mode.png';

const Footer = () => {
  const navigate = useNavigate();
  const { theme, bgColor } = useTheme();

  return (
    <Box
      sx={{
        background: bgColor,
        position: 'relative',
      }}
    >
      <img alt="footer seprator" src={footerSperator} width={'100%'} />
      <Box
        sx={{
          my: '100px',
        }}
        px={{ md: 10, xs: 5 }}
      >
        <Box
          sx={{
            maxWidth: '960px',
            mt: '50px',
            mx: 'auto',
          }}
        >
          <Box
            display={{
              xs: 'block',
              sm: 'flex',
            }}
            padding={{
              xs: '40px',
              sm: '80px',
            }}
            sx={{
              justifyContent: 'space-between',
              borderRadius: '35px',
              background: 'rgba(255,255,255,0.01)',
              boxShadow:
                '0px 1px 40px 0px rgba(13, 137, 207, 0.15) inset, 0px 4px 18px 0px rgba(8, 59, 88, 0.30) inset, 0px 0px 15px -6px #0D89CF inset, 0px 4px 50px 20px rgba(13, 137, 207, 0.02) inset',
              backdropFilter: 'blur(12.5px)',
            }}
          >
            <Box>
              <Typography
                fontSize={{ xs: '25px', md: '33px' }}
                sx={{
                  fontWeight: '700',
                  color: theme === 'dark-theme' ? 'white' : 'black',
                }}
              >
                {' '}
                Keep up the conversation{' '}
              </Typography>
              <Typography
                fontSize={{ xs: '14px', md: '16px' }}
                sx={{
                  fontWeight: '400',
                  color:
                    theme === 'dark-theme' ? colors.lightGray : colors.darkGray,
                }}
              >
                Stay in the loop, share your thoughts, and join the
                conversation. Follow us <br /> and be part of our vibrant
                community. Engage, discuss, and get the latest updates <br /> in
                real-time. We can't wait to hear from you!
              </Typography>
            </Box>
            <Box
              sx={{
                padding: '10px',
                borderRadius: '50%',
                width: '130px',
                height: '130px',
              }}
              className={
                theme === 'dark-theme'
                  ? 'footer_twitter_anim_dark'
                  : 'footer_twitter_anim'
              }
            >
              <Box
                sx={{
                  display: 'block',
                  borderRadius: '50%',
                }}
                textAlign={'center'}
                mt={{
                  // xs: '20px',
                  sm: '0',
                }}
              >
                {' '}
                <Link href="https://twitter.com/domain_labs" target="_blank">
                  <img
                    src={twitterImage}
                    width={'100%'}
                    height={'100%'}
                    alt="twitter"
                  />
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            display={{
              xs: 'block',
              sm: 'flex',
            }}
            justifyContent={{
              xs: 'center',
              sm: 'space-between',
            }}
            sx={{
              // maxWidth: '960px',
              mt: '80px',
              mx: 'auto',
            }}
          >
            <Box display={'flex'} alignItems={'center'}>
              <img
                src={whiteLogoImage}
                style={{
                  height: '41px',
                }}
                alt="logo"
              />
              <Typography
                color={theme === 'dark-theme' ? 'white' : 'black'}
                fontSize={'32px'}
                ml={'17px'}
                display={'flex'}
                fontFamily={'Inter'}
              >
                Domain Labs
              </Typography>
            </Box>
            <Box
              display={{
                xs: 'block',
                sm: 'flex',
              }}
              sx={{
                gap: 2,
                alignContent: 'center',
                alignItems: 'center',
              }}
              mt={{
                xs: '20px',
                sm: '0px',
              }}
            >
              <Link
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color:
                    theme === 'dark-theme' ? colors.whiteSmoke : colors.primary,
                }}
                target="_blank"
                href="https://domain-labs.gitbook.io/domain-labs-docs"
              >
                <Typography>Documentation</Typography>
              </Link>
              <Link
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color:
                    theme === 'dark-theme' ? colors.whiteSmoke : colors.primary,
                }}
                // target="blank"
                // href="https://domain-labs.gitbook.io/domain-labs-docs"
                href="mailto:contact@domainlabs.app"
              >
                <Typography>Contact</Typography>
              </Link>
              <Link
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color:
                    theme === 'dark-theme' ? colors.whiteSmoke : colors.primary,
                }}
                target="_blank"
                href="/faqs"
              >
                <Typography>FAQs</Typography>
              </Link>
              <Link
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color:
                    theme === 'dark-theme' ? colors.whiteSmoke : colors.primary,
                }}
                target="_blank"
                href="https://docs.ens.domains"
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  Resources
                  <img src={resource1} alt="resource1" width={'23px'} />
                  <img src={resource2} alt="resource2" width={'23px'} />
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          mb: '20px',
          background:
            theme === 'dark-theme' ? colors.darkGray : colors.lightGray,
        }}
      ></Box>
      <Typography
        fontSize={{
          xs: '14px',
          sm: '16px',
        }}
        sx={{
          color: theme === 'dark-theme' ? colors.darkGray : colors.lightGray,
          fontWeight: 600,
          textAlign: 'center',
          mb: '20px',
        }}
      >
        {' '}
        © {new Date().getFullYear()} DomainLabs. All rights reserved.
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: '-30px',
          width: '400px',
        }}
      >
        <img src={footer_side_1} width={'100%'} alt="" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: '-300px',
          width: '400px',
        }}
      >
        <img src={footer_side_2} width={'100%'} alt="" />
      </Box>{' '}
    </Box>
  );
};

export default Footer;
