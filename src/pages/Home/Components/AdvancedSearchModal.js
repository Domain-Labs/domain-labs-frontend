import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { cancelImage } from 'utils/images';
import { setSearchList } from 'redux/actions/domainActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdvancedSearchModal(props) {
  const [open, setOpen] = React.useState(false);
  const [row, setRows] = React.useState(0);
  const [names, setNames] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const keyDown = (e) => {
    if (e.key === 'Enter') {
      const temp = row + 1;
      setRows(temp);
    }
  };

  const change = (e) => {
    setNames(e.target.value.split('\n'));
  };

  const advancedSearch = () => {
    if (names.length > 0) {
      const searchList = names.map((searchStr) => {
        let searchBuf = searchStr.toLowerCase();
        const parts = searchBuf.split('.');
        if (
          parts[parts.length - 1] === 'eth' ||
          parts[parts.length - 1] === 'bnb'
        ) {
          parts.splice(parts.length - 1, 1);
          searchBuf = parts.join('.');
        }
        return searchBuf;
      });
      dispatch(setSearchList(searchList));
      navigate('/search-result');
    }
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  return (
    <Dialog
      disableScrollLock
      open={open}
      color="primary"
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '.MuiPaper-root': {
          width: '80%',
          maxWidth: '579px',
          color: 'white',
          background: '#353535',
          borderRadius: '20px',
        },
        '.MuiDialogContentText-root': {
          color: 'white',
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontWeight: '600',
          fontSize: '28px',
          lineHeight: '39px',
        }}
      >
        {'Advanced Search'}
      </DialogTitle>

      <img
        src={cancelImage}
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          right: '30px',
          top: '18px',
          cursor: 'pointer',
        }}
        onClick={props.handleClose}
        alt="cancel"
      />

      <DialogContent
        sx={{
          paddingBottom: '12px',
        }}
      >
        <DialogContentText id="alert-dialog-description">
          search from 1 up to 1000 at once
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter names to search"
          type="email"
          fullWidth
          variant="standard"
          multiline
          rows={10}
          onKeyDown={keyDown}
          onChange={change}
        />
      </DialogContent>
      <DialogActions>
        <Button
          position={'absolute'}
          sx={{
            background:
              'linear-gradient(86.23deg, #4BD8D8 -48.31%, #146EB4 114.96%)',
            width: '100px',
            height: '31px',
            marginRight: '28px',
            textTransform: 'capitalize',
            color: 'white',
            borderRadius: '12px',
          }}
          onClick={advancedSearch}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdvancedSearchModal;
