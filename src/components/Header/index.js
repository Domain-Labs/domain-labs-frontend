import 'react-toggle/style.css';
import './index.scss';

import * as React from 'react';

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import PropTypes from 'prop-types';
import { RxCross1 } from 'react-icons/rx';
import Toggle from 'react-toggle';
import { chainIds } from '../../config';
import darkCartImage from '../../assets/image/shopping_cart_dark_mode.png';
import darkLogoImage from '../../assets/image/logo_dark_mode.png';
import darkSunImage from '../../assets/image/dark_mode.png';
import { linkArray } from '../../config';
import { toast } from 'react-toastify';
import { useDapp } from '../../contexts/dapp';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/theme';
import useWindowDimensions from '../../hooks/useDimension';
import whiteCartImage from '../../assets/image/shopping_cart_white_mode.png';
import whiteLogoImage from '../../assets/image/logo_white_mode.png';
import yellowSunImage from '../../assets/image/light_mode.png';

const ElevationScroll = (props) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor:
        theme === 'dark-theme'
          ? trigger
            ? '#2A2A2A'
            : '#2A2A2A'
          : trigger
          ? 'white'
          : 'white',
      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
      transition: trigger ? '0.3s' : '0.5s',
      boxShadow: 'none',
      padding: width > 500 ? '15px 20px' : '0',
    },
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = (props) => {
  const { theme, setTheme } = useTheme();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { isConnected, networkId } = useDapp();
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { address } = useAccount();
  const toBuyPage = () => {
    navigate('/cart');
  };

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    theme === 'dark-theme' ? setTheme('day-theme') : setTheme('dark-theme');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const chainId = chain?.id;
    console.log('chain id: ', chainId);
    console.log('okay');
    const pathname = location.pathname;

    if (
      !chainIds[process.env.REACT_APP_NET_TYPE].includes(chainId) &&
      pathname !== '/'
    ) {
      toast.error('Please switch your chain');
      setTimeout(() => {
        navigate('/');
      });
      return;
    }

    if (
      address === process.env.REACT_APP_ADMIN_WALLET_1 ||
      address === process.env.REACT_APP_ADMIN_WALLET_2 ||
      address === process.env.REACT_APP_DEV_WALLET_1 ||
      address === process.env.REACT_APP_DEV_WALLET_2
    ) {
      console.log('you can access');
      console.log('address: ', address);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_1);
    } else if (pathname !== '/') {
      console.log('address: ', address);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_1);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_2);

      toast.warn("You can't access to this page");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [location, address, chain?.id, navigate]);

  const ThemeSwitchComponent = () => (
    <Box className="theme-switch-component" display={'flex'}>
      <Box
        sx={{
          padding: '4px 5px',
        }}
        alignItems="center"
        display={'flex'}
      >
        <img
          src={theme === 'dark-theme' ? darkSunImage : yellowSunImage}
          width={'22px'}
          height={'22px'}
          alt=""
        />
      </Box>
      <Box
        sx={{
          padding: '4px 10px',
          transform: 'rotate(180deg)',
        }}
        alignItems="center"
        display={'flex'}
        className="toggle-wrapper"
      >
        <Toggle
          defaultChecked={isSwitchOn}
          icons={false}
          onChange={() => switchTheme()}
          sx={{
            color: '#D9D9D9',
          }}
        />
      </Box>
    </Box>
  );

  const LogoComponent = () => (
    <Box display={'flex'} alignItems={'center'}>
      <img
        src={theme === 'dark-theme' ? darkLogoImage : whiteLogoImage}
        style={{
          height: '41px',
        }}
        alt=""
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
  );

  const drawer = (
    <Box sx={{ textAlign: 'center' }} m={'30px'}>
      <Box display={'flex'} justifyContent={'center'} position={'relative'}>
        <LogoComponent />
        <Box position={'absolute'} right={0} top={'15px'}>
          <RxCross1
            color={theme === 'dark-theme' ? 'white' : 'black'}
            onClick={handleDrawerToggle}
          />
        </Box>
      </Box>

      <Box mt={'60px'}>
        {linkArray.map((item, index) => (
          <Box key={index}>
            <Typography
              fontFamily={'Inter'}
              fontStyle={'normal'}
              fontWeight={'700'}
              fontSize={'24px'}
              lineHeight={'29px'}
              letterSpacing={'0.01em'}
              color={theme === 'dark-theme' ? 'white' : 'black'}
              mx={'30px'}
              my={'20px'}
              onClick={() => {
                navigate(`${item.link}`);
                setMobileOpen(!mobileOpen);
              }}
              justifyContent={'left'}
              display={'flex'}
              style={{
                textDecoration:
                  item.link === location.pathname ? 'underline' : 'none',
                textDecorationColor:
                  item.link === location.pathname
                    ? 'linear-gradient(71.39deg, #4BD8D8 -24.78%, #146EB4 112.23%)'
                    : 'unset',
                textUnderlineOffset: '10px',
                background:
                  item.link === location.pathname
                    ? 'linear-gradient(71.39deg, #4BD8D8 -24.78%, #146EB4 112.23%)'
                    : 'unset',
                WebkitBackgroundClip:
                  item.link === location.pathname ? 'text' : 'unset',
                WebkitTextFillColor:
                  item.link === location.pathname ? 'transparent' : 'unset',
                backgroundClip:
                  item.link === location.pathname ? 'text' : 'unset',
                cursor: 'pointer',
              }}
            >
              {item.name}
            </Typography>
            <Divider
              sx={{
                borderColor: 'white',
              }}
            />
          </Box>
        ))}
      </Box>

      <Box>
        <Box display={'flex'} alignItems={'center'} mx={'30px'} my={'20px'}>
          <ThemeSwitchComponent />
          <Typography
            fontFamily={'Inter'}
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={'24px'}
            lineHeight={'29px'}
            letterSpacing={'0.01em'}
            color={theme === 'dark-theme' ? 'white' : 'black'}
          >
            Theme
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: 'white',
          }}
        />

        <Box display={'flex'} mx={'30px'} my={'20px'} gap={'20px'}>
          <Box
            sx={{
              cursor: location.pathname === '/' ? 'not-allowed' : 'pointer',
            }}
            onClick={location.pathname === '/' ? () => {} : () => toBuyPage()}
          >
            {isConnected && cart && cart.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  alignItems: 'center',
                  position: 'relative',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                }}
              >
                <img
                  src={darkCartImage}
                  width={'22.64px'}
                  height={'22.64px'}
                  alt=""
                />

                <span
                  style={{
                    position: 'absolute',
                    backgroundColor: '#F46B6B',
                    width: '13px',
                    height: '13px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10.3705px',
                    lineHeight: '13px',
                    color: 'white',
                    borderRadius: '50%',
                    top: '0',
                    right: '0',
                  }}
                >
                  {cart.length}
                </span>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}
              >
                <img
                  src={theme === 'dark-theme' ? darkCartImage : whiteCartImage}
                  width={'22.64px'}
                  height={'22.64px'}
                  alt=""
                />
              </Box>
            )}
          </Box>

          <Typography
            fontFamily={'Inter'}
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={'24px'}
            lineHeight={'29px'}
            letterSpacing={'0.01em'}
            color={theme === 'dark-theme' ? 'white' : 'black'}
          >
            Shopping Cart
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: 'white',
          }}
        />

        <Box className="connect-button-wrapper-mobile">
          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
            chainStatus={{
              smallScreen: 'full',
              largeScreen: 'full',
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <ElevationScroll {...props} px={'10px !important'} class>
        <AppBar
          height={{ xs: '100px', sm: '60px' }}
          style={{
            padding: '0 20px !important',
          }}
        >
          <Toolbar
            p={'0px !important'}
            height={{ xs: '100px', sm: '60px' }}
            className="toolbar-container"
            sx={{
              position: 'relative',
              justifyContent: 'space-between',
            }}
          >
            <Box
              style={{
                backgroundRepeat: 'no-repeat',
                zIndex: '9999',
                cursor: 'pointer',
              }}
              sx={{ display: 'flex' }}
              mr={'17px'}
              alignItems={'center'}
              onClick={() => navigate('/')}
            >
              <LogoComponent />
            </Box>

            <Box
              display={{ xs: 'flex', lg: 'none' }}
              position={'absolute'}
              right={0}
              className="outline-menu-wrapper"
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                }}
                onClick={handleDrawerToggle}
              >
                <AiOutlineMenu />
              </IconButton>
            </Box>

            <Box component="nav">
              <Drawer
                container={container}
                anchor={'right'}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', lg: 'none' },
                }}
              >
                {drawer}
              </Drawer>
            </Box>

            <Box
              sx={{
                right: { md: '10px', xs: '10px' },
              }}
              style={{
                zIndex: '10000',
              }}
              display={{
                xs: 'none',
                lg: 'flex',
              }}
            >
              <Box
                mr={'10.93px'}
                display={{ xs: 'block', sm: 'flex' }}
                sx={{
                  alignItems: 'center',
                  position: 'relative',
                  justifyContent: 'center',
                }}
                gap={'20px'}
              >
                <Box
                  flexDirection={'row'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  {linkArray.map((item, index) => (
                    <Typography
                      color={theme === 'dark-theme' ? 'white' : 'black'}
                      fontSize={'18.4px'}
                      fontWeight={'700'}
                      fontStyle={'normal'}
                      ml={'17px'}
                      display={'flex'}
                      fontFamily={'Inter'}
                      key={index}
                      onClick={() => navigate(`${item.link}`)}
                      style={{
                        textDecoration:
                          item.link === location.pathname
                            ? 'underline'
                            : 'none',
                        textDecorationColor:
                          item.link === location.pathname
                            ? 'linear-gradient(71.39deg, #4BD8D8 -24.78%, #146EB4 112.23%)'
                            : 'unset',
                        textUnderlineOffset: '10px',
                        background:
                          item.link === location.pathname
                            ? 'linear-gradient(71.39deg, #4BD8D8 -24.78%, #146EB4 112.23%)'
                            : 'unset',
                        WebkitBackgroundClip:
                          item.link === location.pathname ? 'text' : 'unset',
                        WebkitTextFillColor:
                          item.link === location.pathname
                            ? 'transparent'
                            : 'unset',
                        backgroundClip:
                          item.link === location.pathname ? 'text' : 'unset',
                        cursor: 'pointer',
                      }}
                    >
                      {item.name}
                    </Typography>
                  ))}
                </Box>
                <Box
                  flexDirection={'row'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <ThemeSwitchComponent />
                  <Box
                    sx={{
                      padding: '2px 0px 3px 15px',
                      cursor:
                        location.pathname === '/' ? 'not-allowed' : 'pointer',
                    }}
                    onClick={
                      location.pathname === '/' ? () => {} : () => toBuyPage()
                    }
                    display={'flex'}
                  >
                    {cart && cart.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          position: 'relative',
                          borderRadius: '50%',
                          background:
                            'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                        }}
                      >
                        <img
                          src={darkCartImage}
                          width={'22.64px'}
                          height={'22.64px'}
                          alt=""
                        />

                        <span
                          style={{
                            position: 'absolute',
                            backgroundColor: '#F46B6B',
                            width: '13px',
                            height: '13px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '10.3705px',
                            lineHeight: '13px',
                            color: 'white',
                            borderRadius: '50%',
                            top: '0',
                            right: '0',
                          }}
                        >
                          {cart.length}
                        </span>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          borderRadius: '50%',
                        }}
                      >
                        <img
                          src={
                            theme === 'dark-theme'
                              ? darkCartImage
                              : whiteCartImage
                          }
                          width={'22.64px'}
                          height={'22.64px'}
                          alt=""
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box className="connect-button-wrapper">
                  <ConnectButton
                    showBalance={false}
                    accountStatus={{
                      smallScreen: 'full',
                      largeScreen: 'full',
                    }}
                    chainStatus={{
                      smallScreen: 'full',
                      largeScreen: 'full',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};
export default Header;
