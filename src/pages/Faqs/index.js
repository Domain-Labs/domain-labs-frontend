import './index.scss';

import { Box } from '@mui/material';
import FaqsComponent from '../../components/FaqsComponent';
import { Helmet } from 'react-helmet';
import MetaTags from 'react-meta-tags';
import { useEffect } from 'react';
import { useTheme } from '../../contexts/theme';

const Faqs = () => {
  const { theme } = useTheme();

  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <MetaTags>
        <title>FAQ's - Digital Identities, Web3 Domains, Crypto Wallets</title>
        <meta
          name="description"
          content="Get answers to your FAQs about digital identities, Web3 domains, and crypto wallets. Empower yourself with knowledge and make informed decisions."
        />
        <meta
          name="og:description"
          content="Get answers to your FAQs about digital identities, Web3 domains, and crypto wallets. Empower yourself with knowledge and make informed decisions."
        />
      </MetaTags>
      <Box style={styles.container}>
        <Box mt={'90px'} pt={'60px'}>
          <FaqsComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default Faqs;
