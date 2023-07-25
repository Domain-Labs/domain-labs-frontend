import './index.scss';

import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { clioVid, clockLogo, lampLogo, lanLogo } from '../../utils/images';
import { useEffect, useState } from 'react';

import { BASE_API_URL } from '../../config';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import MetaTags from 'react-meta-tags';
// import SearchResultComponent from '../../components/SearchResultComponent';
import axios from 'axios';
import searchImage from '../../assets/image/search.png';
import { setSearchListClio } from '../../redux/actions/domainActions';
import { toast } from 'react-toastify';
import { useDapp } from '../../contexts/dapp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';

const Clio = () => {
  // const { cartStatus, setCartStatus, newCartStatus, setNewCartStatus } =
  //   useDappContext();
  const { address, isConnected } = useDapp();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [clioQuery, setClioQuery] = useState('');
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClioQuery = async () => {
    if (!isConnected) {
      toast.error('Connect your wallet to proceed!');
      return;
    }
    // get name candidates from clio
    setIsProcessing(true);

    // check if signed up ** will uncomment later
    // let isAlreadySignedUp = false;
    // try {
    //   const res = await axios.post(`${BASE_API_URL}/getIsSubscribe`, {
    //     address: address.toLowerCase(),
    //   });
    //   isAlreadySignedUp = res.data.subscribed;
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('is signed up: ', isAlreadySignedUp);
    // if (!isAlreadySignedUp) {
    //   // setTimeout(() => {
    //   toast.error('Please sign up at first!');
    //   navigate('/pricing');
    //   return;
    //   // }, 1000);
    // }

    if (clioQuery?.length === 0) {
      toast.error('Please type your clio query');
      return;
    }

    const postObject = {
      address: address.toLowerCase(),
      clioQuery,
    };

    try {
      const result = (await axios.post(`${BASE_API_URL}/clio`, postObject))
        .data;
      console.log('=========:  request clio', result);
      if (result.success) {
        const domains = Object.keys(result.data).map((key) =>
          result.data[key].toLowerCase(),
        );
        dispatch(setSearchListClio(domains));
        setTimeout(() => {
          navigate('/search-result');
        }, 1000);
        // setClioDomains(result.data);
      }
    } catch (error) {
      console.log(error);
      if (error.statusCode === 401) {
        toast.error('You should pay to use clio!');
        setTimeout(() => {
          navigate('/pricing');
          return;
        }, 1000);
      }
      toast.error('Error: For best results, Clio needs more information.');
    }

    // setCartStatus({ names: result?.domainNames, cart: [] });

    // const candidateDomainNames = result?.domainNames;

    // const newCartStatus = (candidateDomainNames ?? []).map((item) => {
    //   return {
    //     name: item,
    //     isRegistered: undefined,
    //     isInCart: false,
    //   };
    // });
    // console.log('///////////////////:   ', newCartStatus);
    // setNewCartStatus(newCartStatus);

    setIsProcessing(false);
  };

  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };

  const onKeyPressed = (e) => {
    if (e.code === 'Enter') {
      if (!isProcessing) {
        handleClioQuery();
      }
    }
  };

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
        '“Hey Clio, help me find domains for an E-commerce store that sells Bitcoin apparel.”',
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
    <Box>
      <MetaTags>
        <title>Clio - AI Powered Domain Search Assistant, Web3 Domains</title>
        <meta
          name="og:description"
          content="Personalized domain suggestion via Clio, an AI powered domain search assistant. Providing relevant and creative options tailored to your preferences."
        />
        <meta
          name="description"
          content="Personalized domain suggestion via Clio, an AI powered domain search assistant. Providing relevant and creative options tailored to your preferences."
        />
      </MetaTags>
      <Box style={styles.container} pb={'50px'}>
        <Box overflow="hidden" px={{ md: 10, xs: 5 }} pt={25}>
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12}>
              {/* search box of main page*/}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Paper
                  style={{
                    maxWidth: '960px',
                    display: 'flex',
                    backgroundColor: '#F7F7F7',
                    height: '52px',
                    marginTop: '42px',
                    width: '100%',
                    alignItems: 'center',
                    justify: 'center',
                    paddingLeft: '24px',
                    paddingRight: '10px',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  className="clio-query-wrapper"
                >
                  <TextField
                    value={clioQuery}
                    placeholder={'Hi, I’m Clio. How can I help?'}
                    onChange={(e) => {
                      setClioQuery(e.target.value);
                    }}
                    onKeyUp={onKeyPressed}
                    InputProps={{
                      border: 'none',
                      disableUnderline: true,
                      color: '#4BD8D8 !important',
                    }}
                    style={{
                      width: '100%',
                    }}
                    disabled={isProcessing}
                    variant="standard"
                  />

                  <Button
                    onClick={() => {
                      if (!isProcessing) handleClioQuery();
                    }}
                    style={{
                      minWidth: '40px',
                    }}
                  >
                    <Box
                      display={{ xs: 'flex', sm: 'none' }}
                      alignItems={'center'}
                    >
                      {isProcessing ? (
                        <CircularProgress size={16} />
                      ) : (
                        <img
                          style={{ width: '16px', height: '16px' }}
                          src={searchImage}
                          alt="searchImage"
                        />
                      )}
                    </Box>
                    <Box
                      display={{ xs: 'none', sm: 'flex' }}
                      alignItems={'center'}
                    >
                      {isProcessing ? (
                        <CircularProgress size={24} />
                      ) : (
                        <img
                          style={{ width: '24', height: '24px' }}
                          src={searchImage}
                          alt="searchImage"
                        />
                      )}
                    </Box>
                  </Button>
                </Paper>
              </Box>

              <Box
                display={'flex'}
                py="32px"
                px={1}
                mx={{ xs: 'unset', lg: 'calc((100vw - 994px) / 2 - 100px)' }}
                gap={'5px'}
              >
                <Typography
                  fontSize={{ xs: '14px', md: '18px' }}
                  fontFamily={'Inter'}
                  style={{
                    textAlign: 'left',
                    color: theme === 'dark-theme' ? 'white' : 'black',
                  }}
                  fontWeight={400}
                  align="center"
                >
                  {'Easily switch back to'}
                </Typography>

                <Typography
                  fontSize={{ xs: '14px', md: '18px' }}
                  fontFamily={'Inter'}
                  style={{
                    textAlign: 'left',
                    color: '#146EB4',
                    cursor: 'pointer',
                  }}
                  fontWeight={400}
                  align="center"
                  onClick={() => navigate('/')}
                >
                  {'regular search'}
                </Typography>
              </Box>

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
                    <Box
                      width={'341px'}
                      minHeight={'338px'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      gap={'12px'}
                      borderRadius={'40px'}
                      sx={{
                        background: '#0E4F81',
                      }}
                      key={index}
                    >
                      <Box
                        display="flex"
                        p={'74px 40px 25px'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                      >
                        <Box display={'flex'} justifyContent={'center'}>
                          <img
                            src={item.image}
                            width={'100px'}
                            height={'100px'}
                            alt="item"
                          />
                        </Box>

                        <Box
                          display={'flex'}
                          justifyContent={'center'}
                          mt={'37px'}
                        >
                          <Typography
                            justifyContent={'right'}
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: '900',
                              fontSize: '20px',
                              lineHeight: '24px',
                              letterSpacing: '-0.01em',
                              color: 'white',
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>

                        <Box
                          display={'flex'}
                          justifyContent={'center'}
                          mt={'21px'}
                        >
                          <Typography
                            display={'flex'}
                            justifyContent={'center'}
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '16px',
                              lineHeight: '19px',
                              letterSpacing: '-0.01em',
                              color: 'white',
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
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
                    Introducing Clio, your AI domain assistant powered by
                    OpenAI, one of the top AI companies in the world. At Domain
                    Labs, we believe in providing the best possible experience
                    for our customers, and that's why we use OpenAI to power
                    Clio. With Clio, you can save time and money on domain
                    searches, with accurate and personalized recommendations
                    based on your preferences. And with OpenAI powering Clio,
                    you can trust that you're getting the most advanced AI
                    technology available. Thank you for choosing Domain Labs and
                    Clio for your domain search needs.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {!isProcessing && (
          <Box
            px={{ xs: '30px', sm: '40px' }}
            sx={{
              backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
            }}
            // display={newCartStatus?.length > 0 ? 'block' : 'none'}
          >
            {/* <Box>
              <Typography
                fontSize={{ xs: '25px', md: '33px' }}
                my="25px"
                display={'flex'}
                justifyContent={'left'}
                style={{
                  borderRadius: '12px',
                  textAlign: 'center',
                  alignItems: 'center',
                  color: theme === 'dark-theme' ? 'white' : 'black',
                  lineHeight: '1',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
                fontWeight={400}
              >
                {'Results'}
              </Typography>
            </Box> */}

            {/* <SearchResultComponent domains={clioDomains} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Clio;
