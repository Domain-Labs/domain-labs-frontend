import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { domainLogoImages, domainNames } from 'config';
import { timer, whiteBookmarkImage, whiteOffShoppingImage } from 'utils/images';

import { useMemo } from 'react';

const CartItem = ({
  networkId,
  name,
  domain,
  _removeCart,
  timeSelect,
  idx,
  results,
}) => {
  const options = useMemo(
    () => [
      { label: '1 Year', value: 365 },
      { label: '3 Years', value: 1095 },
      { label: '5 Years', value: 1825 },
    ],
    [],
  );
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
          alt={networkId === 1 ? 'ENS Logo' : 'BNS Logo'}
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
        <Box>
          <Select
            value={results[idx] && results[idx].year ? results[idx].year : ''}
            onChange={(event) => timeSelect(idx, event.target.value)}
            input={<OutlinedInput />}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              borderRadius: '20px',
              width: '150px',
              '& .MuiSelect-select, & .MuiSelect-select:focus ': {
                borderRadius: '20px',
                background: 'white',
                padding: '5px 32px 5px 12px',
              },
            }}
            MenuProps={{
              disableScrollLock: true,
            }}
          >
            <MenuItem value={0} disabled={true}>
              <Box
                alignItems="center"
                display={'flex'}
                justifyContent={'center'}
              ></Box>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                <Box
                  alignItems="center"
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <img src={timer} alt="timer" /> &nbsp; {option.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
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

export default CartItem;
