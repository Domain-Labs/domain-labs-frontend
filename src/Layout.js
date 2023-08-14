import { Box } from '@mui/material';
import Footer from './components/Footer';
import Header from './components/Header';
import { useTheme } from './contexts/theme';

const Layout = ({ children }) => {
  const { bgColor } = useTheme();

  return (
    <>
      <Header />
      <Box
        className="main-component"
        style={{
          backgroundColor: bgColor,
          minHeight: 'calc(100vh - 302px)',
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
