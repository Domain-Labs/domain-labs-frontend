import 'react-toggle/style.css';
import './index.scss';

import * as React from 'react';

import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useAccount, useNetwork } from 'wagmi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { RxCross1 } from 'react-icons/rx';
import SwitchBox from 'components/SwitchBox';
import WalletConnectButton from 'components/WalletConnectButton';
import WalletSelectModal from 'components/Modal/WalletSelectModal';
import { colors } from 'config';
import { domainSuffixes } from 'config';
import { linkArray } from 'config';
import { toast } from 'react-toastify';
import { useDapp } from 'contexts/dapp';
import { useSelector } from 'react-redux';
import { useTheme } from 'contexts/theme';
import { useWallet } from '@solana/wallet-adapter-react';
import useWindowDimensions from 'hooks/useDimension';
import { whiteCart } from 'utils/images';
import whiteLogoImage from 'assets/image/logo_white_mode.png';

const ElevationScroll = (props) => {
  const { theme, color, bgColor } = useTheme();
  const { width } = useWindowDimensions();
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: bgColor,
      color: color,
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
  const { theme, setTheme, bgColor, color } = useTheme();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [walletModalOpen, setWalletModalOpen] = React.useState(false);
  const [availableCart, setAvailableCart] = useState([]);
  const headerRef = useRef();
  const menuRef = useRef();
  const { cart } = useSelector((state) => state.cart);
  const { publicKey } = useWallet();
  // const { isConnected, networkId } = useDapp();
  const networkId = 101;
  const container =
    props.window !== undefined ? () => props.window().document.body : undefined;
  const { address } = useAccount();
  const toBuyPage = () => {
    if (publicKey) {
      navigate('/cart');
    }
  };

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    theme === 'dark-theme' ? setTheme('light-theme') : setTheme('dark-theme');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScroll = useCallback(
    (event) => {
      if (window.scrollY > 100) {
        headerRef.current.style.background = bgColor;
        // menuRef.current.style.color = color;
      } else {
        // menuRef.current.style.color = 'black';
        headerRef.current.style.background = '#00000000';
      }
    },
    [bgColor],
  );

  useEffect(() => {
    const chainId = chain?.id;
    const pathname = location.pathname;

    // if (
    //   !chainIds[process.env.REACT_APP_NET_TYPE].includes(chainId) &&
    //   pathname !== '/home' &&
    //   pathname !== '/team'
    // ) {
    //   toast.error('Please switch your chain');
    //   setTimeout(() => {
    //     navigate('/home');
    //   });
    //   return;
    // }

    if (
      address === process.env.REACT_APP_ADMIN_WALLET_1 ||
      address === process.env.REACT_APP_ADMIN_WALLET_2 ||
      address === process.env.REACT_APP_DEV_WALLET_1 ||
      address === process.env.REACT_APP_DEV_WALLET_2
    ) {
      console.log('you can access');
      console.log('address: ', address);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_1);
    } else if (pathname === '/admin') {
      console.log('address: ', address);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_1);
      console.log('dev wallet: ', process.env.REACT_APP_DEV_WALLET_2);

      toast.warn("You can't access to this page");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [location, address, chain?.id, navigate]);

  useEffect(() => {
    const domainSuffix = domainSuffixes[networkId];
    const _availableCart = cart.filter(
      (_item) => _item.domain === domainSuffix,
    );
    setAvailableCart(_availableCart);
  }, [cart, networkId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (window.scrollY > 100) {
      headerRef.current.style.background = bgColor;
      // menuRef.current.style.color = color;
    } else {
      headerRef.current.style.background = '#00000000';
      // menuRef.current.style.color = 'black';
    }
  }, [bgColor, color]);

  const ThemeSwitchComponent = () => (
    <Box className="theme-switch-component" display={'flex'}>
      <Box
        sx={{
          padding: '4px 10px',
          transform: 'rotate(180deg)',
        }}
        alignItems="center"
        display={'flex'}
        className="toggle-wrapper"
      >
        {/* <Toggle
          defaultChecked={isSwitchOn}
          icons={false}
          onChange={() => switchTheme()}
          sx={{
            color: '#D9D9D9',
          }}
        /> */}
        <SwitchBox defaultChecked={isSwitchOn} onChange={() => switchTheme()} />
      </Box>
    </Box>
  );

  const LogoComponent = () => (
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
  );

  const drawer = (
    <Box sx={{ textAlign: 'center' }} m={'30px'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        position={'relative'}
        onClick={() => {
          navigate('/');
          setMobileOpen(!mobileOpen);
        }}
      >
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
        <Box display={'flex'} alignItems={'center'} mx={'15px'} my={'20px'}>
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
            {publicKey && availableCart && availableCart.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  alignItems: 'center',
                  position: 'relative',
                  borderRadius: '50%',
                  background: '#146EB4',
                }}
              >
                <img
                  src={whiteCart}
                  width={'22.64px'}
                  height={'22.64px'}
                  alt="cart"
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
                  {availableCart.length}
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
                  background: '#146EB4',
                }}
              >
                <img
                  src={whiteCart}
                  width={'22.64px'}
                  height={'22.64px'}
                  alt="cart"
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
          <WalletMultiButton
            // className="solana-button"
            style={{
              marginTop: '10px',
              borderRadius: '12px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <ElevationScroll {...props} px={'10px !important'}>
        <AppBar
          height={{ xs: '100px', sm: '60px' }}
          ref={headerRef}
          sx={{
            padding: '0 20px !important',
            background: '#00000000',
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
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
                width: '100%',
                position: 'relative',
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
                mr={'10.93px'}
                display={{
                  xs: 'none',
                  lg: 'flex',
                }}
                sx={{
                  alignItems: 'center',
                  position: 'absolute',
                  justifyContent: 'center',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                gap={'20px'}
              >
                <Box
                  flexDirection={'row'}
                  display={'flex'}
                  justifyContent={'center'}
                  color={color}
                  ref={menuRef}
                >
                  {linkArray.map((item, index) => (
                    <Typography
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
              </Box>
              <Box
                display={{
                  xs: 'none',
                  lg: 'flex',
                }}
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
                  <ThemeSwitchComponent />
                  <Box
                    sx={{
                      padding: '2px 0px 3px 15px',
                      alignItems: 'center',
                      cursor:
                        publicKey && availableCart && availableCart.length > 0
                          ? 'pointer'
                          : 'not-allowed',
                    }}
                    onClick={
                      publicKey && availableCart && availableCart.length > 0
                        ? () => toBuyPage()
                        : () => {}
                    }
                    display={'flex'}
                  >
                    {publicKey && availableCart && availableCart.length > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          position: 'relative',
                          borderRadius: '50%',
                          background: colors.primary,
                        }}
                      >
                        <img
                          src={whiteCart}
                          width={'23px'}
                          height={'23px'}
                          alt="cart"
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
                          {availableCart.length}
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
                          background: colors.primary,
                        }}
                      >
                        <img
                          src={whiteCart}
                          width={'23px'}
                          height={'23px'}
                          alt="cart"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className="connect-button-wrapper">
                  <WalletConnectButton />
                  {/* <ConnectButton
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
                  <WalletMultiButton
                    // className="solana-button"
                    style={{
                      marginLeft: '10px',
                      borderRadius: '12px',
                      lineHeight: 'normal',
                      height: '39px',
                    }}
                  /> */}
                </Box>
              </Box>
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

            <Box
              component="nav"
              sx={{
                position: 'absolute',
              }}
            >
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
                  zIndex: 1040, //important
                }}
              >
                {drawer}
              </Drawer>
            </Box>
            <Box>
              <WalletSelectModal
                open={walletModalOpen}
                handleClose={() => setWalletModalOpen(false)}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};
export default Header;
