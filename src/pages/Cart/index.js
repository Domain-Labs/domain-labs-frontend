import 'react-toastify/dist/ReactToastify.css';

import {
  BASE_API_URL,
  domainExtensions,
  domainNames,
  domainSuffixes,
} from '../../config';
import { BN, Program, web3 } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import {
  removeAll,
  removeCart,
  setStep,
} from '../../redux/actions/cartActions';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import CartItem from './Components/CartItem';
import CartTitle from './Components/CartTitle';
import Container from 'components/Container';
import CostViewer from './Components/CostViewer';
import SolCartItem from './Components/SolCartItem';
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
import useTitle from 'hooks/useTitle';
import { useWallet } from '@solana/wallet-adapter-react';

const program_id = new PublicKey(
  '44mDRYJXCK8DWe6hShk319g8nFmihCXk5BS1YWoLe1rR',
);
const toWalletPubKey = new PublicKey(
  'BurUDeKQKrSWW8U8GoHXHfoS6gqDV4VmcyEHUhNTCWJ4',
  // '8A8tSuP251g56s41s8YYp3NKgqLYFqaTrdnTr1q9aScE',
);

const Cart = () => {
  const networkId = 101; //for solana purpose
  const { cart } = useSelector((state) => state.cart);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [waitingTime, setWaitingTime] = useState(60);
  const [price, setPrice] = useState(0);
  const [priceInUsd, setPriceInUsd] = useState(1);
  // const [step, setStep] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const { step, waiting } = useSelector((state) => {
    return state.cart;
  });

  const _removeCart = (_domainName, domain) => {
    dispatch(removeCart({ name: _domainName, domain: domain }));
  };

  const purchaseDomain = async () => {
    if (!publicKey) {
      toast.warning('Please connect your solana wallet');
      return;
    }
    // await paySol(0.01);
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
          from: publicKey.toString(),
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
    }, 5000);
  };
  const waitTillTransactionFinishes = (tx) => {
    return new Promise(async (resolve, reject) => {
      const provider = getProvider(wallet);
      while (1) {
        try {
          const res = await provider.connection.getParsedTransaction(tx, {
            commitment: 'finalized',
          });
          if (res !== null) {
            console.log(res, 'response');
            break;
          }
        } catch (e) {}
      }
      resolve(true);
    });
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
      await waitTillTransactionFinishes(tx);
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
        // setWaitingTime(60 - timeElapsed);
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

  useTitle('Domain Labs - Cart');

  return (
    <Container>
      <Box pt={10} px={{ xs: '30px', sm: '40px' }}>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <CartTitle publicKey={publicKey} />
          <CostViewer
            price={price}
            priceInUsd={priceInUsd}
            gasPrice={gasPrice}
            cart={cart}
            domainName={domainNames[networkId]}
            purchaseDomain={purchaseDomain}
            loading={loading}
          />
        </Box>
        <Box
          sx={{
            marginTop: '40px',
          }}
        >
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
                  // <CartItem
                  //   key={idx}
                  //   idx={idx}
                  //   _removeCart={_removeCart}
                  //   networkId={networkId}
                  //   name={item.name}
                  //   domain={item.domain}
                  //   timeSelect={timeSelect}
                  // />
                  <SolCartItem
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
    </Container>
  );
};

export default Cart;
