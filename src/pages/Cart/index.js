import 'react-toastify/dist/ReactToastify.css';

import * as BNS from '../../utils/BNBDomain';
import * as ENS from '../../utils/ENSDomain';

import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  blackVectorImage,
  whiteBookmarkImage,
  whiteOffShoppingImage,
  whiteVectorImage,
} from '../../utils/images';
import { domainNames, domainSuffixes } from '../../config';
import { removeAll, removeCart } from '../../redux/actions/cartActions';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LoadingButton } from '@mui/lab';
import { domainLogoImages } from '../../config';
import randomBytes from 'randombytes';
import timer from '../../assets/image/timer.png';
import { useDapp } from '../../contexts/dapp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/theme';

const Cart = () => {
  const { address, provider, signer, networkId } = useDapp();
  const { cart } = useSelector((state) => state.cart);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Request Domains');
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(0);
  const [gasPrice] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const _removeCart = (_domainName, domain) => {
    dispatch(removeCart({ name: _domainName, domain: domain }));
  };

  const options = useMemo(
    () => [
      { label: '1 Year', value: 365 },
      { label: '3 Years', value: 1095 },
      { label: '5 Years', value: 1825 },
    ],
    [],
  );

  const backHome = () => {
    navigate('/home');
  };

  const requestDomain = async () => {
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    setLoading(true);
    setButtonText('Requesting...');
    try {
      const rlt = await domainFuncs.commits(results, provider, signer);
      console.log(rlt, 'result from commits');
      // if (rlt) {
      setButtonText('Waiting for 60s');
      setTimeout(() => {
        setStep(1);
        setButtonText('Buy Domains');
        setLoading(false);
      }, 60000);
      // } else {
      //   setButtonText('Request Domains');
      //   setLoading(false);
      // }
    } catch (error) {
      console.log(error, 'error message');
    }
  };

  const buyDomain = async () => {
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    setLoading(true);

    try {
      await domainFuncs.register(results, provider, signer);
      const domainSuffix = domainSuffixes[networkId];
      dispatch(removeAll({ domain: domainSuffix }));
    } catch (err) {
      console.log(err, 'error from buyDomain');
    }
    setStep(0);
    setLoading(false);
  };

  const timeSelect = async (idx, value) => {
    const nResults = [...results];
    nResults[idx].year = value;
    nResults[idx].duration = value * 24 * 3600;
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }
    const price = await domainFuncs.getRentPrice(
      nResults[idx].name,
      nResults[idx].year,
      provider,
    );
    nResults[idx].price = price;
    setResults(nResults);
  };

  useEffect(() => {
    const domainSuffix = domainSuffixes[networkId];
    const tmps = cart
      .filter((_item) => _item.domain === domainSuffix)
      .map((item) => {
        const exist = results.findIndex(
          (data) => data.name === item.name && data.domain === item.domain,
        );
        if (exist > -1) {
          return results[exist];
        }
        return {
          name: item.name,
          domain: item.domain,
          year: 0,
          duration: 0,
          price: price,
          secret: '0x' + randomBytes(32).toString('hex'),
        };
      });
    setResults(tmps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let _price = 0;
    results.map(async (item) => {
      _price += item.price;
    });
    setPrice(_price);
  }, [results]);

  useEffect(() => {
    // let domainFuncs;
    // if (networkId === 1 || networkId === 5) {
    //   domainFuncs = ENS;
    // } else {
    //   domainFuncs = BNS;
    // }
    // domainFuncs.getPriceInUSD();
  }, [networkId]);

  return (
    <Box
      pt={20}
      px={{ xs: '30px', sm: '40px' }}
      sx={{
        backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
    >
      <Box
        display={{ xs: 'block', md: 'flex' }}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box display={{ md: 'block', lg: 'flex' }} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            <img
              src={theme === 'dark-theme' ? whiteVectorImage : blackVectorImage}
              width={'15.5px'}
              height={'31px'}
              style={{ cursor: 'pointer' }}
              onClick={backHome}
              alt=""
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
              Search Result
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
        <Box mt={{ xs: '40px', md: '0px' }}>
          <Typography
            color={theme === 'dark-theme' ? 'white' : 'black'}
            sx={{
              letterSpacing: '-0.01em',
              fontWeight: '700',
              fontSize: '28px',
              lineHeight: '34px',
            }}
          >
            Total Cost
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            py={'8px'}
            mt={'7px'}
            sx={{
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '-0.01em',
              color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
              width: '325px',
              borderBottom: '0.5px solid #D3D3D3',
            }}
          >
            <Typography>Total {domainSuffixes[networkId]}</Typography>
            <Typography>{price}</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            py={'8px'}
            sx={{
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '-0.01em',
              color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
              width: '325px',
              borderBottom: '0.5px solid #D3D3D3',
            }}
          >
            <Typography>Total USD</Typography>
            <Typography>{price * 343}</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            py={'8px'}
            sx={{
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '-0.01em',
              color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
              width: '325px',
              borderBottom: '0.5px solid #D3D3D3',
            }}
          >
            <Typography>Gas Price</Typography>
            <Typography>{gasPrice}</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            py={'8px'}
            sx={{
              fontSize: '24px',
              lineHeight: '19px',
              letterSpacing: '-0.01em',
              color: theme === 'dark-theme' ? 'white' : '#7A7A7A',
              width: '325px',
            }}
          >
            <Typography fontSize={'24px'} fontWeight={'700'}>
              Grand total($)
            </Typography>
            <Typography fontSize={'24px'} fontWeight={'700'}>
              {price * 343}
            </Typography>
          </Box>
          <Box>
            <LoadingButton
              loading={loading}
              loadingPosition="end"
              sx={{
                background:
                  'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                borderRadius: '12px',
                marginTop: '12px',
                color: 'white',
                // float: 'right',
                px: '40px',
              }}
              onClick={() => {
                step === 0 ? requestDomain() : buyDomain();
              }}
            >
              {buttonText}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '40px',
        }}
      >
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
          This domains will be registered to
        </Typography>
        <Box
          sx={{
            background: 'white',
            boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
            borderRadius: '40px',
            height: '51px',
            marginTop: '22px',
            maxWidth: '670px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            fontSize={'20px'}
            lineHeight={'24px'}
            fontWeight={'600'}
            color={'black'}
            display={{ xs: 'none', md: 'flex' }}
          >
            {address}
          </Typography>

          <CopyToClipboard text={address} onCopy={() => window.alert('copied')}>
            <Typography
              fontSize={'20px'}
              lineHeight={'24px'}
              fontWeight={'600'}
              color={'black'}
              display={{ xs: 'flex', md: 'none' }}
            >
              {address.slice(0, 10) + '...' + address.slice(-10, -1)}
            </Typography>
          </CopyToClipboard>
        </Box>
        <Box
          my={'40px'}
          sx={{
            width: '100%',
            gridTemplateColumns: {
              lg: 'repeat(4, 1fr)',
              md: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)',
              xs: 'repeat(1, 1fr)',
            },
          }}
          gap={'20px'}
          display="grid"
        >
          {results.length > 0 &&
            cart.length > 0 &&
            cart.map((item, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    padding: '15px 10px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '16px',
                    position: 'relative',
                    width: 'calc(100%-60px)/3',
                    marginBottom: '8px',
                    background:
                      'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                  }}
                >
                  <Box
                    justifyContent="center"
                    display="inline-flex"
                    gap={'5px'}
                    alignItems={'center'}
                    textAlign={'left'}
                  >
                    <img
                      src={domainLogoImages[networkId]}
                      width={'21px'}
                      height={'24px'}
                      style={{
                        cursor: 'pointer',
                      }}
                      alt=""
                    />
                    <Typography
                      sx={{ opacity: '1' }}
                      fontSize={{
                        md: '1.8vw',
                        sm: '25px',
                      }}
                      fontWeight={'700'}
                      variant="h5"
                      color="white"
                    >
                      {item.name}.{item.domain}
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      sx={{ width: 1 }}
                      justifyContent="space-between"
                    >
                      <Typography
                        sx={{ ml: '30px' }}
                        fontSize={{
                          md: '1vw',
                          sm: '18px',
                        }}
                        color="white"
                      >
                        {`${domainNames[networkId]} extension`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      justifyContent: 'space-between',
                      display: 'flex',
                      marginTop: '8px',
                      marginLeft: '30px',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box>
                      <Select
                        value={
                          results[idx] && results[idx].year
                            ? results[idx].year
                            : ''
                        }
                        onChange={(event) =>
                          timeSelect(idx, event.target.value)
                        }
                        input={<OutlinedInput />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                          borderRadius: '20px',
                          width: '150px',
                          '& .MuiSelect-select, & .MuiSelect-select:focus ': {
                            borderRadius: '20px',
                            background: 'white',
                            padding: '5px 32px 5px 12px',
                          },
                        }}
                      >
                        <MenuItem value={0} disabled={true}>
                          <Box
                            alignItems="center"
                            display={'flex'}
                            justifyContent={'center'}
                          ></Box>
                        </MenuItem>
                        {options.map((option) => (
                          <MenuItem key={option.label} value={option.value}>
                            <Box
                              alignItems="center"
                              display={'flex'}
                              justifyContent={'center'}
                            >
                              <img src={timer} alt="timer" /> &nbsp;{' '}
                              {option.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '20px',
                      }}
                    >
                      <img
                        src={whiteBookmarkImage}
                        style={{ cursor: 'pointer' }}
                        alt=""
                      />
                      <img
                        src={whiteOffShoppingImage}
                        style={{ cursor: 'pointer' }}
                        alt=""
                        onClick={() => _removeCart(item.name, item.domain)}
                      />
                      {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshopping}/>*/}
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
