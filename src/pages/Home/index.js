import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useSwitchNetwork, useNetwork, } from "wagmi";
import {
  ethereumChain,
  bscChain,
} from '../../config';
import AdvancedSearchModal from '../../components/Modal/AdvancedSearchModal'
import { useNavigate, } from "react-router-dom";
import ensLogo from '../../assets/image/svgs/ens-logo.svg';
import binanceLogo from '../../assets/image/svgs/binance-logo.svg';
import searchImage from '../../assets/image/search.png';
import './index.scss';
import MarqueeComponent from "../../components/MarqueeComponent";
import { useDappContext } from "../../utils/context";

const Home = () => {
  const { switchNetwork, } = useSwitchNetwork();
  const { chain, } = useNetwork();
  const [domainName, setDomainName] = useState();
  const {
    theme,
    cartStatus,
    setCartStatus,
    newCartStatus,
    setNewCartStatus,
  } = useDappContext();
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(false);
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const handleChainChange = (event) => {
    switchNetwork?.(event.target.value);
  };

  const [isProcessing, setIsProcessing] = useState(false)
  const handleSearch = () => {
    let names = []
    names.push(domainName)
    setCartStatus({ names: names, cart: [] })
    const newCartStatus = [
      {
        name: domainName,
        isRegistered: undefined,
        isInCart: false,
      }
    ];
    setNewCartStatus(newCartStatus);
    setIsProcessing(true)
  }

  const styles = {
    container: {
      backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh",
    },
  };

  const onKeyPressed = (e) => {
    if (e.code == 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      var w = window.innerWidth * (-2.7 / 100);
      if (top < w * 3) {
        setTop(0)
      }
      else {
        setTop(top + w)
      }
    }, 2500)
    return () => {
      clearInterval(timerId)
    }
  }, [top])

  useEffect(() => {
    if (cartStatus?.names?.length > 0 && isProcessing)
      navigate('/search-result')
  }, [
    newCartStatus?.map(item => { return item.name }),
  ])

  useEffect(() => {
    setCartStatus({})
    setNewCartStatus([]);
  }, []);

  return (
    <Box>
      <Box style={styles.container}>
        <Box
          position="relative"
          overflow="hidden"
          px={{ md: 10, xs: 5 }}
          py={25}
        >
          <Grid
            container
            display='flex'
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
            >
              <Box
                style={{
                  display: 'center',
                  paddingLeft: '0px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center'
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
                    py='5px'
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme == 'dark-theme' ? 'white' : 'black',
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
                      color: "#513eff",
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      background: 'linear-gradient(90deg,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4)',
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {/* -webkit-background-clip */}
                    {'  Web3'}
                  </Typography>
                  <Typography
                    fontSize={{ xs: '25px', md: '33px' }}
                    py='5px'
                    style={{
                      borderRadius: '12px',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme == 'dark-theme' ? 'white' : 'black',
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
                  py='5px'
                  style={{
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: theme == 'dark-theme' ? 'white' : 'black',
                  }}
                  fontWeight={400}
                  align="center"
                >
                  {'Effortlessly manage ENS and BNB domains with Domain Labs'}
                </Typography>

              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
              >
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
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      <TextField
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value.trim().toLocaleLowerCase())}
                        onKeyUp={onKeyPressed}
                        InputProps={{ border: 'none', disableUnderline: true }}
                        style={{
                          width: '100%'
                        }}
                        variant='standard'
                      >
                      </TextField >
                      <Typography
                        mr={{ xs: 0, sm: 2 }}
                        sx={{
                          color: '#3498db',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer'
                        }}
                        fontSize={{ xs: '12px', sm: ' 14px', md: '16px' }}
                        className="custom-font"
                        onClick={() => setIsOpenAdvancedSearch(true)}
                      >
                        Advanced Search
                      </Typography>
                      <Button
                        onClick={handleSearch}
                        style={{
                          minWidth: '40px'
                        }}
                        className='search-img-button'
                      >
                        <Box
                          display={{ xs: 'flex', sm: 'none' }}
                          alignItems={'center'}
                        >
                          <img
                            style={{ width: '16px', height: '16px' }}
                            src={searchImage}
                          />
                        </Box>
                        <Box
                          display={{ xs: 'none', sm: 'flex' }}
                          alignItems={'center'}
                        >
                          <img
                            style={{ width: '24', height: '24px' }}
                            src={searchImage}
                          />
                        </Box>

                      </Button>
                    </Paper>
                    <Box
                      display={"flex"}
                      flexDirection={'row'}
                      mt={{ xs: '10px', sm: '32px' }}
                      alignItems={'center'}
                      width={'100%'}
                      maxWidth={'960px'}
                      onClick={() => navigate('/clio')}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <Typography
                        fontSize={{ xs: '16px', md: '18px' }}
                        mr={{ xs: '2px', sm: '5px' }}
                        lineHeight={{ xs: '19px', md: '22px' }}
                        textTransform={'uppercase'}
                        py='5px'
                        style={{
                          alignItems: 'center',
                          color: theme == 'dark-theme' ? 'white' : 'black',
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
                          color: "#513eff",
                          fontFamily: 'Inter',
                          fontWeight: '700',
                          whiteSpace: 'nowrap',
                          background: 'linear-gradient(90deg,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4,#4BD8D8,#146EB4)',
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
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
                    fontSize={{ md: "2.999vw", xs: "2.5707vw" }}
                    py='23px'
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      fontSize: '18px',
                      lineHeight: '22px',
                      alignItems: 'center',
                      color: theme == 'dark-theme' ? 'white' : 'black',
                    }}
                    fontWeight={400}
                    align="center"
                    marginRight={'10px'}
                  >
                    Search for:
                  </Typography>
                  <Box
                    textAlign={{ xs: 'center' }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chain ? chain.id : ethereumChain}
                      label="Current Chain"
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
                        />
                        ENS - Ethereum Name Service
                      </MenuItem>
                      <MenuItem
                        value={bscChain}
                      >
                        <img
                          src={binanceLogo}
                          style={{ marginRight: '10px' }}
                        />
                        BNS - Binance Name Service
                      </MenuItem>
                    </Select>
                  </Box>

                </Box>
              </Box>

              <Box
                marginTop={{ xs: '100px', lg: '200px' }}
              >
                <MarqueeComponent />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* advanced search modal */}
      <AdvancedSearchModal
        isOpen={isOpenAdvancedSearch}
        handleClose={() => setIsOpenAdvancedSearch(false)}
      />
    </Box>
  );
}

export default Home;
