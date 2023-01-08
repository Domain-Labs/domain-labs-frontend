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
import {
  ethereumChain,
  bscChain,
  contractAddresses,
  chainNames,
  rpcUrls,
} from '../../config';
import { search, domaininfo, buyDomain } from '../../utils/interact'
import DialogModal from './DialogModal'
import { useCounterStore, useThemeStore } from '../../utils/store'
import { useNavigate, useParams } from "react-router-dom";
import ensLogo from '../../assets/image/svgs/ens-logo.svg';
import binanceLogo from '../../assets/image/svgs/binance-logo.svg';
import searchImage from '../../assets/image/search.png';
import { useDappContext } from "../../utils/context";

const Home = () => {
  const {
    currentChainIdDecimal,
    setCurrentChainIdDecimal,
    web3Main,
  } = useDappContext();
  const [searchResult, setSearchResult] = useState({ status: true });
  const [domainInfo, setDomainInfo] = useState();
  const [str, setStr] = useState();
  const [count, setCount] = useCounterStore();
  const [theme, setTheme] = useThemeStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [transition, setTransition] = useState('0.2')
  const [chainId, setChainId] = useState(currentChainIdDecimal);
  const handleChainChange = (event) => {
    console.log("chain id changed: new chain id: ", event.target.value);
    console.log("new smart contract address: ", contractAddresses[event.target.value]);
    setChainId(event.target.value);
    setCurrentChainIdDecimal(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [toSearch, setToSearch] = useState(false)
  const searchClicked = () => {
    let names = []
    names.push(str)
    setCount({ names: names, cart: [] })
    setToSearch(true)
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
  const advancedSearch = () => {
    setOpen(true);
  }
  const buyClicked = async () => {
    const { buystatus } = await buyDomain(web3Main, contractAddresses[currentChainIdDecimal], str);
    if (buystatus) {
      const { status } = await search(web3Main, contractAddresses[currentChainIdDecimal], str);
      setDomainInfo(status)
    }
  }
  const keyPressed = (e) => {
    if (e.code == 'Enter') {
      console.log("current chain id when pressed enter: ", currentChainIdDecimal);
      searchClicked()
    }
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      var w = window.innerWidth * (-2.7 / 100);
      if (top < w * 3) {
        // setTransition(0)
        setTop(0)
      }
      else {
        //setTransition('0.2')
        setTop(top + w)
      }
    }, 2500)
    return () => {
      clearInterval(timerId)
    }
  }, [top])
  useEffect(() => {
    if (count?.names?.length > 0 && toSearch)
      navigate('/search-result')
  }, [count])

  return (
    <Box>
      <Box style={styles.container}>
        <Box
          position="relative"
          overflow="hidden"
          px={{ md: 10, xs: 5 }}
          py={25}
        >
          <Grid container display='flex' alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={12}>
              <Box style={{
                display: 'center',
                paddingLeft: '0px',
                borderRadius: '12px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                {/* title of main page*/}
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: '2.9991vw'

                  }}
                >
                  <Typography
                    fontSize={{ md: "2.999vw", xs: "2.5707vw" }}
                    mr={'5px'}
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
                    fontSize={{ md: "2.9991vw", xs: "2.5707vw" }}
                    mr={2}
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
                    fontSize={{ md: "2.999vw", xs: "2.5707vw" }}
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
                  fontSize={{ md: "1.4991vw", xs: "3.5707vw" }}
                  px={1}
                  fontFamily={'Inter'}
                  py='5px'
                  style={{
                    borderRadius: '12px',
                    textAlign: 'center',

                    color: theme == 'dark-theme' ? 'white' : 'black',

                    //WebkitTextFillColor: "transparent",
                    //background:'linear-gradient(30deg, #9F1FED, #645FF2, #38BDD1)'  
                  }}
                  fontWeight={400}
                  align="center"
                >
                  {' Manage, Register and Grow your domain portfolio'}
                </Typography>

              </Box>

              {/* search box of main page*/}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Paper
                  px={3}
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
                    borderRadius: '16px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                  }}
                >
                  <TextField
                    value={str}
                    onChange={(e) => setStr(e.target.value.trim().toLocaleLowerCase())}
                    onKeyUp={keyPressed}
                    InputProps={{ border: 'none', disableUnderline: true }}
                    style={{
                      width: '100%'
                    }}
                    variant='standard'
                  >
                  </TextField >
                  <Typography
                    mr={2}
                    sx={{
                      color: '#3498db',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                    className="custom-font"
                    onClick={advancedSearch}
                  >
                    Advanced Search
                  </Typography>
                  <Button
                    style={{
                      height: '52px',
                      width: '52px',
                      fontSize: '18px',
                      paddingLeft: '32px',
                      borderRadius: '16px',
                      paddingRight: '32px',
                      backgroundColor: 'white',
                      "&:hover": {
                        backgroundColor: "#001cc3"
                      },
                    }}
                    onClick={searchClicked}
                  >
                    <img src={searchImage} />
                  </Button>
                </Paper>
              </Box>

              {/* chain selection*/}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chainId}
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

              {
                !searchResult?.status ? (
                  <Box display="block" textAlign="center" mt={7} alignItems="center">
                    <Typography
                      fontSize={{ md: "2.9rem", xs: '2.3rem' }}
                      style={{
                        borderRadius: '12px',
                        textAlign: 'center',
                        alignItems: 'center',
                        marginTop: '30px',
                        justifyContent: 'center',
                        color: 'black',
                        lineHeight: '1'
                      }}
                    >
                      ENS domain available
                    </Typography>
                    <Button style={{
                      height: '78px',
                      fontSize: '18px',
                      paddingLeft: '32px',
                      marginTop: '30px',
                      borderRadius: '4px',
                      paddingRight: '32px',
                      backgroundColor: 'green',
                      "&:hover": {
                        backgroundColor: "#001cc3"
                      },
                    }}
                      onClick={buyClicked}
                    >
                      Request to register
                    </Button>
                  </Box>
                ) : (
                  ''
                )
              }
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* advanced search modal */}
      <DialogModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default Home;
