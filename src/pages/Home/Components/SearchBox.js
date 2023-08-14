import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import { colors } from 'config';
import { searchImage } from 'utils/images';
import { setSearchString } from 'redux/actions/domainActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useTheme } from 'contexts/theme';

const SearchBox = ({ setIsOpenAdvancedSearch }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [searchStr, setSearchStr] = useState('');

  const onKeyPressed = (e) => {
    if (e.code === 'Enter') {
      searchClicked();
    }
  };

  const searchClicked = () => {
    let searchBuf = searchStr.toLowerCase();
    const parts = searchBuf.split('.');
    if (
      parts[parts.length - 1] === 'eth' ||
      parts[parts.length - 1] === 'bnb' ||
      parts[parts.length - 1] === 'sol'
    ) {
      parts.splice(parts.length - 1, 1);
      searchBuf = parts.join('.');
    }
    dispatch(setSearchString(searchBuf));
    navigate(`/search-result`);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="search-box-wrapper"
        flexDirection={'column'}
      >
        <Paper
          sx={{
            maxWidth: '960px',
            display: 'flex',
            backgroundColor:
              theme === 'dark-theme' ? colors.secondary : '#146EB420',
            height: '52px',
            marginTop: '42px',
            width: '100%',
            alignItems: 'center',
            justify: 'center',
            borderRadius: '16px',
          }}
        >
          <TextField
            value={searchStr}
            onChange={(e) =>
              setSearchStr(e.target.value.trim().toLocaleLowerCase())
            }
            onKeyUp={onKeyPressed}
            InputProps={{
              border: 'none',
              disableUnderline: true,
            }}
            sx={{
              width: '100%',
              paddingLeft: '24px',
              paddingRight: '10px',
              input: {
                color:
                  theme === 'dark-theme'
                    ? 'white !important'
                    : 'black !important',
              },
            }}
            variant="standard"
          ></TextField>
          <Typography
            mr={2}
            sx={{
              color: colors.primary,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            fontSize={{ xs: '12px', sm: ' 14px', md: '16px' }}
            className="custom-font"
            onClick={() => {
              setIsOpenAdvancedSearch(true);
            }}
          >
            Advanced Search
          </Typography>
          <Button
            onClick={searchClicked}
            sx={{
              minWidth: '50px',
              height: '100%',
              borderEndEndRadius: '16px',
              borderStartEndRadius: '16px',
              borderStartStartRadius: '0',
              borderEndStartRadius: '0',
              background: colors.primary,
            }}
          >
            <img
              style={{ width: '24px', height: '24px' }}
              src={searchImage}
              alt="search"
            />
          </Button>
        </Paper>
        <Box
          display={'flex'}
          flexDirection={'row'}
          mt={{ xs: '10px', sm: '32px' }}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          maxWidth={'960px'}
        >
          <Typography
            fontSize={{ xs: '14px', md: '16px' }}
            mr={{ xs: '2px', sm: '5px' }}
            lineHeight={{ xs: '19px', md: '22px' }}
            py="5px"
            style={{
              alignItems: 'center',
              color: theme === 'dark-theme' ? '#BABABA' : '#515151',
              lineHeight: '1',
              fontWeight: '400',
              whiteSpace: 'nowrap',
            }}
            fontWeight={700}
            align="center"
          >
            {'Need Assistance? '}
          </Typography>
          <Typography
            fontSize={{ xs: '14px', md: '16px' }}
            mr={{ xs: '2px', sm: '5px' }}
            lineHeight={{ xs: '19px', md: '22px' }}
            textTransform={'capitalize'}
            sx={{
              color: colors.primary,
              fontFamily: 'Inter',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/clio')}
          >
            {/* -webkit-background-clip */}
            {' Try Clio AI Domain Search'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBox;
