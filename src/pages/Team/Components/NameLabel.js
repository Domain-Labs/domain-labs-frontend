import { Box } from '@mui/material';

const NameLabel = (props) => {
  return (
    <Box
      sx={{
        marginTop: 'auto',
        marginLeft: '10px',
        marginBottom: '10px',
      }}
    >
      <Box
        fontSize={{
          md: '36px',
          xs: '24px',
        }}
        sx={{
          fontFamily: 'Inter',
          color: 'white',
          textTransform: 'uppercase',
        }}
      >
        {props.name}
      </Box>
      <Box
        fontSize={{
          md: '20px',
          xs: '16px',
        }}
        sx={{
          fontFamily: 'Inter',
          color: 'white',
        }}
      >
        {props.job}
      </Box>
    </Box>
  );
};

export default NameLabel;
