import * as BNS from '../../utils/BNBDomain';
import * as ENS from '../../utils/ENSDomain';

import { Box, Typography } from '@mui/material';
import { addCart, removeCart } from '../../redux/actions/cartActions';
import {
  blackBookmarkImage,
  blackVectorImage,
  removeShoppingCartBlack,
  shoppingCart,
  shoppingCartFull,
  timeLeftClock,
  whiteBookmarkImage,
  whiteVectorImage,
} from '../../utils/images';
import { domainLogoImages, domainNames, domainSuffixes } from '../../config';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDapp } from '../../contexts/dapp';
import { useNavigate } from 'react-router';
import { useTheme } from '../../contexts/theme';

const SearchResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { domain, cart } = useSelector((state) => state);
  const { provider, signer, address, networkId } = useDapp();
  const { theme } = useTheme();
  const [results, setResults] = useState([]);

  const _addOrRemoveCart = (_domainName) => {
    const domainSuffix = domainSuffixes[networkId];
    const exist = cart.cart.findIndex((item) => item.name === _domainName);
    const idx = results.findIndex((item) => item.name === _domainName);
    if (exist < 0) {
      setResults((prev) => {
        const nRlt = [...prev];
        nRlt[idx] = {
          ...nRlt[idx],
          cart: true,
        };
        return nRlt;
      });
      dispatch(addCart({ name: _domainName, domain: domainSuffix }));
    } else {
      setResults((prev) => {
        const nRlt = [...prev];
        nRlt[idx] = {
          ...nRlt[idx],
          cart: false,
        };
        return nRlt;
      });
      dispatch(removeCart({ name: _domainName, domain: domainSuffix }));
    }
  };

  const backHome = () => {
    navigate('/home');
  };

  const _checkAvailability = useCallback(async () => {
    let domainFuncs;
    if (networkId === 1 || networkId === 5) {
      domainFuncs = ENS;
    } else {
      domainFuncs = BNS;
    }

    if (domain.isSingleSearch) {
      const availability = await domainFuncs.checkAvailability(
        domain.searchString,
        provider,
      );
      const exist = cart.cart.findIndex(
        (item) => item.name === availability.name,
      );
      setResults([{ ...availability, cart: exist > -1 }]);
    } else {
      domain.searchList.map((searchString) => {
        if (searchString === '' || !searchString) return false;
        domainFuncs.checkAvailability(searchString, provider).then((rlt) => {
          const exist = cart.cart.findIndex((item) => item.name === rlt.name);
          const exist1 = results.findIndex((item) => item.name === rlt.name);
          if (exist1 === -1) {
            setResults((prev) => {
              const nRlts = [...prev];
              nRlts.push({ ...rlt, cart: exist > -1 });
              return nRlts;
            });
          }
        });
        return true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, provider, cart.cart]);

  useEffect(() => {
    if (provider && signer) {
      console.log('check availability');
      _checkAvailability();
    }
  }, [_checkAvailability, provider, signer, address, networkId]);

  return (
    <Box
      pt={20}
      px={{ xs: '30px', sm: '40px' }}
      sx={{
        backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
    >
      <Box display={{ xs: 'block', sm: 'flex' }} alignItems={'center'}>
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
      <Box mt={'60px'} sx={{ flexDirection: 'row' }}>
        <Box
          sx={{
            p: 1,
            width: '100%',
            gridTemplateColumns: {
              md: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)',
              xs: 'repeat(1, 1fr)',
            },
          }}
          gap={'20px'}
          display="grid"
        >
          {}
          {results.length > 0 &&
            results.map((result, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    padding: '20px 15px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '16px',
                    marginBottom: '8px',
                    background: `${
                      !result.available
                        ? '#D2EBFF'
                        : 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)'
                    }`,
                  }}
                >
                  {!result.available && (
                    <Box
                      display={'flex'}
                      justifyContent={'flex-end'}
                      alignItems="center"
                    >
                      <Typography
                        fontSize={{
                          md: '1vw',
                          sm: '16px',
                        }}
                        color={'#FFA552'}
                        fontWeight={'700'}
                        marginRight="5px"
                      >
                        {result.leftDays} days left
                      </Typography>
                      <img src={timeLeftClock} alt="timeLeftClock" />
                    </Box>
                  )}
                  <Box
                    justifyContent="center"
                    display="inline-flex"
                    gap={'5px'}
                    alignItems={'center'}
                    textAlign={'left'}
                  >
                    <Box>
                      <img
                        src={domainLogoImages[networkId]}
                        width={'30px'}
                        height={'30px'}
                        style={{
                          marginLeft: '5px',
                          cursor: 'pointer',
                        }}
                        alt=""
                      />
                    </Box>
                    <Box
                      sx={{ opacity: '1' }}
                      fontSize={{
                        md: '1.8vw',
                        sm: '25px',
                      }}
                      fontWeight={'700'}
                      color={result.available ? 'white' : '#868686'}
                    >
                      {results[idx].name}.{domainSuffixes[networkId]}
                      <Box
                        sx={{ opacity: '1' }}
                        fontSize={{
                          md: '1vw',
                          sm: '16px',
                        }}
                        fontWeight={'400'}
                      >
                        {domainNames[networkId]} Extension
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    sx={{ width: 1 }}
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ ml: '40px' }}
                      fontSize={{
                        md: '1.3vw',
                        sm: '18px',
                      }}
                      color={!result.available ? '#C84141' : 'white'}
                    >
                      {`Domain ${
                        result.available ? 'is available' : 'not available'
                      }.`}
                    </Typography>
                  </Box>
                  {!result.available && (
                    <Box
                      color={result.available ? 'white' : '#868686'}
                      sx={{ paddingLeft: '5px' }}
                    >
                      <Box
                        sx={{ opacity: '1', marginY: '10px' }}
                        fontSize={{
                          md: '1vw',
                          sm: '16px',
                        }}
                        fontWeight={'600'}
                      >
                        Details
                      </Box>
                      <Box
                        sx={{ opacity: '1' }}
                        fontSize={{
                          md: '1vw',
                          sm: '16px',
                        }}
                        fontWeight={'400'}
                      >
                        {`Owner: ${result.address}`}
                      </Box>
                      <Box
                        sx={{ opacity: '1' }}
                        fontSize={{
                          md: '1vw',
                          sm: '16px',
                        }}
                        fontWeight={'400'}
                      >
                        {`Time: ${result.expireDate}`}
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      float: 'right',
                      gap: '20px',
                      marginTop: '15px',
                      bottom: '10px',
                      right: '20px',
                    }}
                  >
                    <img
                      src={
                        result.available
                          ? whiteBookmarkImage
                          : blackBookmarkImage
                      }
                      alt="bookmark"
                      width={'20px'}
                      height={'25px'}
                    />
                    {result.available ? (
                      <img
                        src={result.cart ? shoppingCartFull : shoppingCart}
                        alt="bookmark"
                        width={'25px'}
                        height={'25px'}
                        onClick={() => _addOrRemoveCart(result.name)}
                      />
                    ) : (
                      <img
                        src={removeShoppingCartBlack}
                        alt="bookmark"
                        width={'25px'}
                        height={'25px'}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResult;
