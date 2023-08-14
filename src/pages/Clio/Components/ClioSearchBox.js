import { BASE_API_URL, colors } from 'config';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import axios from 'axios';
import { searchImage } from 'utils/images';
import { setSearchListClio } from 'redux/actions/domainActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useTheme } from 'contexts/theme';

const ClioSearchBox = (props) => {
  const dispatch = useDispatch();
  const [clioQuery, setClioQuery] = useState('');
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { theme } = useTheme();

  const handleClioQuery = async () => {
    setIsProcessing(true);

    if (clioQuery?.length === 0) {
      toast.error('Please type your clio query');
      return;
    }

    const postObject = {
      clioQuery,
    };

    try {
      const result = (await axios.post(`${BASE_API_URL}/clio`, postObject))
        .data;
      if (result.success) {
        const domains = Object.keys(result.data).map((key) =>
          result.data[key].toLowerCase(),
        );
        dispatch(setSearchListClio(domains));
        setTimeout(() => {
          navigate('/search-result');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      if (error.statusCode === 401) {
        toast.error('You should pay to use clio!');
        setTimeout(() => {
          navigate('/pricing');
          return;
        }, 1000);
      }
      toast.error('Error: For best results, Clio needs more information.');
    }

    setIsProcessing(false);
  };

  const onKeyPressed = (e) => {
    if (e.code === 'Enter') {
      if (!isProcessing) {
        handleClioQuery();
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          style={{
            maxWidth: '960px',
            display: 'flex',
            backgroundColor: '#F7F7F7',
            height: '52px',
            marginTop: '42px',
            width: '100%',
            alignItems: 'center',
            justify: 'center',
            borderRadius: '16px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
          className="clio-query-wrapper"
        >
          <TextField
            value={clioQuery}
            placeholder={'Hi, I’m Clio. How can I help?'}
            onChange={(e) => {
              setClioQuery(e.target.value);
            }}
            onKeyUp={onKeyPressed}
            InputProps={{
              border: 'none',
              disableUnderline: true,
              color: '#4BD8D8 !important',
            }}
            sx={{
              width: '100%',

              paddingLeft: '24px',
              paddingRight: '10px',
            }}
            disabled={isProcessing}
            variant="standard"
          />

          <Button
            onClick={() => {
              if (!isProcessing) handleClioQuery();
            }}
            style={{
              minWidth: '50px',
              height: '100%',
              borderEndEndRadius: '16px',
              borderStartEndRadius: '16px',
              borderStartStartRadius: '0',
              borderEndStartRadius: '0',
              background: colors.primary,
            }}
          >
            <Box display={{ xs: 'none', sm: 'flex' }} alignItems={'center'}>
              {isProcessing ? (
                <CircularProgress size={24} />
              ) : (
                <img
                  style={{ width: '24', height: '24px' }}
                  src={searchImage}
                  alt="searchImage"
                />
              )}
            </Box>
          </Button>
        </Paper>
      </Box>
      <Box
        display={'flex'}
        py="32px"
        px={1}
        mx={{ xs: 'unset', lg: 'calc((100vw - 994px) / 2 - 100px)' }}
        gap={'5px'}
      >
        <Typography
          fontSize={{ xs: '14px', md: '18px' }}
          fontFamily={'Inter'}
          style={{
            textAlign: 'left',
            color: theme === 'dark-theme' ? 'white' : 'black',
          }}
          fontWeight={400}
          align="center"
        >
          {'Easily switch back to'}
        </Typography>

        <Typography
          fontSize={{ xs: '14px', md: '18px' }}
          fontFamily={'Inter'}
          style={{
            textAlign: 'left',
            color: '#146EB4',
            cursor: 'pointer',
          }}
          fontWeight={400}
          align="center"
          onClick={() => navigate('/')}
        >
          {'regular search'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClioSearchBox;
