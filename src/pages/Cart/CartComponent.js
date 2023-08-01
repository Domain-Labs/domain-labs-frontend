import { Box, Typography } from '@mui/material';
import { domainLogoImages, domainNames } from '../../config';
import { whiteBookmarkImage, whiteOffShoppingImage } from '../../utils/images';

const CartComponent = (props) => {
  const { networkId, name, domain, _removeCart } = props;
  return (
    <Box
      sx={{
        padding: '15px 10px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        position: 'relative',
        width: 'calc(100%-60px)/3',
        marginBottom: '8px',
        background:
          'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
      }}
    >
      <Box
        justifyContent="center"
        display="inline-flex"
        gap={'5px'}
        alignItems={'center'}
        textAlign={'left'}
      >
        <img
          src={domainLogoImages[networkId]}
          width={'21px'}
          height={'24px'}
          style={{
            cursor: 'pointer',
          }}
          alt={'SNS Logo'}
        />
        <Typography
          sx={{ opacity: '1' }}
          fontSize={{
            md: '1.8vw',
            sm: '25px',
          }}
          fontWeight={'700'}
          variant="h5"
          color="white"
        >
          {name}.{domain}
        </Typography>
      </Box>
      <Box>
        <Box display="flex" sx={{ width: 1 }} justifyContent="space-between">
          <Typography
            sx={{ ml: '30px' }}
            fontSize={{
              md: '1vw',
              sm: '18px',
            }}
            color="white"
          >
            {`${domainNames[networkId]} extension`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          marginTop: '8px',
          marginLeft: '30px',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
          }}
        >
          <img
            src={whiteBookmarkImage}
            style={{ cursor: 'pointer' }}
            alt="bookmark"
          />
          <img
            src={whiteOffShoppingImage}
            style={{ cursor: 'pointer' }}
            alt="off shopping"
            onClick={() => _removeCart(name, domain)}
          />
          {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshopping}/>*/}
        </Box>
      </Box>
    </Box>
  );
};

export default CartComponent;
