import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { binanceImage, ensImage, sampleAvatar } from '../../utils/images';
import { useEffect, useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import ExtendDialog from './Dialogs/ExtendDialog';
import { FaArrowCircleUp } from 'react-icons/fa';
import { RxPlusCircled } from 'react-icons/rx';
import TransferDialog from './Dialogs/TransferDialog';
import { getDomainsByAddress } from '../../redux/actions/profileActions';
import moment from 'moment';
import { useDapp } from '../../contexts/dapp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTheme } from '../../contexts/theme';

const Profile = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  // const [domains, setDomains] = useState([]);
  const [modal, setModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [onePageDomains, setOnePageDomains] = useState([]);
  const [selDomain, setSelDomain] = useState();
  const { address, networkId } = useDapp('');
  const { domains, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const domainSuffixes = ['eth', 'bnb'];
  const domainLogos = [ensImage, binanceImage];

  const backHome = () => {
    navigate('/');
  };

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

  const calcExpiration = (unix_time) => {
    const now = Date.now();
    const expDate = new Date(unix_time * 1000).toDateString();
    return moment(expDate).format('MM/DD/YYYY');
    // const days = Math.floor((unix_time * 1000 - now) / (24 * 3600 * 1000));
    // const months = Math.floor(days / 30);
    // if (months < 12) {
    //   return `${months} months`;
    // } else {
    //   return `${Math.floor(months / 12)} years ${months % 12} months`;
    // }
  };

  const handleExtend = (domain) => {
    setSelDomain(domain);
    setModal('extend');
  };

  const handleTransfer = (domain) => {
    setSelDomain(domain);
    setModal('transfer');
  };

  useEffect(() => {
    dispatch(getDomainsByAddress(address));
  }, [address, dispatch]);

  useEffect(() => {
    const perPage = 5; // perPage
    let network = 0;
    if (networkId === 1) {
      network = 0;
    } else if (networkId === 56) {
      network = 1;
    } else {
      setOnePageDomains([]);
      return;
    }
    if (domains && domains.length) {
      const fDomains = domains.filter((domain) => domain.network === network);
      setTotalPage(Math.ceil(fDomains.length / 5));
      const tmp = fDomains.slice(
        perPage * (currentPage - 1),
        perPage * currentPage,
      );
      setOnePageDomains(tmp);
    }
  }, [currentPage, domains, networkId]);

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
        {/* <Box display={'flex'} alignItems={'center'}>
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
        </Box> */}
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
              {/* <Typography fontWeight={700}>Wang JunDong</Typography> */}
              <CopyToClipboard
                text={address}
                onCopy={() => window.alert('copied')}
              >
                <Typography fontSize={{ xs: '15px', md: '20px' }}>
                  {address
                    ? address.slice(0, 7) + '...' + address.slice(-7, -1)
                    : ''}
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
          {/* <Box
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
          </Box> */}
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
              {onePageDomains.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                      width: '30px',
                    }}
                  >
                    {/* <Checkbox
                      sx={{
                        fontWeight: 700,
                        color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                      }}
                    /> */}
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img src={domainLogos[row.network]} alt="logo" />
                      <Typography
                        sx={{
                          marginLeft: 1,
                        }}
                      >
                        {row.name}.{domainSuffixes[row.network]}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    {calcExpiration(row.expirationDate)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        background:
                          theme === 'dark-theme' ? '#AAA' : linearGradient,
                        color: 'white',
                        ':hover': {
                          color: 'white',
                          backgroundColor: '#AAA',
                        },
                      }}
                      onClick={() => handleTransfer(row)}
                    >
                      Transfer
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        background:
                          theme === 'dark-theme' ? '#AAA' : linearGradient,
                        color: 'white',
                        ':hover': {
                          color: 'white',
                          backgroundColor: '#AAA',
                        },
                        marginLeft: 1,
                      }}
                      onClick={() => handleExtend(row)}
                    >
                      Extend
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPage}
            color="primary"
            onChange={(e, value) => {
              setCurrentPage(value);
            }}
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                }}
                {...item}
              />
            )}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: '10px',
            }}
          />
        </TableContainer>
      </Box>
      <TransferDialog
        open={modal === 'transfer'}
        close={() => setModal('')}
        domain={selDomain}
      />
      <ExtendDialog
        open={modal === 'extend'}
        close={() => setModal('')}
        domain={selDomain}
      />
    </Box>
  );
};

export default Profile;
