import * as BNS from 'utils/BNBDomain';
import * as ENS from 'utils/ENSDomain';

import { addCart, removeCart } from 'redux/actions/cartActions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Container from 'components/Container';
import SearchTitle from './Components/SearchTitle';
import SolComponent from './Components/SolanaItem';
import SolanaItem from './Components/SolanaItem';
import { checkAvailability } from 'utils/SolUtils';
import { domainSuffixes } from 'config';
import { toast } from 'react-toastify';
import { useDapp } from 'contexts/dapp';
import { useNavigate } from 'react-router';
import { useTheme } from 'contexts/theme';
import { useWallet } from '@solana/wallet-adapter-react';

const SearchResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { domain, cart } = useSelector((state) => state);
  // const wallet = useWallet();
  const { publicKey } = useWallet();
  // const { provider, signer, address, networkId, isConnected } = useDapp();
  //testing purpose only
  const { provider, signer, address, isConnected } = useDapp();
  const { theme } = useTheme();
  const [results, setResults] = useState([]);
  const networkId = 101;

  const _solAddOrRemoveCart = (_domainName) => {
    console.log(publicKey, 'pubKey');
    if (!publicKey) {
      toast.error('Connect your wallet to proceed!');
      return;
    }
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

  const _addOrRemoveCart = (_domainName) => {
    if (!isConnected) {
      toast.error('Connect your wallet to proceed!');
      return;
    }
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
    // history.goBack();
    navigate(-1);
  };

  const _checkSolAvailability = useCallback(async () => {
    let domains = domain.isSingleSearch
      ? [domain.searchString]
      : domain.searchList;
    const availabilities = await checkAvailability(domains);
    const nRlts = availabilities.map((availability) => {
      const exist = cart.cart.findIndex(
        (item) => item.name === availability.name,
      );
      return {
        ...availability,
        cart: exist > -1,
      };
    });
    setResults(nRlts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

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
          if (domain.isClio && !rlt.available) {
            return false;
          } else {
            const exist = cart.cart.findIndex((item) => item.name === rlt.name);
            const exist1 = results.findIndex((item) => item.name === rlt.name);
            if (exist1 === -1) {
              setResults((prev) => {
                const nRlts = [...prev];
                nRlts.push({ ...rlt, cart: exist > -1 });
                return nRlts;
              });
            }
          }
        });
        return true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, provider, cart.cart]);

  useEffect(() => {
    _checkSolAvailability();
    // if (provider) {
    //   _checkAvailability();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_checkSolAvailability]);

  return (
    <Container>
      <Box pt={10} px={{ xs: '30px', sm: '40px' }}>
        <SearchTitle />
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
            alignItems={'flex-start'}
            gap={'20px'}
            display="grid"
          >
            {}
            {results.length > 0 &&
              results.map((result, idx) => {
                return (
                  // <SearchItem
                  //   result={result}
                  //   networkId={networkId}
                  //   addOrRemoveCart={_addOrRemoveCart}
                  //   key={idx}
                  // />
                  <SolanaItem
                    name={result.name}
                    cart={result.cart}
                    address={result.owner}
                    key={idx}
                    networkId={networkId}
                    addOrRemoveCart={_solAddOrRemoveCart}
                    available={!result.registered}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchResult;
