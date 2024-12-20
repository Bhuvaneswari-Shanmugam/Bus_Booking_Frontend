import React from 'react';

const Form = ({ className, children, onSubmit, submitText }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}

    </form>
  );
};

export default Form;