import 'react-toastify/dist/ReactToastify.css';

import {
  BASE_API_URL,
  domainExtensions,
  domainNames,
  domainSuffixes,
} from '../../config';
import { BN, Program, web3 } from '@project-serum/anchor';
import { Box, Typography } from '@mui/material';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { blackVectorImage, whiteVectorImage } from '../../utils/images';
import {
  removeAll,
  removeCart,
  setStep,
} from '../../redux/actions/cartActions';

import CartComponent from './CartComponent';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { getPriceInUSD } from '../../utils/EtherUtils';
import { getProvider } from '../../utils/SolUtils';
import idl from '../../assets/abi/idl.json';
import randomBytes from 'randombytes';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/theme';
import { useWallet } from '@solana/wallet-adapter-react';

const program_id = new PublicKey(
  '44mDRYJXCK8DWe6hShk319g8nFmihCXk5BS1YWoLe1rR',
);
const toWalletPubKey = new PublicKey(
  'BurUDeKQKrSWW8U8GoHXHfoS6gqDV4VmcyEHUhNTCWJ4',
);
//   '8A8tSuP251g56s41s8YYp3NKgqLYFqaTrdnTr1q9aScE',

const Cart = () => {
  const networkId = 101; //for solana purpose
  const { cart } = useSelector((state) => state.cart);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [waitingTime, setWaitingTime] = useState(60);
  const [price, setPrice] = useState(0);
  const [priceInUsd, setPriceInUsd] = useState(1);
  // const [step, setStep] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const { step, waiting } = useSelector((state) => {
    return state.cart;
  });

  const _removeCart = (_domainName, domain) => {
    dispatch(removeCart({ name: _domainName, domain: domain }));
  };

  // const options = useMemo(
  //   () => [
  //     { label: '1 Year', value: 365 },
  //     { label: '3 Years', value: 1095 },
  //     { label: '5 Years', value: 1825 },
  //   ],
  //   [],
  // );

  const backHome = () => {
    navigate('/');
  };

  const purchaseDomain = async () => {
    if (!publicKey) {
      toast.warning('Please connect your solana wallet');
      return;
    }
    // await paySol(0.05);
    setLoading(true);
    let tx;
    try {
      tx = await paySol(price + gasPrice);
    } catch (error) {
      toast.error('Failed to purchase domain');
      setLoading(false);
      return;
    }
    const domainSuffix = domainSuffixes[networkId];
    const domains = cart
      .filter((_item) => _item.domain === domainSuffix)
      .map((item) => {
        return item.name;
      });
    console.log('buy domains');
    setTimeout(async () => {
      console.log('buy domains 1');
      try {
        const res = await axios.post(`${BASE_API_URL}/purchase-domains`, {
          tx: tx,
          domains: domains,
        });
        if (res.data.success) {
        } else {
          console.log(res.data.message, 'error message from server');
          toast.error(`Error: ${res.data.message}`);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error, 'error while purchasing');
        toast.error(`Error: ${error}`);
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.success('Successfully purchased domains');
      setTimeout(() => {
        const domainSuffix = domainSuffixes[networkId];
        dispatch(removeAll({ domain: domainSuffix }));
        navigate('/');
      }, 2000);
    }, 20000);
  };

  const paySol = async (_amount) => {
    const a = JSON.stringify(idl);
    const idl_json = JSON.parse(a);
    const provider = getProvider(wallet);
    const program = new Program(idl_json, program_id, provider);
    const amount = _amount * LAMPORTS_PER_SOL;
    try {
      const tx = await program.methods
        .transferLamports(new BN(amount))
        .accounts({
          from: provider.wallet.publicKey,
          to: toWalletPubKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      const latestBlockHash = await provider.connection.getLatestBlockhash(
        'finalized',
      );

      // tx.recentBlockhash = latestBlockHash.blockhash;
      // tx.feePayer = provider?.wallet.publicKey;
      // let signed = await provider?.wallet.signTransaction(tx);

      await provider.connection.confirmTransaction({
        signature: tx,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
      console.log(`https://explorer.solana.com/tx/${tx}?cluster=mainnet-beta`);
      return tx;
      // console.log(signed);
    } catch (e) {
      console.log(e, 'error');
      throw e;
    }
  };

  // const _requestDomain = async () => {
  //   console.log(results, 'results');
  //   const exist = results.findIndex((item) => item.year === 0);
  //   console.log(exist, 'exist');
  //   if (exist !== -1) {
  //     toast.error('Error: Select Domain Duration To Proceed');
  //     return;
  //   }
  //   dispatch(
  //     requestDomain({
  //       network: networkId === 1 ? 'ENS' : 'BNS',
  //       results,
  //       provider,
  //       signer,
  //     }),
  //   );
  // };

  // const buyDomain = async () => {
  //   let domainFuncs;
  //   if (networkId === 1 || networkId === 5) {
  //     domainFuncs = ENS;
  //   } else {
  //     domainFuncs = BNS;
  //   }
  //   // setLoading(true);

  //   try {
  //     await domainFuncs.register(results, provider, signer);
  //     const domainSuffix = domainSuffixes[networkId];
  //     dispatch(removeAll({ domain: domainSuffix }));
  //   } catch (err) {
  //     console.log(err, 'error from buyDomain');
  //   }
  //   // setStep(0);
  //   // setLoading(false);
  // };

  // const timeSelect = async (idx, value) => {
  //   const nResults = [...results];
  //   nResults[idx].year = value;
  //   nResults[idx].duration = value * 24 * 3600;
  //   let domainFuncs;
  //   if (networkId === 1 || networkId === 5) {
  //     domainFuncs = ENS;
  //   } else {
  //     domainFuncs = BNS;
  //   }
  //   const result = await domainFuncs.getRentPrice(
  //     nResults[idx].name,
  //     nResults[idx].year,
  //     provider,
  //   );
  //   nResults[idx].price = result.price;
  //   nResults[idx].gasPrice = result.gasPrice;

  //   setResults(nResults);
  // };

  // const buttonText = () => {
  //   if (step === 0) {
  //     return 'Secure Domains';
  //   } else if (step === 1) {
  //     return `Waiting for ${waitingTime}s`;
  //   } else if (step === 2) {
  //     return 'Confirm Purchase';
  //   }
  // };

  useEffect(() => {
    const domainSuffix = domainSuffixes[networkId];
    const pricingTable = {
      5: 22, //20
      4: 176, //160
      3: 704, //640
      2: 770, //700
      1: 825, //750
    };
    const pricingInSolTable = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    Object.keys(pricingTable).map((key) => {
      pricingInSolTable[key] = pricingTable[key] / priceInUsd;
      return true;
    });
    console.log(pricingInSolTable, priceInUsd, '---');

    // const tmps = cart
    //   .filter((_item) => _item.domain === domainSuffix)
    //   .map((item) => {
    //     const exist = results.findIndex(
    //       (data) => data.name === item.name && data.domain === item.domain,
    //     );
    //     if (exist > -1) {
    //       return results[exist];
    //     }
    //     return {
    //       name: item.name,
    //       domain: item.domain,
    //       year: 0,
    //       duration: 0,
    //       price: price,
    //       gasPrice: gasPrice,
    //       secret: '0x' + randomBytes(32).toString('hex'),
    //     };
    //   });
    const tmps = cart
      .filter((_item) => _item.domain === domainSuffix)
      .map((item) => {
        const exist = results.findIndex(
          (data) => data.name === item.name && data.domain === item.domain,
        );
        const length = Number(item.name.length >= 5 ? 5 : item.name.length);
        if (exist > -1) {
          return {
            ...results[exist],
            price: pricingInSolTable[length],
            gasPrice: 0.001,
          };
        }
        return {
          name: item.name,
          domain: item.domain,
          year: 0,
          duration: 0,
          price: pricingInSolTable[length],
          gasPrice: 0.001,
          secret: '0x' + randomBytes(32).toString('hex'),
        };
      });
    setResults(tmps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, priceInUsd]);

  useEffect(() => {
    let _price = 0;
    let _gas = 0;
    results.map(async (item) => {
      _price += item.price;
      _gas += item.gasPrice;
    });
    setPrice(_price);
    setGasPrice(_gas);
    console.log(_gas, 'gas');
    dispatch(setStep(0));
  }, [dispatch, results]);

  useEffect(() => {
    if (step === 1) {
      let timerId = setInterval(() => {
        const now = Date.now();
        const timeElapsed = Math.floor((now - waiting) / 1000);
        setWaitingTime(60 - timeElapsed);
        if (timeElapsed >= 60) {
          dispatch(setStep(2));
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, step]);

  useEffect(() => {
    const domainName = domainExtensions[networkId];
    getPriceInUSD(domainName)
      .then((res) => {
        setPriceInUsd(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      pt={20}
      px={{ xs: '30px', sm: '40px' }}
      sx={{
        backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
    >
      {/* <MetaTags>
        <title>Domain Labs - Cart</title>
      </MetaTags> */}
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
              alt="backHome"
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
            <Typography>Total {domainNames[networkId]}</Typography>
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
            <Typography>
              {Math.floor(price * priceInUsd * 100) / 100}
            </Typography>
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
            <Typography>
              {Math.floor(gasPrice * priceInUsd * 100000) / 100000}
            </Typography>
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
              {Math.floor((price + gasPrice) * priceInUsd * 100000) / 100000}
            </Typography>
          </Box>
          <Box>
            <LoadingButton
              loading={loading}
              disabled={!cart || !cart.length}
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
                // step === 0 ? _requestDomain() : buyDomain();
                purchaseDomain();
              }}
            >
              {/* {buttonText()} */}
              {'Purchase Domains'}
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
            {publicKey ? publicKey.toString() : ''}
          </Typography>

          <CopyToClipboard
            text={publicKey ? publicKey.toString() : ''}
            onCopy={() => window.alert('copied')}
          >
            <Typography
              fontSize={'20px'}
              lineHeight={'24px'}
              fontWeight={'600'}
              color={'black'}
              display={{ xs: 'flex', md: 'none' }}
            >
              {publicKey
                ? publicKey.toString().slice(0, 10) +
                  '...' +
                  publicKey.toString().slice(-10, -1)
                : ''}
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
            results.map((item, idx) => {
              return (
                // <Box
                //   key={idx}
                //   sx={{
                //     padding: '15px 10px',
                //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                //     borderRadius: '16px',
                //     position: 'relative',
                //     width: 'calc(100%-60px)/3',
                //     marginBottom: '8px',
                //     background:
                //       'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                //   }}
                // >
                //   <Box
                //     justifyContent="center"
                //     display="inline-flex"
                //     gap={'5px'}
                //     alignItems={'center'}
                //     textAlign={'left'}
                //   >
                //     <img
                //       src={domainLogoImages[networkId]}
                //       width={'21px'}
                //       height={'24px'}
                //       style={{
                //         cursor: 'pointer',
                //       }}
                //       alt={networkId === 1 ? 'ENS Logo' : 'BNS Logo'}
                //     />
                //     <Typography
                //       sx={{ opacity: '1' }}
                //       fontSize={{
                //         md: '1.8vw',
                //         sm: '25px',
                //       }}
                //       fontWeight={'700'}
                //       variant="h5"
                //       color="white"
                //     >
                //       {item.name}.{item.domain}
                //     </Typography>
                //   </Box>
                //   <Box>
                //     <Box
                //       display="flex"
                //       sx={{ width: 1 }}
                //       justifyContent="space-between"
                //     >
                //       <Typography
                //         sx={{ ml: '30px' }}
                //         fontSize={{
                //           md: '1vw',
                //           sm: '18px',
                //         }}
                //         color="white"
                //       >
                //         {`${domainNames[networkId]} extension`}
                //       </Typography>
                //     </Box>
                //   </Box>
                //   <Box
                //     sx={{
                //       justifyContent: 'space-between',
                //       display: 'flex',
                //       marginTop: '8px',
                //       marginLeft: '30px',
                //       alignItems: 'center',
                //       position: 'relative',
                //     }}
                //   >
                //     <Box>
                //       <Select
                //         value={
                //           results[idx] && results[idx].year
                //             ? results[idx].year
                //             : ''
                //         }
                //         onChange={(event) =>
                //           timeSelect(idx, event.target.value)
                //         }
                //         input={<OutlinedInput />}
                //         inputProps={{ 'aria-label': 'Without label' }}
                //         sx={{
                //           borderRadius: '20px',
                //           width: '150px',
                //           '& .MuiSelect-select, & .MuiSelect-select:focus ': {
                //             borderRadius: '20px',
                //             background: 'white',
                //             padding: '5px 32px 5px 12px',
                //           },
                //         }}
                //         MenuProps={{
                //           disableScrollLock: true,
                //         }}
                //       >
                //         <MenuItem value={0} disabled={true}>
                //           <Box
                //             alignItems="center"
                //             display={'flex'}
                //             justifyContent={'center'}
                //           ></Box>
                //         </MenuItem>
                //         {options.map((option) => (
                //           <MenuItem key={option.label} value={option.value}>
                //             <Box
                //               alignItems="center"
                //               display={'flex'}
                //               justifyContent={'center'}
                //             >
                //               <img src={timer} alt="timer" /> &nbsp;{' '}
                //               {option.label}
                //             </Box>
                //           </MenuItem>
                //         ))}
                //       </Select>
                //     </Box>
                //     <Box
                //       sx={{
                //         display: 'flex',
                //         justifyContent: 'flex-end',
                //         gap: '20px',
                //       }}
                //     >
                //       <img
                //         src={whiteBookmarkImage}
                //         style={{ cursor: 'pointer' }}
                //         alt="bookmark"
                //       />
                //       <img
                //         src={whiteOffShoppingImage}
                //         style={{ cursor: 'pointer' }}
                //         alt="off shopping"
                //         onClick={() => _removeCart(item.name, item.domain)}
                //       />
                //       {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshopping}/>*/}
                //     </Box>
                //   </Box>
                // </Box>
                <CartComponent
                  key={idx}
                  _removeCart={_removeCart}
                  networkId={networkId}
                  name={item.name}
                  domain={item.domain}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
