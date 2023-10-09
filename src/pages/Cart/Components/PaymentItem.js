import { Box, Typography } from '@mui/material';

const PaymentItem = ({ type, icon, onClick, selected, backColor }) => {
  const options = {
    ETH: {
      title: 'ETH',
      subTitle: 'Ethereum',
    },
    BNB: {
      title: 'BNB',
      subTitle: 'Binance',
    },
    SOL: {
      title: 'SOL',
      subTitle: 'Solana',
    },
    USDC: {
      title: 'USDC',
      subTitle: 'USD Coin',
    },
  };

  return (
    <Box
      sx={{
        borderRadius: '6px',
        display: 'flex',
        padding: '5px 10px',
        backgroundColor: backColor,
        border: selected ? '1px solid' : 'none',
        borderColor: '#6180E7',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img src={icon} width={'24px'} alt="ETH" />
      <Box ml={'5px'}>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            color: 'black',
          }}
          fontFamily={'Murecho'}
        >
          {options[type].title}
        </Typography>
        <Typography
          fontFamily={'Murecho'}
          sx={{
            fontSize: '10px',
            fontWeight: 400,
            color: '#515151',
            fontFamily: 'Murecho, sans-serif',
          }}
        >
          {options[type].subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentItem;
