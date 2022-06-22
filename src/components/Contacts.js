import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromPhoneBook, addToPhoneBook } from './actions/actions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  table: {
    maxWidth: '500px',
    height: '400px',
  },
}));

function renderErrorDialog(setShowErrorDialog) {
  return (
    <Dialog open>
      <DialogTitle>Duplicate entry</DialogTitle>
      <DialogContent>This phone number already exists</DialogContent>
      <DialogActions>
        <Button onClick={() => setShowErrorDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function Contacts() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const currentState = useSelector((state) => state);

  const dispatch = useDispatch();

  const phoneNumberExists = () =>
    currentState.find((entry) => entry.phoneNumber === phoneNumber);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  const handleAddToPhonebook = () => {
    if (phoneNumberExists()) {
      setShowErrorDialog(true);
      return;
    }

    dispatch(
      addToPhoneBook({
        firstName,
        lastName,
        phoneNumber,
      })
    );

    resetForm();
  };

  const handleDelContact = (contact) => {
    dispatch(deleteFromPhoneBook(contact));
  };

  return (
    <>
      {showErrorDialog && renderErrorDialog(setShowErrorDialog)}
      <Grid
        container
        justify='center'
        alignItems='center'
        direction='column'
        className={classes.root}
      >
        <TextField
          label='Enter first name'
          value={firstName}
          onChange={(_e) => setFirstName(_e.target.value)}
          inputProps={{ 'data-testid': 'first-name-label' }}
        />
        <TextField
          label='Enter last name'
          value={lastName}
          onChange={(_e) => setLastName(_e.target.value)}
        />
        <TextField
          type='number'
          label='Enter phone number'
          value={phoneNumber}
          onChange={(_e) => setPhoneNumber(_e.target.value)}
          inputProps={{ 'data-testid': 'phone-number-label' }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddToPhonebook}
          disabled={!firstName || !phoneNumber}
          style={{ width: '25ch' }}
        >
          Add to contacts
        </Button>
      </Grid>
      <Divider style={{ marginTop: '50px' }} />

      {
        <Grid
          container
          justify='center'
          alignItems='center'
          direction='column'
          className={classes.root}
        >
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label='phone-book-table' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align='right'>Last name</TableCell>
                  <TableCell align='right'>Phone number</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentState.map((state, i) => (
                  <TableRow key={`${state.phoneNumber}-${i}`}>
                    <TableCell component='th' scope='row'>
                      {state.firstName}
                    </TableCell>
                    <TableCell align='right'>{state.lastName}</TableCell>
                    <TableCell align='right'>{state.phoneNumber}</TableCell>
                    <TableCell align='right'>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => handleDelContact(state)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      }
    </>
  );
}

export default Contacts;
