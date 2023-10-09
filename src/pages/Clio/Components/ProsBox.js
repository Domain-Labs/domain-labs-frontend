import { Box, Typography } from '@mui/material';

const ProsBox = ({ item }) => {
  return (
    <Box
      width={'341px'}
      minHeight={'338px'}
      justifyContent={'start'}
      alignItems={'center'}
      gap={'12px'}
      borderRadius={'40px'}
      sx={{
        background: '#0E4F81',
      }}
    >
      <Box
        display="flex"
        p={'74px 40px 25px'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Box display={'flex'} justifyContent={'center'}>
          <img src={item.image} width={'100px'} height={'100px'} alt="item" />
        </Box>

        <Box display={'flex'} justifyContent={'center'} mt={'37px'}>
          <Typography
            justifyContent={'right'}
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '900',
              fontSize: '20px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: 'white',
            }}
          >
            {item.title}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'center'} mt={'21px'}>
          <Typography
            display={'flex'}
            justifyContent={'center'}
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '19px',
              letterSpacing: '-0.01em',
              color: 'white',
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProsBox;
