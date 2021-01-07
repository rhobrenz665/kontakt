import React, { useState } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <div>
        <ContactForm open={open} handleClose={handleClose} />
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
