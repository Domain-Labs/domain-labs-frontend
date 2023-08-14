import './index.scss';

import { Box, Grid, Typography } from '@mui/material';
import { clioVid, clockLogo, lampLogo, lanLogo } from '../../utils/images';
import { useEffect, useState } from 'react';

import ClioSearchBox from './Components/ClioSearchBox';
import Container from 'components/Container';
import ProsBox from './Components/ProxBox';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';
import useTitle from 'hooks/useTitle';

const Clio = () => {
  // const { cartStatus, setCartStatus, newCartStatus, setNewCartStatus } =
  //   useDappContext();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [top, setTop] = useState(0);

  useEffect(() => {
    let timerId = setInterval(() => {
      var w = window.innerWidth * (-2.7 / 100);
      if (top < w * 3) {
        setTop(0);
      } else {
        setTop(top + w);
      }
    }, 2500);
    return () => {
      clearInterval(timerId);
    };
  }, [top]);

  useTitle('Clio - AI Powered Domain Search Assistant, Web3 Domains');
  const pros = [
    {
      image: lanLogo,
      title: 'Algorithmic Accuracy',
      description:
        'Advanced AI technology for accurate suggestions based on user needs and preferences.',
    },
    {
      image: lampLogo,
      title: 'Instant Recommendations',
      description:
        'Hey Clio, help me find domains for an E-commerce store that sells Bitcoin apparel.',
    },
    {
      image: clockLogo,
      title: 'Time-Saving Solution',
      description: 'Personalized domain suggestions that save you time.',
    },
  ];

  const linearGradient =
    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)';

  return (
    <Container>
      <Box overflow="hidden" px={{ md: 10, xs: 5 }} py={15}>
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12}>
            {/* search box of main page*/}
            <ClioSearchBox />
            <Box
              style={{
                display: 'center',
                paddingLeft: '0px',
                borderRadius: '12px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box display={'block'}>
                {/* title of main page*/}
                <Box
                  style={{
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
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'dark-theme' ? 'white' : '#666666',
                      lineHeight: '1',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                    fontWeight={400}
                    align="center"
                    // onClick={() => navigate('/clio')}
                  >
                    {'Meet '}
                  </Typography>
                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    mx={{ xs: '2px', sm: '10px' }}
                    style={{
                      color: '#513eff',
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      background:
                        'linear-gradient(90deg,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {/* -webkit-background-clip */}
                    {'  Clio:'}
                  </Typography>
                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    py="5px"
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'dark-theme' ? 'white' : '#666666',
                      lineHeight: '1',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                    }}
                    fontWeight={400}
                    align="center"
                    display={{ xs: 'none', sm: 'block' }}
                  >
                    {'Your Domain Search Assistant'}
                  </Typography>

                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    py="5px"
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'dark-theme' ? 'white' : '#666666',
                      lineHeight: '1',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                    }}
                    fontWeight={400}
                    align="center"
                    display={{ xs: 'unset', sm: 'none' }}
                  >
                    {'Your Domain '}
                  </Typography>
                </Box>

                <Box
                  display={{ xs: 'block', sm: 'none' }}
                  fontSize={{ xs: '25px', md: '33px' }}
                  py="5px"
                  style={{
                    borderRadius: '12px',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme === 'dark-theme' ? 'white' : '#666666',
                    lineHeight: '1',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                  }}
                  fontWeight={400}
                >
                  {'Search Assistant'}
                </Box>
              </Box>
            </Box>

            {/** pros content */}
            <Box
              display="flex"
              justifyContent={'center'}
              alignItems={'center'}
              p={'57px 20px'}
              className="pros-component"
            >
              <Box
                display="flex"
                justifyContent={'start'}
                alignItems={'center'}
                gap={'60px'}
                flexDirection={{ xs: 'column', lg: 'row' }}
              >
                {pros.map((item, index) => (
                  <ProsBox item={item} key={index} />
                ))}
              </Box>
            </Box>
            {/** Video description */}
            <Box
              display="flex"
              justifyContent={'center'}
              alignItems={'center'}
              p={'0 20px'}
            >
              <Box
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  background: linearGradient,
                  // borderRadius: '40px',
                  padding: '1px',
                  width: '1162px',
                }}
              >
                <video
                  src={clioVid}
                  width={'100%'}
                  autoPlay={false}
                  controls={true}
                />
              </Box>
            </Box>
            {/** OpenAI description */}
            <Box
              display="flex"
              justifyContent={'center'}
              alignItems={'center'}
              p={'0 20px'}
              marginTop={'40px'}
            >
              <Box
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  background: linearGradient,
                  borderRadius: '40px',
                  padding: '40px',
                  width: '1083px',
                }}
              >
                <Typography
                  component={'p'}
                  sx={{
                    fontSize: '18px',
                    color: 'white',
                    lineHeight: '22px',
                    fontFamily: 'Inter',
                  }}
                >
                  Introducing Clio, your AI domain assistant powered by OpenAI,
                  one of the top AI companies in the world. At Domain Labs, we
                  believe in providing the best possible experience for our
                  customers, and that's why we use OpenAI to power Clio. With
                  Clio, you can save time and money on domain searches, with
                  accurate and personalized recommendations based on your
                  preferences. And with OpenAI powering Clio, you can trust that
                  you're getting the most advanced AI technology available.
                  Thank you for choosing Domain Labs and Clio for your domain
                  search needs.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Clio;
