import React from 'react';

const Button = ({ children, onClick, className ,type, style}) => {
  return (
    <button onClick={onClick} className={className} type={type} style={style}>
      {children}
    </button>
  );
};


export default Button;