import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import MuiAlert from '@mui/material/Alert';
import twitterImage from "../../assets/image/Twitter-icon-circle-logo-WHITE 1.png";
import linkedin from "../../assets/image/linkedin.png";
import mail from "../../assets/image/mail.png";
import docImage from "../../assets/image/icons8-ethereum-name-service-64-2 1.png"
import ecoImage from "../../assets/image/add_chart.png"
import discussImage from "../../assets/image/hub.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Footer() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Box px={2} py={5} sx={{
      background: 'linear-gradient(180deg, #146EB4 -8.71%, #000000 166.67%)'
    }}>

      <Box display="flex" justifyContent="space-between" >
        <Box
          display="flex"
          flexDirection={'column'}
        >
          <Typography
            color="white"
            sx={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '22px',
              padding: '20px',
              cursor: 'pointer'
            }}
          >
            Terms of Service
          </Typography>
          <Typography
            color="white"
            sx={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '22px',
              padding: '20px',
              cursor: 'pointer'


            }}
          >
            Contacts
          </Typography>
          <Typography
            color="white"
            sx={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '22px',
              padding: '20px',
              cursor: 'pointer'


            }}
          >
            FAQs
          </Typography>
          <Typography
            color="white"
            sx={{
              fontFamily: 'Inter',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '22px',
              padding: '20px',
              cursor: 'pointer'


            }}
          >
            Domain labs all rights reserved 2022
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent={'flex-end'}
          flexDirection={'column'}
          alignItems={'end'}
        >
          <Box
            display="flex"
            justifyContent={'center'}
            gap={'27px'}
            alignItems={'center'}
            width={'100%'}
          >
            <a href="https://docs.ens.domains" style={{ cursor: 'pointer' }} target="blank">
              <img src={docImage} width={'32px'} height={'32px'} />
            </a>
            <a href="https://dune.com/makoto/ens" style={{ cursor: 'pointer' }} target="blank">
              <img src={ecoImage} width={'24px'} height={'24px'} />
            </a>
            <a href="https://discuss.ens.domains" style={{ cursor: 'pointer' }} target="blank">
              <img src={discussImage} width={'32px'} height={'30.67px'} />
            </a>
          </Box>
          <Typography
            color="white"
            sx={{
              marginTop: '16px',
              fontSize: '18px',
              fontWeight: '900',
              lineHeight: '22px'
            }}
          >
            Web 3 links & Resources
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent={'flex-end'}
          alignItems={'end'}

        >
          <Box
            textAlign={'right'}
          >
            <Typography
              color="white"
              sx={{
                fontSize: '18px',
                fontWeight: '900',
                lineHeight: '22px'
              }}
            >
              Keep up with conversation
            </Typography>
            <a
              href="https://twitter.com/domain_labs/status/1580022791067533312?s=46&t=H4ch0l4nzGEEWYSxh2SPjw"
              style={{
                cursor: 'pointer'
              }}
              target="blank"
            >
              <img
                src={twitterImage}
                style={{
                  marginTop: '22px'
                }}
              />
            </a>

          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Email address copied
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Footer;
