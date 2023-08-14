import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { blog8, searchImage } from '../../utils/images';
import { useEffect, useState } from 'react';

import Container from 'components/Container';
import MetaTags from 'react-meta-tags';
import htmlparser from 'react-html-parser';
import { useTheme } from '../../contexts/theme';
import useTitle from 'hooks/useTitle';
import useWindowDimensions from '../../hooks/useDimension';

const BlogCard = ({ img, title, content, date, sx, theme, ...other }) => {
  const { width } = useWindowDimensions();
  const height = Math.floor((width / 1326) * 380);
  return (
    <Box
      sx={{
        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        ...sx,
      }}
      py={{
        sm: '20px',
        xs: '10px',
      }}
      {...other}
    >
      <Box py={'20px'}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            fontSize={{
              md: '48px',
              sm: '32px',
              xs: '24px',
            }}
            sx={{
              fontWeight: '700',
              color: theme === 'dark-theme' ? 'white' : '#121212',
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            fontSize={{
              sm: '21px',
              xs: '14px',
            }}
            sx={{
              fontWeight: '700',
              color: theme === 'dark-theme' ? 'white' : '#282828',
              marginTop: 'auto',
            }}
          >
            {date}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: `${height}px`,
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: '10px',
            background:
              'linear-gradient(87.95deg, #4BD8D8 -3.28%, #146EB4 106.25%)',
            marginTop: '20px',
            marginRight: '20px',
            height: `${height - 20}px`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% - 10px)',
              borderRadius: '6px',
              background: theme === 'dark-theme' ? '#2A2A2A' : 'white',
              height: `${height - 30}px`,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            height: `${height - 20}px`,
            left: '20px',
            top: '0px',
            width: 'calc(100% - 20px)',
            borderRadius: '10px',
            backgroundSize: 'cover',
            backgroundImage: `url(${img})`,
          }}
        ></Box>
      </Box>

      <Box mt={'20px'}>
        <Typography
          fontSize={{
            sm: '21px',
            xs: '14px',
          }}
          sx={{
            fontWeight: '500',
            color: theme === 'dark-theme' ? 'white' : '#000000',
          }}
        >
          {htmlparser(content)}
        </Typography>
      </Box>
    </Box>
  );
};

const demo = {
  title: 'Domain Labs: Making Blockchain Domains Easy for Everyone',
  content: `Welcome to Domain Labs, your one-stop-shop for exploring the exciting world of blockchain domains. We're here to simplify and enhance your digital experiences, giving you a new way to interact with the online world. Our mission is simple but ambitious. Just as GoDaddy transformed the traditional internet domain landscape, we aim to revolutionize blockchain domains, focusing on .eth and .bnb domains.
    <br/><br/>
    In the midst of an extraordinary digital transformation, the shift from Web2 to Web3 represents not just an upgrade, but a power revolution - one moving from centralized authorities back into the hands of individual users. This shift is something we eagerly embrace and champion.
    <br/><br/>
    Blockchain domains, in particular .eth and .bnb domains governed by Ethereum Name Service (ENS) and Binance Smart Chain's SpaceID, are key drivers of this transformation. We're proud to be part of this movement and eager to navigate the road ahead.
    <br/><br/>
    These blockchain domains are more than digital addresses. They are the means for managing your digital identity in a decentralized way, marking a substantial shift in our digital interactions. They help to foster user privacy and control.
    <br/><br/>
    At Domain Labs, we’re not just observers of this revolution; we are active participants and facilitators. Our aim is to make this exciting new wave of decentralized digital domains accessible and easy to use for everyone. We've built a platform that simplifies the process of finding, registering, and managing .eth and .bnb domains.
    <br/><br/>
    To further support our users, we've developed Clio, a state-of-the-art AI assistant integrated into our platform. Powered by the innovative technology from OpenAI, Clio provides personalized domain recommendations based on your preferences, making your domain search not just efficient, but also intuitive and tailored to your needs.
    <br/><br/>
    Beyond our technological pursuits, we envision Domain Labs as a community builder. We are striving to cultivate a community that values decentralization, user control, and secure digital identities.
    <br/><br/>
    Imagine using your .eth or .bnb domain to sign into your social media accounts, access your bank, verify your digital ID, or even log into your gaming account. The potential uses of these domains are vast and exciting, spanning various facets of our digital lives. They introduce a new level of convenience, control, and security.
    <br/><br/>
    What we're talking about here is not just a minor upgrade, but a seismic shift in how we interact with the digital world. .eth and .bnb domains, enabled by ENS and SpaceID, are not just creating this shift; they're the foundation for a new digital world where our identities are secure, decentralized, and under our control.
    <br/><br/>
    Our goal at Domain Labs is to facilitate your journey into this new world. We are dedicated to making .eth and .bnb domains easily accessible to everyone. As we continue to navigate this thrilling journey, we warmly invite you to join our community and embrace this new digital era with us.
    <br/><br/>
    The digital world's future is decentralized, and the power to shape it is now within your grasp. Together, we can redefine our online experiences and shape the Internet of the future. Welcome to the future. Welcome to Domain Labs.`,
  date: '22/06/2023',
};

const Blog = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [isProcessing, setIsProcessing] = useState(false);

  useTitle('Domain Labs - Blog');
  useEffect(() => {}, [width]);

  return (
    <Container>
      <Box
        sx={{
          px: '40px',
        }}
      >
        <Box
          display={{ xs: 'block', sm: 'flex' }}
          alignItems={'center'}
          justifyContent={'center'}
          pt={4}
        >
          <Box
            position={{
              xs: 'relative',
              sm: 'absolute',
            }}
            left={{
              sm: '40px',
            }}
            textAlign={{
              xs: 'center',
              sm: 'center',
            }}
          >
            <Typography
              fontSize={{
                sm: '32px',
                xs: '24px',
              }}
              fontWeight={700}
              sx={{
                fontFamily: 'Inter',
                fontWeight: '600',
                color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
                lineHeight: '48px',
                letterSpacing: '-0.01rem',
              }}
            >
              Blog
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={'100%'}
          >
            <Box
              width={{ xs: '100%', sm: '50%' }}
              sx={{
                maxWidth: '960px',
                display: 'flex',
                backgroundColor: '#F7F7F7',
                height: '42px',
                alignItems: 'center',
                justify: 'center',
                paddingLeft: '24px',
                paddingRight: '10px',
                borderRadius: '16px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              <TextField
                placeholder={'Search for Blog'}
                InputProps={{
                  border: 'none',
                  disableUnderline: true,
                  color: '#4BD8D8 !important',
                }}
                style={{
                  width: '100%',
                }}
                disabled={isProcessing}
                variant="standard"
              />

              <Button
                style={{
                  minWidth: '40px',
                }}
              >
                <Box display={{ xs: 'flex', sm: 'none' }} alignItems={'center'}>
                  {isProcessing ? (
                    <CircularProgress size={16} />
                  ) : (
                    <img
                      style={{ width: '16px', height: '16px' }}
                      src={searchImage}
                      alt="searchImage"
                    />
                  )}
                </Box>
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
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            marginTop: '20px',
            fontWeight: 700,
            color: theme === 'dark-theme' ? 'white' : '#282828',
            fontSize: '21px',
          }}
        >
          Category
        </Typography>
        <BlogCard
          img={blog8}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          theme={theme}
        />
      </Box>
    </Container>
  );
};

export default Blog;
