import {
  Box,
} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDappContext } from "./utils/context";

const Layout = ({ children }) => {
  const { theme, } = useDappContext();

  return (
    <>
      <Header />
      <Box
        className="main-component"
        style={{
          backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
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
