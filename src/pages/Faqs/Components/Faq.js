import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { Box } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';
import { Typography } from '@mui/material';

const Faq = ({ item, theme, show, handleShowState, index }) => {
  const color =
    index % 2 === 0 ? 'white' : theme === 'dark-theme' ? 'white' : '#666666';
  const background =
    index % 2 === 0
      ? 'linear-gradient(87.95deg, #4BD8D8 -3.28%, #146EB4 106.25%)'
      : theme === 'dark-theme'
      ? '#666666'
      : 'white';

  return (
    <Box
      sx={{
        background: background,
        padding: '30px 20px',
        borderRadius: '10px',
        boxShadow: index % 2 === 0 ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
        mt: '20px',
      }}
    >
      <Box display={'flex'} gap={'10px'} position={'relative'}>
        <Typography
          mx={{ xs: '22px', sm: '44px', md: '66px', lg: '88px' }}
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '32px',
            lineHeight: '39px',
            letterSpacing: '-0.01em',
            color: color,
          }}
        >
          {item.question}
        </Typography>
        <Box
          position={'absolute'}
          alignItems={'center'}
          display={'flex'}
          color={
            index % 2 === 0
              ? 'white'
              : theme === 'dark-theme'
              ? 'white'
              : 'black'
          }
          className="dropdown-dropup-svg-wrapper"
          onClick={() => handleShowState(index)}
          sx={{
            cursor: 'pointer',
            right: '10px',
            top: '50%',
            transform: 'translate(0, -50%)',
          }}
        >
          {!show ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </Box>
      </Box>
      <Box
        className="faq-answers"
        display={show ? 'flex' : 'none'}
        mt={'10px'}
        mx={{ xs: '22px', sm: '44px', md: '66px', lg: '88px' }}
        sx={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.01em',
          color: color,
        }}
      >
        {ReactHtmlParser(item.answer)}
      </Box>
    </Box>
  );
};

export default Faq;
