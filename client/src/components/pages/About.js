import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const About = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: '2.5rem' }}
        gutterBottom
      >
        About This App
      </Typography>
      <Typography align="center" variant="subtitle2" gutterBottom>
        This is a full stack React app for keeping contacts
      </Typography>
      <Typography align="center" variant="subtitle2" gutterBottom>
        <strong>version: </strong> 1.0.0
      </Typography>
    </Container>
  );
};

export default About;
