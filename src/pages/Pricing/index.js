import { useEffect, } from 'react';
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Toggle from "react-toggle";
import './index.scss';
import { useDappContext } from "../../utils/context";
import { blueCheckIcon } from "../../utils/images";
import { useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { toast } from 'react-toastify';
import ClioSubscriptionModal from '../../components/Modal/ClioSubscriptionModal';

const Pricing = () => {
  const {
    theme,
  } = useDappContext();
  const { address, } = useAccount();
  const [isAlreadySignedUp, setIsAlreadySignedUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    container: {
      backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh",
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
    (async () => {
      // check if signed up
      const isAlreadySignedUp = (await axios.get(`/clios/is-signedUp/${address}`)).data;
      console.log("is signed up: ", isAlreadySignedUp);
      if (isAlreadySignedUp) {
        setIsAlreadySignedUp(isAlreadySignedUp);
      }
    })()
  }, [])

  const handleFreeSignUp = async () => {
    const postObject = {
      wallet: address,
    }
    console.log("okay free sign up");

    const result = (await axios.post(`/clios/free-signup/`, postObject)).data;
    console.log("result: ", result);
    toast.success('You have successfully signed up for free');
    setIsAlreadySignedUp(true);
  }

  const handleSecureSignUp = async () => {
    setIsOpen(true);
  }

  

  return (
    <Box style={styles.container}>
      <Box
        mt={'90px'}
        pt={'60px'}
      >
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
            color: theme == 'dark-theme' ? 'white' : 'black',
          }}
        >
          Clio: AI Domain Search Price
        </Typography>

        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          p={'57px 20px'}
          className='pros-component'
        >
          <Box
            display="flex"
            justifyContent={'start'}
            alignItems={'center'}
            gap={'60px'}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {
              pros.map((item, index) => (
                <Box
                  display="flex"
                  justifyContent={'start'}
                  alignItems={'center'}
                  gap={'12px'}
                  width={'100%'}
                  key={index}
                >
                  < img
                    src={blueCheckIcon}
                  />
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
                      color: theme == 'dark-theme' ? 'white' : '#5B5B5B',
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))
            }
          </Box>
        </Box>

        <Box
          className="payment-plans-component"
          display={'flex'}
          justifyContent={'center'}
          pt={'50px'}
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

              {
                freeVersionDetails.map((item, index) => (
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
                ))
              }

              <Box
                display={'flex'}
                justifyContent={'center'}
                mt={'90px'}
              >
                <Button
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
                    border: '3px solid #0E4F81',
                    color: '#626262',
                  }}
                  onClick={() => handleFreeSignUp()}
                  disabled={isAlreadySignedUp}
                >
                  Free Sign-up
                </Button >
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
                $39
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
                Per user, per month
              </Typography>

              {
                paidVersionDetails.map((item, index) => (
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
                ))
              }

              <Box
                display={'flex'}
                justifyContent={'center'}
                mt={'25px'}
              >
                <Button
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
                >
                  Secure Sign-up
                </Button >
              </Box>
            </Box>
          </Box>

          <ClioSubscriptionModal
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
          />

        </Box>
      </Box>
    </Box >
  );
}

export default Pricing;
