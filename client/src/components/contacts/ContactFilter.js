import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

import InputBase from '@material-ui/core/InputBase';

const ContactFilter = props => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <InputBase
        inputRef={text}
        type="text"
        placeholder={props.placeholder}
        onChange={onChange}
        classes={props.classes}
        inputProps={props.inputProps}
      />
    </form>
  );
};

export default ContactFilter;
