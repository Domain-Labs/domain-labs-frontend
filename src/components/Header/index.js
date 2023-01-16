import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Box,
  Typography,
} from "@mui/material";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { providers, ethers } from "ethers";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { /*NavLink,*/ useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useDimension";
import { useThemeStore, useCounterStore } from "../../utils/store";
import { useDappContext } from '../../utils/context';
import {
  rpcUrls,
  chainIdHexes,
} from '../../config';
import whiteLogoImage from '../../assets/image/logo-white.png';
import darkLogoImage from '../../assets/image/logo-dark.png';
import yellowSunImage from '../../assets/image/light_mode.png'
import darkSunImage from '../../assets/image/light_mode (1).png'
import whiteMoonImage from '../../assets/image/clear_night.png'
import darkMoonImage from '../../assets/image/clear_night (1).png'
import whiteCartImage from '../../assets/image/shopping_cart.png'
import darkCartImage from '../../assets/image/shopping_cart (1).png'
import "./index.scss";

let web3Modal;
let provider;
let selectedAccount;

const ElevationScroll = (props) => {
  const { width } = useWindowDimensions();
  const { children } = props;
  const [theme, setTheme] = useThemeStore();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: theme == 'dark-theme' ? trigger ? "#2A2A2A" : "#2A2A2A" : trigger ? "white" : "white",
      color: theme == 'dark-theme' ? "white" : "#2A2A2A",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
      padding: width > 500 ? "15px 20px" : "0",
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = (props) => {
  const {
    provider,
    setProvider,
    currentChainIdDecimal,
    setCurrentChainIdDecimal,
    walletLoginStatus,
    setWalletLoginStatus,
    web3Main,
    setWeb3Main,
  } = useDappContext();
  const [walletLoggedIn, setWalletLoggedIn] = useState()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const [wallet, setWallet] = useState()
  const navigate = useNavigate();
  const [count, setCount] = useCounterStore();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [theme, setTheme] = useThemeStore();
  const toBuyPage = () => {

    // navigate('/cart')
  }

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    theme == 'dark-theme' ? setTheme('day-theme') : setTheme('dark-theme')
  }

  return (
    <React.Fragment
    >
      <ElevationScroll {...props}
        px={'10px !important'}
        class
      >
        <AppBar
          height={{ xs: '100px', sm: '60px' }}
        >
          <Toolbar
            px={'0px'}
            height={{ xs: '100px', sm: '60px' }}
          >
            <Box
              position={`fixed`}
              style={{
                backgroundRepeat: "no-repeat",
                zIndex: "9999",
                backgroundSize: "contain",
                backgroundImage: whiteLogoImage,
              }}
              sx={{ display: 'flex' }}
              mr={'17px'}
              alignItems={'center'}
            >
              <img
                src={theme == 'dark-theme' ? darkLogoImage : whiteLogoImage}
                style={{
                  height: '41px'
                }}
              />
              <Typography
                color={theme == 'dark-theme' ? 'white' : 'black'}
                fontSize={"32px"}
                ml={'17px'}
                display={{ xs: 'none', md: 'flex' }}
              >
                Domain Labs
              </Typography>
            </Box>

            <Box
              position={'fixed'}
              sx={{
                right: { md: "10px", xs: "10px" },
              }}
              style={{
                zIndex: '10000'
              }}
              display={'flex'}
            >
              <Box
                mr={'10.93px'}
                display={{ xs: "block", sm: 'flex' }}
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
                  <Box
                    sx={{
                      padding: '4px 5px'
                    }}
                    alignItems='center'
                    display={'flex'}
                  >
                    <img
                      src={theme == 'dark-theme' ? darkSunImage : yellowSunImage}
                      width={'22px'}
                      height={'22px'}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: '4px 10px'
                    }}
                    alignItems='center'
                    display={'flex'}
                  >
                    <Toggle
                      defaultChecked={isSwitchOn}
                      icons={false}
                      onChange={() => switchTheme()}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: '4px 5px 3px 10px'
                    }}
                    alignItems='center'
                    display={'flex'}
                  >
                    <img
                      src={
                        theme == 'dark-theme' ? darkMoonImage : whiteMoonImage
                      }
                      width={'20px'}
                      height={'20px'}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: '2px 0px 3px 15px',
                      cursor: 'pointer'
                    }}
                    onClick={toBuyPage}
                    display={'flex'}
                  >
                    {
                      count.cart && count.cart > 0 ? (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          position: 'relative',
                          borderRadius: '50%',
                          background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)'
                        }}>
                          <img
                            src={darkCartImage}
                            width={'22.64px'}
                            height={'22.64px'}
                          />

                          <span
                            style={{
                              position: 'absolute',
                              backgroundColor: '#F46B6B',
                              width: '13px', height: '13px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '10.3705px',
                              lineHeight: '13px',
                              color: 'white',
                              borderRadius: '50%',
                              top: '0',
                              right: '0'
                            }}
                          >
                            {count.cart}
                          </span>
                        </Box>
                      ) : (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          alignItems: 'center',
                          borderRadius: '50%',
                        }}>
                          <img
                            src={
                              theme == 'dark-theme' ? darkCartImage : whiteCartImage
                            }
                            width={'22.64px'}
                            height={'22.64px'}
                          />
                        </Box>
                      )
                    }
                  </Box>
                </Box>

                <Box>
                  <ConnectButton
                    showBalance={{
                      smallScreen: false,
                      largeScreen: false,
                    }}
                    accountStatus={{
                      smallScreen: 'avatar',
                      largeScreen: 'full',
                    }}
                    chainStatus={{
                      smallScreen: 'icon',
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
}
export default Header;
