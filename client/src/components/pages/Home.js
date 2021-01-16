import React, { useState, useContext } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactContext from '../../context/contact/contactContext';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Home = () => {
  const contactContext = useContext(ContactContext);
  const { clearCurrent } = contactContext;
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    clearCurrent();
  };

  const classes = useStyles();

  return (
    <div>
      <div>
        <ContactForm open={openForm} handleClose={handleClose} />
      </div>
      <div>{<Contacts handleClickOpen={handleClickOpen} />}</div>
      <div>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Home;
