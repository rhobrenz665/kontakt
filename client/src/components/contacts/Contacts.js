import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Contacts = ({ handleClickOpen }) => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <Typography variant="h6" align="center" style={{ marginTop: '2rem' }}>
        Please add a contact!
      </Typography>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="h4" align="center" style={{ margin: '2rem' }}>
          My Contacts
        </Typography>
        {contacts !== null && !loading ? (
          <Grid container direction="column" spacing={2}>
            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                <Grid container spacing={4}>
                  {filtered !== null
                    ? filtered.map(contact => (
                        <ContactItem
                          key={contact._id}
                          contact={contact}
                          handleClickOpen={handleClickOpen}
                        />
                      ))
                    : contacts.map(contact => (
                        <ContactItem
                          key={contact._id}
                          contact={contact}
                          handleClickOpen={handleClickOpen}
                        />
                      ))}
                </Grid>
              </Grid>
              <Grid item xs={false} sm={2} />
            </Grid>
          </Grid>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
};

export default Contacts;
