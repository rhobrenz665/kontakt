import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

import Alert from '@material-ui/lab/Alert';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <Alert key={alert.id} severity={alert.type} style={{ marginTop: '1rem' }}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
