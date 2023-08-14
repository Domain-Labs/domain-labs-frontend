import './index.scss';

import { Box } from '@mui/material';
import Container from 'components/Container';
import Faqs from './Components/Faqs';
import { useEffect } from 'react';
import useTitle from 'hooks/useTitle';

export default function FaqPage() {
  useTitle("FAQ's - Digital Identities, Web3 Domains, Crypto Wallets");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Container>
        <Box mt={'90px'} pt={'60px'}>
          <Faqs />
        </Box>
      </Container>
    </Box>
  );
}
