import './index.scss';

import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import AdvancedSearchModal from './Components/AdvancedSearchModal';
import ChainSelection from './Components/ChainSelection';
import Container from 'components/Container';
import HomeTitle from './Components/HomeTitle';
import SearchBox from './Components/SearchBox';
import Section1 from './Components/Section1';
import Section2 from './Components/Section2';
import Section3 from './Components/Section3';
import Section4 from './Components/Section4';
import { home_top } from 'utils/images';
import useTitle from 'hooks/useTitle';

const Home = () => {
  // const [chainId, setChainId] = useState(networkId);
  //testing purpose only for solana
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(false);

  const [top, setTop] = useState(0);

  useTitle('Domain Labs - Web3 Domains, ENS Domains, BNB Domains');
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        width={{
          xs: '75%',
          sm: '60%',
        }}
        sx={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <img src={home_top} alt="home_top" width={'100%'} />
      </Box>
      <Container>
        <Box
          position="relative"
          overflow="hidden"
          px={{ md: 10, xs: 5 }}
          py={15}
        >
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12}>
              <HomeTitle />
              <Box display={'flex'} flexDirection={'column'}>
                <SearchBox setIsOpenAdvancedSearch={setIsOpenAdvancedSearch} />
                {/* <ChainSelection /> */}
              </Box>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* advanced search modal */}
      <AdvancedSearchModal
        open={isOpenAdvancedSearch}
        handleClose={() => setIsOpenAdvancedSearch(false)}
      />
    </Box>
  );
};

export default Home;
