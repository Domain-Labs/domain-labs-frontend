import { addCart, removeCart } from 'redux/actions/cartActions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Container from 'components/Container';
import SearchItem from './Components/SearchItem';
import SearchTitle from './Components/SearchTitle';
import SolanaItem from './Components/SolanaItem';
import { checkDomainAvailability } from 'services/APIService';

const SearchResult = () => {
  const dispatch = useDispatch();
  const { domain, cart } = useSelector((state) => state);
  const [results, setResults] = useState([]);

  const _addOrRemoveCart = useCallback(
    (_domainName, type) => {
      // const domainSuffix = domainSuffixes[networkId];
      console.log(_domainName, type);
      const exist = cart.cart.findIndex(
        (item) => item.name === _domainName && item.type === type,
      );
      const idx = results.findIndex(
        (item) => item.name === _domainName && item.type === type,
      );
      if (exist < 0) {
        setResults((prev) => {
          const nRlt = [...prev];
          nRlt[idx] = {
            ...nRlt[idx],
            cart: true,
          };
          return nRlt;
        });
        dispatch(addCart({ name: _domainName, type: type }));
      } else {
        console.log('exist');
        setResults((prev) => {
          const nRlt = [...prev];
          nRlt[idx] = {
            ...nRlt[idx],
            cart: false,
          };
          return nRlt;
        });
        dispatch(removeCart({ name: _domainName, type: type }));
      }
    },
    [cart.cart, dispatch, results],
  );

  const _checkAvailability = useCallback(async () => {
    // let domainFuncs;
    const types = ['BNB', 'ETH', 'SOL'];
    let availabilities;
    if (domain.isSingleSearch) {
      availabilities = await checkDomainAvailability(
        types.map((type) => {
          return { name: domain.searchString, type: type };
        }),
      );
    } else {
      const names = [];
      domain.searchList.forEach((searchStr) => {
        types.forEach((type) =>
          names.push({
            name: searchStr,
            type: type,
          }),
        );
      });
      availabilities = await checkDomainAvailability(names);
    }

    availabilities.forEach((rlt) => {
      const exist = cart.cart.findIndex(
        (item) => item.name === rlt.name && item.type === rlt.type,
      );
      const exist1 = results.findIndex(
        (item) => item.name === rlt.name && item.type === rlt.type,
      );
      if (exist1 === -1) {
        setResults((prev) => {
          const nRlts = [...prev];
          nRlts.push({ ...rlt, cart: exist > -1 });
          return nRlts;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, cart.cart]);

  useEffect(() => {
    _checkAvailability();
  }, [_checkAvailability]);

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
                if (result.type === 'SOL') {
                  return (
                    <SolanaItem
                      result={result}
                      key={idx}
                      addOrRemoveCart={_addOrRemoveCart}
                    />
                  );
                } else {
                  return (
                    <SearchItem
                      result={result}
                      addOrRemoveCart={_addOrRemoveCart}
                      key={idx}
                    />
                  );
                }
              })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchResult;
