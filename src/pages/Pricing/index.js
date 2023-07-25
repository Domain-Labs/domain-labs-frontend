import './index.scss';

import { Box, Button, Typography } from '@mui/material';

import { BASE_API_URL } from '../../config';
import { LoadingButton } from '@mui/lab';
import MetaTags from 'react-meta-tags';
import Toggle from 'react-toggle';
import axios from 'axios';
import { blueCheckIcon } from '../../utils/images';
import { subscribe } from '../../utils/Clio';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { useDapp } from '../../contexts/dapp';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '../../contexts/theme';

const Pricing = () => {
  const { theme } = useTheme();
  const { address } = useAccount();
  const [isProcessing, setIsProcessing] = useState('');
  const [isAnnualPay, setIsAnnualPay] = useState(false);
  const [isAlreadySignedUp, setIsAlreadySignedUp] = useState(false);
  const { provider, signer, networkId, isConnected } = useDapp();
  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };

  const pros = [
    'Algorithmic Accuracy',
    'Time-Saving solution',
    'Instant AI Domain Recomendation',
  ];

  const freeVersionDetails = [
    '3 Free Searches',
    '30 Character Limit Per Search',
  ];

  const paidVersionDetails = [
    'AI Domain Recommendations',
    'Unlimited Searches',
    'Algorithmic AI accuracy',
    '10x Domain Portfolio Value',
    'Domain Labs NFT Badge',
  ];

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    (async () => {
      // check if signed up
      let isAlreadySignedUp = false;
      const res = await axios.post(`${BASE_API_URL}/getIsSubscribe`, {
        address: address.toLowerCase(),
      });
      isAlreadySignedUp = res.data.subscribed;
      console.log('is signed up: ', isAlreadySignedUp);
      if (isAlreadySignedUp) {
        setIsAlreadySignedUp(isAlreadySignedUp);
      }
    })();
  }, [address, isConnected]);

  const handleFreeSignUp = async () => {
    if (!isConnected) {
      toast.error('Connect your wallet to proceed!');
      return;
    }
    const postObject = {
      address: address.toLowerCase(),
      endTime:
        Date.now() +
        (isAnnualPay ? 365 * 24 * 3600 * 1000 : 30 * 24 * 3600 * 1000),
      trial: true,
    };
    console.log('okay free sign up');
    setIsProcessing('free');
    try {
      const result = (await axios.post(`${BASE_API_URL}/subscribe`, postObject))
        .data;
      console.log('result: ', result);
      toast.success('Success! Your Clio subscription is active');
      setIsAlreadySignedUp(true);
    } catch (error) {
      console.log(error);
      toast.error('Failed to sign up');
    }
    setIsProcessing('');
  };

  const handleSecureSignUp = async () => {
    if (!isConnected) {
      toast.error('Connect your wallet to proceed!');
      return;
    }
    if (networkId !== 56) {
      toast.warn('Please change your network to BSC');
      return;
    }

    const postObject = {
      address: address.toLowerCase(),
      endTime:
        Date.now() +
        (isAnnualPay ? 365 * 24 * 3600 * 1000 : 30 * 24 * 3600 * 1000),
    };
    setIsProcessing('secure');
    const rlt = await subscribe(isAnnualPay, provider, signer);
    try {
      if (rlt) {
        const result = (
          await axios.post(`${BASE_API_URL}/subscribe`, postObject)
        ).data;
        console.log(result);
        setIsAlreadySignedUp(true);
        toast.success('Success! Your Clio subscription is active');
      } else {
        toast.error('Failed to sign up, try again!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to sign up, try again!');
    }
    setIsProcessing('');
  };

  return (
    <Box style={styles.container}>
      <MetaTags>
        <title>Clio Pricing - AI Domain Recommendations, ENS, BNB</title>
        <meta
          name="og:description"
          content="Discover your perfect domain with AI Domain Recommendations. Unlimited searches provide you with algorithmic AI accuracy, helping you find valuable domains"
        />
        <meta
          name="description"
          content="Discover your perfect domain with AI Domain Recommendations. Unlimited searches provide you with algorithmic AI accuracy, helping you find valuable domains"
        />
      </MetaTags>

      <Box mt={'90px'} pt={'60px'}>
        <Typography
          display={'flex'}
          justifyContent={'center'}
          textAlign={'center'}
          mt={'16px'}
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '40px',
            lineHeight: '48px',
            letterSpacing: '-0.01em',
            color: theme === 'dark-theme' ? 'white' : 'black',
          }}
        >
          Clio: AI Domain Search Price
        </Typography>

        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          p={'57px 20px'}
          className="pros-component"
        >
          <Box
            display="flex"
            justifyContent={'start'}
            alignItems={'center'}
            gap={'60px'}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {pros.map((item, index) => (
              <Box
                display="flex"
                justifyContent={'start'}
                alignItems={'center'}
                gap={'12px'}
                width={'100%'}
                key={index}
              >
                <img src={blueCheckIcon} alt="check" />
                <Typography
                  display={'flex'}
                  justifyContent={'left'}
                  textAlign={'start'}
                  width={{ xs: 'unset', md: 'max-content' }}
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '20px',
                    lineHeight: '24px',
                    letterSpacing: '-0.01em',
                    color: theme === 'dark-theme' ? 'white' : '#5B5B5B',
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'baseline'}
          p={'57px 20px'}
          gap={'42px'}
          className="buy-option-component"
        >
          <Box>
            <Typography
              display={'flex'}
              textAlign={'start'}
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '22px',
                letterSpacing: '-0.01em',
                color: theme === 'dark-theme' ? 'white' : '#5B5B5B',
              }}
            >
              Billed Yearly
            </Typography>
            <Typography
              display={'flex'}
              textAlign={'start'}
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '10px',
                lineHeight: '12px',
                letterSpacing: '-0.01em',
                color: theme === 'dark-theme' ? 'white' : '#5B5B5B',
              }}
            >
              Get 3 Months Free*
            </Typography>
          </Box>

          <Box
            sx={{
              transform: 'rotate(180deg)',
            }}
            alignItems="center"
            display={'flex'}
            className="buy-option-toggle-wrapper"
            pb={'5px'}
          >
            <Toggle
              defaultChecked={isAnnualPay}
              icons={false}
              onChange={() => setIsAnnualPay(!isAnnualPay)}
              sx={{
                color: '#D9D9D9',
                width: '39px',
                height: '20px',
              }}
            />
          </Box>

          <Box>
            <Typography
              display={'flex'}
              textAlign={'start'}
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '22px',
                letterSpacing: '-0.01em',
                color: theme === 'dark-theme' ? 'white' : '#5B5B5B',
              }}
            >
              Billed Monthly
            </Typography>
          </Box>
        </Box>

        <Box
          className="payment-plans-component"
          display={'flex'}
          justifyContent={'center'}
          pb={'20px'}
        >
          <Box
            gap={{ xs: '20px', md: '72px' }}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box
              className="free-version"
              width={'341px'}
              height={'490px'}
              sx={{
                background: '#EEEEEE',
                borderRadius: '40px',
              }}
            >
              <Typography
                display={'flex'}
                justifyContent={'center'}
                pt={'41px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '800',
                  fontSize: '24px',
                  lineHeight: '29px',
                  letterSpacing: '-0.01em',
                  color: 'black',
                }}
              >
                Free
              </Typography>

              <Typography
                display={'flex'}
                justifyContent={'center'}
                mt={'41px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '800',
                  fontSize: '72px',
                  lineHeight: '87px',
                  letterSpacing: '-0.01em',
                  color: 'black',
                }}
              >
                $0
              </Typography>

              <Typography
                display={'flex'}
                justifyContent={'center'}
                mt={'9px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '17px',
                  letterSpacing: '-0.01em',
                  color: '#9B9B9B',
                }}
              >
                Per user, per month
              </Typography>

              {freeVersionDetails.map((item, index) => (
                <Typography
                  display={'flex'}
                  justifyContent={'center'}
                  mt={'31px'}
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '-0.01em',
                    color: '#626262',
                  }}
                  key={index}
                >
                  {item}
                </Typography>
              ))}

              <Box display={'flex'} justifyContent={'center'} mt={'90px'}>
                <LoadingButton
                  display={'flex'}
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '-0.01em',
                    padding: '10px 56.5px',
                    marginTop: '9px',
                    marginBottom: '26px',
                    border: '3px solid #0E4F81',
                    color: '#626262',
                  }}
                  onClick={() => handleFreeSignUp()}
                  disabled={isAlreadySignedUp}
                  loading={isProcessing === 'free'}
                >
                  Free Sign-up
                </LoadingButton>
              </Box>
            </Box>

            <Box
              className="paid-version"
              width={'341px'}
              height={'490px'}
              sx={{
                background: '#0E4F81',
                borderRadius: '40px',
              }}
            >
              <Typography
                display={'flex'}
                justifyContent={'center'}
                pt={'41px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '800',
                  fontSize: '24px',
                  lineHeight: '29px',
                  letterSpacing: '-0.01em',
                  color: 'white',
                }}
              >
                Premium
              </Typography>

              <Typography
                display={'flex'}
                justifyContent={'center'}
                mt={'41px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '800',
                  fontSize: '72px',
                  lineHeight: '87px',
                  letterSpacing: '-0.01em',
                  color: 'white',
                }}
              >
                {isAnnualPay ? '$350' : '$39'}
              </Typography>

              <Typography
                display={'flex'}
                justifyContent={'center'}
                mt={'9px'}
                mb={'26px'}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '17px',
                  letterSpacing: '-0.01em',
                  color: '#C5C5C5',
                }}
              >
                Per user, per {isAnnualPay ? 'year' : 'month'}
              </Typography>

              {paidVersionDetails.map((item, index) => (
                <Typography
                  display={'flex'}
                  justifyContent={'center'}
                  mt={'11px'}
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '-0.01em',
                    color: 'white',
                  }}
                  key={index}
                >
                  {item}
                </Typography>
              ))}

              <Box display={'flex'} justifyContent={'center'} mt={'25px'}>
                <LoadingButton
                  display={'flex'}
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '-0.01em',
                    color: 'white',
                    padding: '10px 56.5px',
                    marginTop: '9px',
                    marginBottom: '26px',
                    border: '3px solid white',
                  }}
                  onClick={() => handleSecureSignUp()}
                  loading={isProcessing === 'secure'}
                >
                  Secure Sign-up
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;
