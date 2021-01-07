import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    fontSize: 13,
  },
  card: {
    height: '100%',
    width: '100%',
  },
  grid: {
    width: '100%',
    margin: '0px',
  },
  avatar: {
    backgroundColor: '',
  },
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    marginRight: '1rem',
  },
  icon: {
    marginRight: '5px',
    color: '#80868b',
  },
  cardContent: {
    color: '#202124',
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
    },
  },
  cardHeader: {
    backgroundColor: '#F0F0F0',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
    },
  },
}));

const badge = type => {
  const color = type === 'personal' ? '#3498db' : '#2c3e50';
  return {
    boxSizing: 'borderBox',
    display: 'inlineBlock',
    backgroundColor: color,
    color: '#fff',
    borderRadius: '3rem',
    textAlign: 'center',
    fontSize: '8px',
    fontWeight: '500',
    padding: '6px 9px',
    lineHeight: 'inherit',
    letterSpacing: '2px',
  };
};

const ContactItem = ({ contact, handleClickOpen }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <div style={{ marginBottom: '1rem', marginTop: '-.5rem' }}>
            <span style={badge(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
          {phone && (
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.wrapIcon}
              component="p"
            >
              <CallIcon className={classes.icon} /> {phone}
            </Typography>
          )}
          {email && (
            <Typography
              gutterBottom
              className={classes.wrapIcon}
              variant="subtitle2"
              component="p"
            >
              <EmailIcon className={classes.icon} /> {email}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            onClick={() => {
              setCurrent(contact);
              handleClickOpen();
            }}
            size="small"
            color="primary"
            variant="contained"
          >
            Edit
          </Button>

          <Button
            onClick={onDelete}
            size="small"
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
