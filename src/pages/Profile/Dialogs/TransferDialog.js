import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { RxCrossCircled } from 'react-icons/rx';

export default function TransferDialog(props) {
  const { open, close } = props;
  const linearGradient =
    'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)';

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxHeight: 435,
          background: '#2A2A2A',
        },
      }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <RxCrossCircled color={'#4BD8D8'} onClick={close} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            color={'white'}
            sx={{
              fontSize: '20px',
              fontWeight: '800',
            }}
          >
            Transfer Domains
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}
        >
          Approve
        </Typography>
        <Typography
          sx={{ color: 'white', wordBreak: 'break-all', fontSize: '14px' }}
        >
          Contract approval allows the contract to perform transfering of
          domains on your behalf
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '16px',
          }}
        >
          Domainlabs Marketplace:
        </Typography>
        <TextField
          required
          variant="filled"
          sx={{
            width: '100%',
            marginTop: '10px',
            '& input': {
              padding: '10px 16px !important',
              fontSize: '16px',
              fontFamily: 'Inter',
              color: 'white',
            },
            backgroundColor: '#AAA',
            border: 'none',
            color: 'white',
          }}
          placeholder="0x5F5DD76D380da23CD5B8705852F67dDeb64C977b"
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: '16px 24px',
        }}
      >
        <Button
          autoFocus
          onClick={close}
          sx={{
            background: linearGradient,
            width: '100%',
            color: 'white',
          }}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}
