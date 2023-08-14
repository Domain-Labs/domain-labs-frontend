import { Box } from '@mui/material';
import { useTheme } from 'contexts/theme';

const Container = ({ children }) => {
  const { bgColor } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        marginTop: '100px',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
