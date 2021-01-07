import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@material-ui/core/Typography';

const ContactForm = ({ open, handleClose }) => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
      handleClose();
    } else {
      updateContact(contact);
      handleClose();
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {current ? 'Edit Contact' : 'Add Contact'}
      </DialogTitle>
      <DialogContent>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={onChange}
            type="text"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            type="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            type="number"
          />
          <Typography variant="h6">Contact Type</Typography>
          <FormControlLabel
            value="personal"
            control={
              <Radio
                checked={type === 'personal'}
                // value="personal"
                name="type"
                onChange={onChange}
              />
            }
            label="personal"
          />
          <FormControlLabel
            value="professional"
            control={
              <Radio
                checked={type === 'professional'}
                name="type"
                onChange={onChange}
              />
            }
            label="professional"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          size="small"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={onSubmit}
          variant="contained"
          size="small"
        >
          {current ? 'Update' : 'Add'}
        </Button>
        {current && (
          <Button size="small" onClick={clearAll}>
            Clear
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
