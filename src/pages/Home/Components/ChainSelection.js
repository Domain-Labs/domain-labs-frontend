import { Box, MenuItem, Select, Typography } from '@mui/material';
import { binanceImage, ensImage, solLogo } from 'utils/images';
import { bscChain, ethereumChain, solChain } from 'config';

import { useDapp } from 'contexts/dapp';
import { useState } from 'react';
import { useSwitchNetwork } from 'wagmi';
import { useTheme } from 'contexts/theme';

const ChainSelection = () => {
  const { theme } = useTheme();
  const switchNetwork = useSwitchNetwork();
  const { setNetworkId, isConnected } = useDapp();
  // const [chainId, setChainId] = useState(networkId);
  //testing purpose only for solana
  const [chainId] = useState(101);

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

  return (
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
          <MenuItem value={ethereumChain} style={{ display: 'flex' }}>
            <img src={ensImage} style={{ marginRight: '10px' }} alt="ENS" />
            ENS - Ethereum Name Service
          </MenuItem>
          <MenuItem value={bscChain}>
            <img src={binanceImage} style={{ marginRight: '10px' }} alt="BNS" />
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
  );
};

export default ChainSelection;
