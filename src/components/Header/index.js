import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Box,
} from "@mui/material";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import axios from 'axios';
import { /*NavLink,*/ useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useDimension";
import { useThemeStore, useCounterStore } from "../../utils/store";
import { useDappContext } from '../../utils/context';
import {
  rpcUrls,
  chainIdHexes,
} from '../../config';
import whiteLogoImage from '../../assets/image/whitelogo.png';
import blackLogoImage from '../../assets/image/blacklogo.png';
import yellowSunImage from '../../assets/image/light_mode.png'
import darkSunImage from '../../assets/image/light_mode (1).png'
import whiteMoonImage from '../../assets/image/clear_night.png'
import darkMoonImage from '../../assets/image/clear_night (1).png'
import whiteCartImage from '../../assets/image/shopping_cart.png'
import darkCartImage from '../../assets/image/shopping_cart (1).png'

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
      padding: width > 500 ? "15px 50px" : "0",
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

    navigate('/cart')
  }

  const init = () => {
    console.log("init: current chainId decimal: ", currentChainIdDecimal);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // Mikko's test key - don't copy as your mileage may vary
          // infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          rpc: {
            currentChainIdDecimal: rpcUrls[currentChainIdDecimal]
          },
          chainId: currentChainIdDecimal
        }
      },
    };

    web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    // window.w3m = web3Modal;
  }

  const fetchAccountData = async () => {
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    selectedAccount = await signer.getAddress();
    console.log(selectedAccount);
    return selectedAccount;
  }

  const refreshAccountData = async () => {
    await fetchAccountData(provider);
  }

  const onConnect = async () => {
    console.log("Opening a dialog", web3Modal);
    try {
      let newProvider = await web3Modal.connect({ cacheProvider: true });
      setProvider(newProvider);
      const web3 = new Web3(newProvider);
      const accounts = await web3.eth.getAccounts();

      try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accesses/write-log/${accounts[0]}`);
      } catch (e) {
        console.log("error occured: ", e);
      }

      // window.location.reload();
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }

    provider?.on("accountsChanged", (accounts) => {
      console.log('chainchan', accounts)
      fetchAccountData();
      // window.location.reload()
    });

    provider?.on("chainChanged", (chainId) => {
      fetchAccountData();
      // window.location.reload()
    });

    provider?.on("networkChanged", (networkId) => {
      fetchAccountData();
    });
    window.location.reload()

  }

  const disconnet = async () => {
    console.log("Opening a dialog", web3Modal);
    try {
      await web3Modal.clearCachedProvider();
      window.location.reload()
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  }
  const switch_onChange_handle = () => {
    setIsSwitchOn(!isSwitchOn);
    theme == 'dark-theme' ? setTheme('day-theme') : setTheme('dark-theme')
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(async () => {
    if (walletLoggedIn) {
      let provider1 = await web3Modal?.connect();
      if (provider1) {
        const web3 = new Web3(provider1);
        const accounts = await web3.eth.getAccounts();
        setWeb3Main(web3);
        setProvider(provider1)
        setWallet(accounts[0])
      }
    }
  }, [walletLoggedIn]);

  useEffect(() => {
    init();
    if (web3Modal.cachedProvider) {
      // is wallet is connected
      console.log('provider: ', web3Modal.cachedProvider, " connected");
      setWalletLoggedIn(true)
    }
  }, [currentChainIdDecimal]);

  useEffect(async () => {
    if (walletLoggedIn && provider) {
      const chainId = await provider.request({ method: 'eth_chainId' });
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log("header: chainid: ", chainId);
      console.log("current chainIdDecimal: ", chainIdHexes[currentChainIdDecimal]);

      if (chainId != chainIdHexes[currentChainIdDecimal]) {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHexes[currentChainIdDecimal] }], // chainId must be in hexadecimal numbers
        });
      }

      await provider.on('chainChanged', (chainId) => {
        // window.location.reload();
      });
    }
  }, [walletLoggedIn, provider, currentChainIdDecimal]);

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Box
              position={`fixed`}
              style={{
                backgroundRepeat: "no-repeat",
                zIndex: "9999",
                backgroundSize: "contain",
                backgroundImage: whiteLogoImage,
              }}
            >
              <img
                src={theme == 'dark-theme' ? whiteLogoImage : blackLogoImage}
                style={{
                  width: '232px'
                }}
              />
            </Box>


            <Box
              position={'fixed'}
              sx={{
                right: { md: "10px", xs: "10px" },
                top: { md: "30px", xs: "10px" },
              }}
              style={{
                zIndex: '10000'
              }}
            >
              <Box
                display={'flex'}
                sx={{

                }}
              >
                <Box
                  mr={'40.93px'}
                  display="flex"
                  sx={{
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      padding: '4px 5px'
                    }}
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
                  >
                    <Toggle
                      defaultChecked={isSwitchOn}
                      icons={false}
                      onChange={() => switch_onChange_handle()}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: '4px 5px 3px 10px'
                    }}
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
                  <Box
                    display="flex"
                    sx={{
                      ml: 2,
                      flexDirection: 'row-reverse',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {
                      walletLoggedIn ? (
                        <Box
                          sx={{
                            px: '43px',
                            py: '5px',
                            background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                            color: 'white',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontFamily: 'Inter',
                          }}
                          onClick={() => disconnet()}
                        >
                          {wallet?.slice(0, 5)}.....{wallet?.slice(-3)}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            px: '43px',
                            py: '5px',
                            background: 'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
                            color: 'white',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontFamily: 'Inter',
                          }}
                          onClick={() => onConnect()}
                        >
                          Connect Wallet
                        </Box>
                      )
                    }
                  </Box>
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
