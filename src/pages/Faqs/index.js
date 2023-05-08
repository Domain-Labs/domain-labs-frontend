import {
  Box,
} from "@mui/material";
import { useEffect } from "react";
import FaqsComponent from "../../components/FaqsComponent";
import { useTheme } from "../../contexts/theme";
import './index.scss';

const Faqs = () => {
  const {
    theme,
  } = useTheme();

  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh",
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Box>
      <Box style={styles.container}>
        <Box
          mt={'90px'}
          pt={'60px'}
        >
          <FaqsComponent />
        </Box>
      </Box>
    </Box >
  );
}

export default Faqs;
