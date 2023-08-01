import './index.scss';

import { BN, Program, Provider, web3 } from '@project-serum/anchor';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { bscChain, ethereumChain, solChain } from '../../config';
import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import AdvancedSearchModal from '../../components/Modal/AdvancedSearchModal';
import MarqueeComponent from '../../components/MarqueeComponent';
import MetaTags from 'react-meta-tags';
import binanceLogo from '../../assets/image/svgs/binance-logo.svg';
import ensLogo from '../../assets/image/svgs/ens-logo.svg';
import searchImage from '../../assets/image/search.png';
import { setSearchString } from '../../redux/actions/domainActions';
import { solLogo } from '../../utils/images';
import { useDapp } from '../../contexts/dapp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';

const Home = () => {
  const { switchNetwork } = useSwitchNetwork();
  const dispatch = useDispatch();
  const { setNetworkId, isConnected, networkId } = useDapp();
  const { theme } = useTheme();
  // const [chainId, setChainId] = useState(networkId);
  //testing purpose only for solana
  const [chainId, setChainId] = useState(101);
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const navigate = useNavigate();
  const [top, setTop] = useState(0);

  const handleChainChange = (event) => {
    const id = Number(event.target.value);
    // if (id !== 101) {
    if (isConnected) {
      switchNetwork(`0x${id.toString(16)}`);
      // return;
    }
    setNetworkId(id);
    // setChainId(id);
    // }
  };

  const searchClicked = () => {
    let searchBuf = searchStr.toLowerCase();
    const parts = searchBuf.split('.');
    if (
      parts[parts.length - 1] === 'eth' ||
      parts[parts.length - 1] === 'bnb' ||
      parts[parts.length - 1] === 'sol'
    ) {
      parts.splice(parts.length - 1, 1);
      searchBuf = parts.join('.');
    }
    dispatch(setSearchString(searchBuf));
    navigate(`/search-result`);
  };

  const onKeyPressed = (e) => {
    if (e.code === 'Enter') {
      searchClicked();
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

  useEffect(() => {
    // setChainId(networkId);
  }, [networkId]);

  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };

  return (
    <Box>
      {/* <MetaTags>
        <title>Domain Labs - Web3 Domains, ENS Domains, BNB Domains</title>
        <meta
          name="og:description"
          content="Empowering the Web3 era with cutting-edge solutions. Explore ENS domains, BNB domains, and more to unlocak the full potential of your online presence."
        />
        <meta
          name="description"
          content="Empowering the Web3 era with cutting-edge solutions. Explore ENS domains, BNB domains, and more to unlocak the full potential of your online presence."
        />
      </MetaTags> */}
      <Box style={styles.container}>
        <Box
          position="relative"
          overflow="hidden"
          px={{ md: 10, xs: 5 }}
          py={25}
        >
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12}>
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
                      color: theme === 'dark-theme' ? 'white' : 'black',
                      lineHeight: '1',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                    }}
                    fontWeight={400}
                    align="center"
                  >
                    {'Search For '}
                  </Typography>
                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    mx={{ xs: '2px', sm: '10px' }}
                    style={{
                      textTransform: 'uppercase',
                      color: '#513eff',
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      background:
                        'linear-gradient(90deg,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {/* -webkit-background-clip */}
                    {'  Web3'}
                  </Typography>
                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    py="5px"
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'dark-theme' ? 'white' : 'black',
                      lineHeight: '1',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                    }}
                    fontWeight={400}
                    align="center"
                  >
                    {'Domains'}
                  </Typography>
                </Box>

                {/* description of main page*/}
                <Typography
                  fontSize={{ xs: '14px', md: '18px' }}
                  px={1}
                  fontFamily={'Inter'}
                  py="5px"
                  style={{
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: theme === 'dark-theme' ? 'white' : 'black',
                  }}
                  fontWeight={400}
                  align="center"
                >
                  {'Effortlessly manage ENS and BNB domains with Domain Labs'}
                </Typography>
              </Box>

              <Box display={'flex'} flexDirection={'column'}>
                {/* search box of main page*/}
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    className="search-box-wrapper"
                    flexDirection={'column'}
                  >
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
                    >
                      <TextField
                        value={searchStr}
                        onChange={(e) =>
                          setSearchStr(
                            e.target.value.trim().toLocaleLowerCase(),
                          )
                        }
                        onKeyUp={onKeyPressed}
                        InputProps={{ border: 'none', disableUnderline: true }}
                        style={{
                          width: '100%',
                        }}
                        variant="standard"
                      ></TextField>
                      <Typography
                        mr={{ xs: 0, sm: 2 }}
                        sx={{
                          color: '#3498db',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                        }}
                        fontSize={{ xs: '12px', sm: ' 14px', md: '16px' }}
                        className="custom-font"
                        onClick={() => {
                          setIsOpenAdvancedSearch(true);
                        }}
                      >
                        Advanced Search
                      </Typography>
                      <Button
                        onClick={searchClicked}
                        style={{
                          minWidth: '40px',
                        }}
                        className="search-img-button"
                      >
                        <Box
                          display={{ xs: 'flex', sm: 'none' }}
                          alignItems={'center'}
                        >
                          <img
                            style={{ width: '16px', height: '16px' }}
                            src={searchImage}
                            alt="search"
                          />
                        </Box>
                        <Box
                          display={{ xs: 'none', sm: 'flex' }}
                          alignItems={'center'}
                        >
                          <img
                            style={{ width: '24', height: '24px' }}
                            src={searchImage}
                            alt="search"
                          />
                        </Box>
                      </Button>
                    </Paper>
                    <Box
                      display={'flex'}
                      flexDirection={'row'}
                      mt={{ xs: '10px', sm: '32px' }}
                      alignItems={'center'}
                      width={'100%'}
                      maxWidth={'960px'}
                    >
                      <Typography
                        fontSize={{ xs: '16px', md: '18px' }}
                        mr={{ xs: '2px', sm: '5px' }}
                        lineHeight={{ xs: '19px', md: '22px' }}
                        textTransform={'uppercase'}
                        py="5px"
                        style={{
                          alignItems: 'center',
                          color: theme === 'dark-theme' ? 'white' : 'black',
                          lineHeight: '1',
                          fontWeight: '700',
                          whiteSpace: 'nowrap',
                        }}
                        fontWeight={700}
                        align="center"
                      >
                        {'BETA - '}
                      </Typography>
                      <Typography
                        fontSize={{ xs: '16px', md: '18px' }}
                        mr={{ xs: '2px', sm: '5px' }}
                        lineHeight={{ xs: '19px', md: '22px' }}
                        textTransform={'capitalize'}
                        style={{
                          color: '#513eff',
                          fontFamily: 'Inter',
                          fontWeight: '700',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          background:
                            'linear-gradient(90deg,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        onClick={() => navigate('/clio')}
                      >
                        {/* -webkit-background-clip */}
                        {' Try Clio AI Domain Search'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* chain selection*/}
                <Box
                  display={{ xs: 'block', sm: 'flex' }}
                  justifyContent="center"
                  alignItems="center"
                  // width={'max-content'}
                  pt={{ xs: '30px', sm: '0px' }}
                >
                  <Typography
                    fontSize={{ md: '2.999vw', xs: '2.5707vw' }}
                    py="23px"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      fontSize: '18px',
                      lineHeight: '22px',
                      alignItems: 'center',
                      color: theme === 'dark-theme' ? 'white' : 'black',
                    }}
                    fontWeight={400}
                    align="center"
                    marginRight={'10px'}
                  >
                    Search for:
                  </Typography>
                  <Box textAlign={{ xs: 'center' }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chainId}
                      onChange={handleChainChange}
                      className="chain-select-menu"
                      style={{
                        width: '300px',
                        height: '34px',
                        borderRadius: '16px',
                        background: '#F7F7F7',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <MenuItem
                        value={ethereumChain}
                        style={{ display: 'flex' }}
                      >
                        <img
                          src={ensLogo}
                          style={{ marginRight: '10px' }}
                          alt="ENS"
                        />
                        ENS - Ethereum Name Service
                      </MenuItem>
                      <MenuItem value={bscChain}>
                        <img
                          src={binanceLogo}
                          style={{ marginRight: '10px' }}
                          alt="BNS"
                        />
                        BNS - Binance Name Service
                      </MenuItem>
                      <MenuItem value={solChain}>
                        <img
                          src={solLogo}
                          style={{ marginRight: '10px', width: '20px' }}
                          alt="SOL"
                        />
                        SNS - Solana Name Service
                      </MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>

              <Box marginTop={{ xs: '100px', lg: '200px' }}>
                <MarqueeComponent />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* advanced search modal */}
      <AdvancedSearchModal
        open={isOpenAdvancedSearch}
        handleClose={() => setIsOpenAdvancedSearch(false)}
      />
    </Box>
  );
};

export default Home;
