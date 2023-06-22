import { Box, Grid, Typography } from '@mui/material';
import {
  teamBryan,
  teamBryan_sm,
  teamKrik,
  teamLucas,
  teamLucas_sm,
  teamSebastian,
  teamSunny,
  teamWang,
  utopiaBlack,
  utopiaWhite,
} from '../../utils/images';
import { useEffect, useState } from 'react';

import { useTheme } from '../../contexts/theme';
import useWindowDimensions from '../../hooks/useDimension';

const NameLabel = (props) => {
  return (
    <Box
      sx={{
        marginTop: 'auto',
        marginLeft: '10px',
        marginBottom: '10px',
      }}
    >
      <Box
        fontSize={{
          md: '36px',
          xs: '24px',
        }}
        sx={{
          fontFamily: 'Inter',
          color: 'white',
          textTransform: 'uppercase',
        }}
      >
        {props.name}
      </Box>
      <Box
        fontSize={{
          md: '20px',
          xs: '16px',
        }}
        sx={{
          fontFamily: 'Inter',
          color: 'white',
        }}
      >
        {props.job}
      </Box>
    </Box>
  );
};
const Team = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [iDimens, setIDimens] = useState({});

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
    const itemWidth =
      width > 900 ? Math.floor((width - 600) / 3) : Math.floor(width - 200);
    const itemLgHeight =
      width > 900
        ? Math.floor((itemWidth / 325) * 539)
        : Math.floor((itemWidth / 325) * 261);
    const itemHeight =
      width > 900 ? Math.floor(itemLgHeight / 2 - 10) : itemLgHeight;
    console.log(itemWidth, itemHeight, itemLgHeight);
    setIDimens({
      itemWidth,
      itemHeight,
      itemLgHeight,
    });
  }, [width]);

  return (
    <Box
      style={styles.container}
      sx={{
        marginTop: '100px',
        backgroundColor: theme === 'night' ? '#2A2A2A' : 'white',
        minHeight: 'calc(100vh - 328px)',
      }}
    >
      <Box
        display={{ xs: 'block', sm: 'flex' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        pt={4}
        px={'40px'}
      >
        <Box
          alignItems={'center'}
          textAlign={{
            md: 'left',
            xs: 'center',
          }}
        >
          <Typography
            fontSize={{
              md: '32px',
              sm: '24px',
              xs: '18px',
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
            Domain Labs Dream Team
          </Typography>
          <Typography
            fontSize={{
              md: '18px',
              sm: '16px',
              xs: '14px',
            }}
            fontWeight={400}
            sx={{
              fontFamily: 'Inter',
              color: theme === 'dark-theme' ? 'white' : '#2A2A2A',
              lineHeight: '32px',
              letterSpacing: '-0.01rem',
            }}
          >
            Meet AI WatchDogs: Cyber Guardians of Domain Labs
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          marginTop: '20px',
          px: '30px',
        }}
      >
        <Grid item md={3} xs={12} justifyItems={'center'}>
          <Box
            sx={{
              backgroundImage: `url(${width > 900 ? teamBryan : teamBryan_sm})`,
              height: `${iDimens.itemLgHeight}px`,
              width: `${iDimens.itemWidth}px`,
              backgroundSize: 'cover',
              marginY: '10px',
              marginX: 'auto',
              borderRadius: '10px',
              display: 'flex',
            }}
          >
            <NameLabel name={'Bryan'} job={'Founder'} />
          </Box>
        </Grid>
        <Grid item md={3} xs={12} marginX={'auto'}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <Box
              sx={{
                backgroundImage: `url(${teamWang})`,
                height: `${iDimens.itemHeight}px`,
                width: `${iDimens.itemWidth}px`,
                backgroundSize: 'cover',
                marginY: '10px',
                marginX: 'auto',
                borderRadius: '10px',
                display: 'flex',
              }}
            >
              <NameLabel
                name={'Wang'}
                job={
                  <>
                    Sr.Blockchain
                    <br /> Developer
                  </>
                }
              />
            </Box>
            <Box
              sx={{
                backgroundImage: `url(${teamSebastian})`,
                height: `${iDimens.itemHeight}px`,
                width: `${iDimens.itemWidth}px`,
                backgroundSize: 'cover',
                marginY: '10px',
                marginX: 'auto',
                borderRadius: '10px',
                display: 'flex',
              }}
            >
              <NameLabel
                name={'Sebas'}
                job={
                  <>
                    Lead Product
                    <br />
                    Designer
                  </>
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} xs={12} marginX={'auto'}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <Box
              sx={{
                backgroundImage: `url(${teamSunny})`,
                height: `${iDimens.itemHeight}px`,
                width: `${iDimens.itemWidth}px`,
                backgroundSize: 'cover',
                marginY: '10px',
                marginX: 'auto',
                borderRadius: '10px',
                display: 'flex',
              }}
            >
              <NameLabel
                name={'Sunny'}
                job={
                  <>
                    Sr.Blockchain
                    <br /> Developer
                  </>
                }
              />
            </Box>
            <Box
              sx={{
                backgroundImage: `url(${teamKrik})`,
                height: `${iDimens.itemHeight}px`,
                width: `${iDimens.itemWidth}px`,
                backgroundSize: 'cover',
                marginY: '10px',
                marginX: 'auto',
                borderRadius: '10px',
                display: 'flex',
              }}
            >
              <NameLabel
                name={'Krick'}
                job={
                  <>
                    Community
                    <br />
                    Manager
                  </>
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} xs={12} marginX={'auto'}>
          <Box
            sx={{
              backgroundImage: `url(${width > 900 ? teamLucas : teamLucas_sm})`,
              height: `${iDimens.itemLgHeight}px`,
              width: `${iDimens.itemWidth}px`,
              backgroundSize: 'cover',
              marginY: '10px',
              marginX: 'auto',
              borderRadius: '10px',
              display: 'flex',
            }}
          >
            <NameLabel
              name={'Lucas'}
              job={
                <>
                  Sr.Blockchain
                  <br /> Developer
                </>
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: 'solid 2px',
            color: '#B4B4B4',
            textDecoration: 'none',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          component={'a'}
          href="https://www.utopia513.com/"
          target="blank"
        >
          Partnership:{' '}
          <img
            src={theme === 'dark-theme' ? utopiaWhite : utopiaBlack}
            height={'26px'}
            alt="utopia"
          />
          3D Graphics Studio
        </Typography>
      </Box>
    </Box>
  );
};

export default Team;
