import 'react-toggle/style.css';

import { Box, Button, Typography } from '@mui/material';
import {
  blackBookmarkImage,
  blackOffshoppingImage,
  blackOnshoppingImage,
  whiteBookmarkImage,
  whiteOffShoppingImage,
} from '../../utils/images';
import {
  bscChainId,
  bscTestnetChainId,
  domainLogoImages,
  domainNames,
  domainSuffixes,
} from '../../config';
import { useEffect, useState } from 'react';

import SearchDetailModal from '../Modal/SearchDetailModal';
import { useNetwork } from 'wagmi';

const SearchResultComponent = (props) => {
  const { chain } = useNetwork();
  const [results] = useState(props.domains);
  const [sale] = useState([]);
  const [isSelectedAll] = useState(false);
  const [domainLogoImage, setDomainLogoImage] = useState('');
  const [searchId, setSearchId] = useState(0);
  const [isOpenSearchDetailModal, setIsOpenSearchDetailModal] = useState(false);

  const addToCart = (id) => {};

  const removeFromCart = (id) => {};

  const onClickToDetail = (id) => {
    if (results[id].status) {
      setSearchId(id);
      setIsOpenSearchDetailModal(true);
    }
  };

  const handleSelectOrDeselectAll = () => {};

  useEffect(() => {
    const chainId =
      chain?.id !== undefined
        ? chain.id
        : process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET === 'mainnet'
        ? bscChainId
        : bscTestnetChainId;
    setDomainLogoImage(domainLogoImages[chainId]);
  }, [chain]);

  return (
    <>
      <Box mt={'60px'} sx={{ flexDirection: 'row' }}>
        {results.length > 0 && (
          <Box display={'flex'} justifyContent={'right'}>
            <Button
              sx={{
                color: 'white',
                px: '20px',
                py: '10px',
                background:
                  'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                borderRadius: '8px',
                width: '150px',
              }}
              onClick={() => handleSelectOrDeselectAll()}
            >
              {!isSelectedAll ? `Select All` : `UnSelect All`}
            </Button>
          </Box>
        )}
        <Box
          sx={{
            marginTop: '20px',
            paddingBottom: '40px',
            gridTemplateColumns: {
              lg: 'repeat(4, 1fr)',
              md: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)',
              xs: 'repeat(1, 1fr)',
            },
          }}
          gap={'20px'}
          display="grid"
        >
          {results?.map((result, id) =>
            sale[id] ? (
              <Box
                key={id}
                sx={{
                  padding: '25px 20px 10px 20px',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '16px',
                  marginBottom: '8px',
                  background:
                    'linear-gradient(79.42deg, #4BD8D8 -28.43%, #146EB4 125.83%)',
                }}
                onClick={() => onClickToDetail(id)}
              >
                <Box
                  justifyContent="center"
                  display="inline-flex"
                  gap={'5px'}
                  alignItems={'center'}
                  textAlign={'left'}
                >
                  <img
                    src={domainLogoImage}
                    width={'21px'}
                    height={'24px'}
                    style={{
                      marginLeft: '5px',
                      cursor: 'pointer',
                    }}
                    alt=""
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
                    {result.name}.{domainSuffixes[chain.id]}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    display="flex"
                    sx={{ width: 1 }}
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ ml: '30px' }}
                      fontSize={{
                        md: '1.3vw',
                        sm: '18px',
                      }}
                      color="white"
                    >
                      {`${domainNames[chain.id]} Domain is available.`}
                    </Typography>
                  </Box>
                </Box>
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
                    src={whiteBookmarkImage}
                    style={{
                      cursor: 'pointer',
                    }}
                    alt=""
                  />
                  <img
                    src={whiteOffShoppingImage}
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFromCart(id)}
                    alt=""
                  />

                  {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                </Box>
              </Box>
            ) : (
              <Box
                key={id}
                sx={{
                  padding: '25px 20px 10px 20px',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '16px',
                  marginBottom: '8px',
                }}
                onClick={() => onClickToDetail(id)}
                backgroundColor={'#D2EBFF'}
              >
                <Box
                  justifyContent="center"
                  display="inline-flex"
                  gap={'5px'}
                  alignItems={'center'}
                  textAlign={'left'}
                >
                  <img
                    src={domainLogoImage}
                    width={'21px'}
                    height={'24px'}
                    style={{ marginLeft: '5px' }}
                    alt="domainLogo"
                  />
                  {result.status ? (
                    <Typography
                      sx={{ opacity: '0.5' }}
                      fontSize={{ md: '1.8vw', sm: '25px' }}
                      fontWeight={'700'}
                      variant="h5"
                    >
                      {result.name}.{domainSuffixes[chain.id]}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ opacity: '1' }}
                      fontSize={{ md: '1.8vw', sm: '25px' }}
                      fontWeight={'700'}
                      variant="h5"
                    >
                      {result.name}.{domainSuffixes[chain.id]}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Box
                    display="flex"
                    sx={{ width: 1 }}
                    justifyContent="space-between"
                  >
                    {result.status ? (
                      <Typography
                        sx={{ ml: '30px' }}
                        fontSize={{ md: '1.3vw', sm: '18px' }}
                        color={'#868686'}
                      >
                        {'This Domain is registered already.'}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ ml: '30px' }}
                        fontSize={{ md: '1.3vw', sm: '18px' }}
                      >
                        {'This Domain is available.'}
                      </Typography>
                    )}
                  </Box>
                </Box>
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
                  {result.status ? (
                    <>
                      <img src={blackBookmarkImage} alt="" />
                      <img src={blackOffshoppingImage} alt="" />
                    </>
                  ) : (
                    <>
                      <img
                        src={blackBookmarkImage}
                        style={{
                          opacity: '0.5',
                          cursor: 'pointer',
                        }}
                        alt=""
                      />
                      <img
                        src={blackOnshoppingImage}
                        style={{
                          opacity: '0.5',
                          cursor: 'pointer',
                        }}
                        alt=""
                        onClick={() => addToCart(id)}
                      />
                    </>
                  )}
                  {/* <img src={theme == 'dark-theme' ? whiteOffShoppingImage: blackOffshoppingImage}/>*/}
                </Box>
              </Box>
            ),
          )}
        </Box>
      </Box>
      <SearchDetailModal
        isOpen={
          isOpenSearchDetailModal && searchId >= 0 && results[searchId].status
        }
        handleClose={() => setIsOpenSearchDetailModal(false)}
        id={searchId}
      />
    </>
  );
};

export default SearchResultComponent;
