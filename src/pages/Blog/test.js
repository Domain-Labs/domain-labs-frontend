import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import {
  blog1,
  blog2,
  blog3,
  blog4,
  blog5,
  blog6,
  searchImage,
} from '../../utils/images';
import { useEffect, useState } from 'react';

import MetaTags from 'react-meta-tags';
import { useTheme } from '../../contexts/theme';
import useWindowDimensions from '../../hooks/useDimension';

const BlogCard = ({ img, title, content, date, size, sx, ...other }) => {
  return (
    <Box
      sx={{
        borderRadius: '23px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        ...sx,
      }}
      my={{
        sm: '0',
        xs: '20px',
      }}
      {...other}
    >
      <MetaTags>
        <title>Domain Labs - Blogs</title>
      </MetaTags>
      <img width={'100%'} alt="blog" src={img} />
      <Box p={'10px'} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: size === 'md' ? '32px' : '21px',
              fontWeight: '700',
              color: '#505050',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: size === 'md' ? '21px' : '14px',
              fontWeight: '700',
              color: '#505050',
            }}
          >
            {date}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: size === 'md' ? '21px' : '14px',
              fontWeight: '700',
              color: '#767676',
            }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const demo = {
  title: 'Blog Post Title',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
  date: '22/06/2023',
};

const Blog = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [isProcessing, setIsProcessing] = useState(false);

  const styles = {
    container: {
      backgroundColor: theme === 'dark-theme' ? '#2A2A2A' : 'white',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
  };

  useEffect(() => {}, [width]);

  return (
    <Box
      style={styles.container}
      sx={{
        marginTop: '100px',
        backgroundColor: theme === 'night' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
      px={'40px'}
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
      <Box
        display={{
          sm: 'grid',
          xs: 'block',
        }}
        sx={{
          my: '30px',
          gap: 2,
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4)',
        }}
      >
        <BlogCard
          img={blog1}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          size={width > 599 ? 'md' : 'sm'}
          sx={{
            gridColumn: '1 / 3',
            gridRow: '1 / 3',
          }}
        />
        <BlogCard
          img={blog2}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          sx={{
            gridColumn: '3',
            gridRow: '1',
          }}
        />
        <BlogCard
          img={blog3}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          sx={{
            gridColumn: '4 / 5',
            gridRow: '1',
          }}
        />
        <BlogCard
          img={blog4}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          sx={{
            gridColumn: '1',
            gridRow: '3',
          }}
        />
        <BlogCard
          img={blog5}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          sx={{
            gridColumn: '2',
            gridRow: '3',
          }}
        />
        <BlogCard
          img={blog6}
          title={demo.title}
          content={demo.content}
          date={demo.date}
          size={width > 599 ? 'md' : 'sm'}
          sx={{
            gridColumn: '3 / 5',
            gridRow: '2 / 4',
          }}
        />
      </Box>
    </Box>
  );
};

export default Blog;
