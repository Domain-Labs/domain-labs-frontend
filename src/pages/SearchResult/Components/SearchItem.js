import { Box, Typography } from '@mui/material';
import {
  blackBookmarkImage,
  removeShoppingCartBlack,
  shoppingCart,
  shoppingCartFull,
  timeLeftClock,
  whiteBookmarkImage,
} from 'utils/images';
import { domainLogoImages, domainNames, domainSuffixes } from 'config';

const SearchItem = ({ result, networkId, addOrRemoveCart }) => {
  return (
    <Box
      sx={{
        padding: '20px 15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        marginBottom: '8px',
        background: `${
          !result.available
            ? '#D2EBFF'
            : 'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)'
        }`,
      }}
    >
      {!result.available && (
        <Box display={'flex'} justifyContent={'flex-end'} alignItems="center">
          <Typography
            fontSize={{
              md: '1vw',
              sm: '16px',
            }}
            color={'#FFA552'}
            fontWeight={'700'}
            marginRight="5px"
          >
            {result.leftDays} days left
          </Typography>
          <img src={timeLeftClock} alt="timeLeftClock" />
        </Box>
      )}
      <Box
        justifyContent="center"
        display="inline-flex"
        gap={'5px'}
        alignItems={'center'}
        textAlign={'left'}
      >
        <Box>
          <img
            src={domainLogoImages[networkId]}
            width={'30px'}
            height={'30px'}
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
            }}
            alt="logo"
          />
        </Box>
        <Box
          sx={{ opacity: '1' }}
          fontSize={{
            md: '1.8vw',
            sm: '25px',
          }}
          fontWeight={'700'}
          color={result.available ? 'white' : '#868686'}
        >
          {result.name}.{domainSuffixes[networkId]}
          <Box
            sx={{ opacity: '1' }}
            fontSize={{
              md: '1vw',
              sm: '16px',
            }}
            fontWeight={'400'}
          >
            {domainNames[networkId]} Extension
          </Box>
        </Box>
      </Box>
      <Box display="flex" sx={{ width: 1 }} justifyContent="space-between">
        <Typography
          sx={{ ml: '40px' }}
          fontSize={{
            md: '1.3vw',
            sm: '18px',
          }}
          color={!result.available ? '#C84141' : 'white'}
        >
          {`Domain ${result.available ? 'is available' : 'not available'}.`}
        </Typography>
      </Box>
      {!result.available && (
        <Box
          color={result.available ? 'white' : '#868686'}
          sx={{ paddingLeft: '5px' }}
        >
          <Box
            sx={{ opacity: '1', marginY: '10px' }}
            fontSize={{
              md: '1vw',
              sm: '16px',
            }}
            fontWeight={'600'}
          >
            Details
          </Box>
          <Box
            sx={{ opacity: '1' }}
            fontSize={{
              md: '1vw',
              sm: '16px',
            }}
            fontWeight={'400'}
          >
            {`Owner: ${result.address}`}
          </Box>
          <Box
            sx={{ opacity: '1' }}
            fontSize={{
              md: '1vw',
              sm: '16px',
            }}
            fontWeight={'400'}
          >
            {`Time: ${result.expireDate}`}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          float: 'right',
          gap: '20px',
          marginTop: '15px',
          bottom: '10px',
          right: '20px',
        }}
      >
        <img
          src={result.available ? whiteBookmarkImage : blackBookmarkImage}
          alt="bookmark"
          width={'20px'}
          height={'25px'}
        />
        {result.available ? (
          <img
            src={result.cart ? shoppingCartFull : shoppingCart}
            alt="shopping cart"
            width={'25px'}
            height={'25px'}
            onClick={() => addOrRemoveCart(result.name)}
          />
        ) : (
          <img
            src={removeShoppingCartBlack}
            alt="remove shopping cart"
            width={'25px'}
            height={'25px'}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchItem;
