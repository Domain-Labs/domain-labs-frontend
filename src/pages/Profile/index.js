import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaArrowCircleUp } from 'react-icons/fa';
import { RxPlusCircled } from 'react-icons/rx';
import sampleAvatar from '../../assets/image/profile_avatar.png';
import timer from '../../assets/image/timer.png';
import { useNavigate } from 'react-router';
import { useTheme } from '../../contexts/theme';

const Profile = () => {
  const { theme } = useTheme();
  const [domains, setDomains] = useState([]);
  const [modal, setModal] = useState('');
  const [address, setAddress] = useState(
    '0x5F5DD76D380da23CD5B8705852F67dDeb64C977b',
  );
  // temporary option
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/');
  };
  const options = useMemo(
    () => [
      { label: '1 Year', value: 365 },
      { label: '3 Years', value: 1095 },
      { label: '5 Years', value: 1825 },
    ],
    [],
  );
  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };
  const linearGradient =
    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)';

  useEffect(() => {
    setDomains([
      {
        name: 'moonrider.bnb',
        registrationDate: new Date().toDateString(),
        expirationDate: new Date().toDateString(),
      },
    ]);
  }, []);

  return (
    <Box
      style={styles.container}
      pt={20}
      px={{ xs: '30px', sm: '40px' }}
      sx={{
        marginTop: '100px',
        padding: '20px',
        backgroundColor: theme === 'night' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
    >
      <Box
        display={{ xs: 'block', sm: 'flex' }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Typography
            fontSize={{
              md: '24px',
              xs: '18px',
            }}
            fontWeight={700}
            sx={{
              fontFamily: 'Inter',
              fontWeight: '600',
              color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
              fontSize: '32px',
              lineHeight: '48px',
              letterSpacing: '-0.01rem',
            }}
            onClick={backHome}
          >
            Profile
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              background: theme === 'dark-theme' ? '#AAA' : linearGradient,
              color: 'white',
              ':hover': {
                color: 'white',
                backgroundColor: '#AAA',
              },
            }}
            onClick={() => setModal('transfer')}
          >
            <RxPlusCircled />
            &nbsp;Domain Transfer
          </Button>
        </Box>
      </Box>
      <Box
        display={{ xs: 'block', sm: 'flex' }}
        sx={{
          marginTop: '30px',
          // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          //   borderRadius: "16px",
          //   marginBottom: "8px",
          minHeight: '300px',
        }}
      >
        <Box width={{ xs: 'auto', sm: '20%' }} margin={'10px'}>
          <Box
            borderRadius="16px"
            minHeight={'100px'}
            sx={{
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              padding: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Avatar
                src={sampleAvatar}
                alt="avatar"
                variant="circular"
                sx={{
                  border: '1px solid white',
                  width: '100px',
                  height: '100px',
                }}
              />
            </Box>
            <Box
              sx={{
                marginTop: '20px',
              }}
              color={theme === 'dark-theme' ? 'white' : '#2A2A2A'}
            >
              <Typography fontWeight={700}>Wang JunDong</Typography>
              <CopyToClipboard
                text={address}
                onCopy={() => window.alert('copied')}
              >
                <Typography fontSize={{ xs: '15px', md: '20px' }}>
                  {address.slice(0, 7) + '...' + address.slice(-7, -1)}
                </Typography>
              </CopyToClipboard>
              <Typography fontWeight={900} marginTop={'30px'}>
                Member Since
              </Typography>
              <Typography marginTop={'5px'}>
                {new Date().toDateString()}
              </Typography>
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            alignSelf={'center'}
            textAlign="center"
            justifyContent={'center'}
            sx={{
              background: linearGradient,
              color: 'white',
              borderRadius: '16px',
              marginTop: '10px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            <FaArrowCircleUp />
            &nbsp;Domain Renew
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          width={{ xs: 'auto', sm: '80%' }}
          minHeight={'200px'}
          fontWeight={700}
          sx={{
            background: theme === 'dark-theme' ? '#2A2A2A' : 'white',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25) !important',
            borderRadius: '16px !important',
            padding: '20px',
            margin: '10px',
            width: {
              xs: 'auto',
              sm: '80%',
            },
          }}
        >
          <Table size="small" aria-label="Domain table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                  }}
                >
                  Domain
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                  }}
                >
                  Registration Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                  }}
                >
                  Expiration Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                borderBottom: `2px solid #146EB4`,
              }}
            >
              {domains.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    <Checkbox
                      sx={{
                        fontWeight: 700,
                        color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    {row.registrationDate}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    {row.expirationDate}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                      textUnderlinePosition: 'under',
                    }}
                  >
                    Details
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={domains.length}
                  rowsPerPage={5}
                  page={0}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                  }}
                  // onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActions}
                  sx={{
                    border: 'none',
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={modal === 'transfer'}
      >
        <DialogTitle>Transfer Domains</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
            Approve
          </Typography>
          <Typography sx={{ wordBreak: 'break-all', fontSize: '14px' }}>
            Contract approval allows the contract to perform transfering of
            domains on your behalf
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', marginTop: '16px' }}
          >
            Domainlabs Marketplace:
          </Typography>
          <TextField
            required
            variant="filled"
            sx={{
              width: '100%',
              marginTop: '10px',
              '& input': {
                padding: '10px 16px !important',
                fontSize: '16px',
                fontFamily: 'Inter',
                color: 'white',
              },
              backgroundColor: '#AAA',
              border: 'none',
              color: 'white',
            }}
            placeholder="0x5F5DD76D380da23CD5B8705852F67dDeb64C977b"
          />
        </DialogContent>
        <DialogActions
          sx={{
            padding: '16px 24px',
          }}
        >
          <Button
            autoFocus
            onClick={() => setModal('')}
            sx={{
              background: linearGradient,
              width: '100%',
              color: 'white',
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={modal === 'extend'}
      >
        <DialogTitle>Extend Registration</DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: { xs: 'block', sm: 'flex' },
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}
          >
            Registration Year: &nbsp;
          </Typography>
          <Select
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
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'Inter' }}
          >
            0.017 BNB
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setModal('')}>
            Cancel
          </Button>
          <Button onClick={() => setModal('')}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
