import React from 'react';
import TextField from '@mui/material/TextField';

const Inputs = ({ label, type, variant, fullWidth, ...rest }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant={variant || 'standard'} 
      fullWidth={fullWidth || false} 
      {...rest}
    />
  );
};

export default Inputs;
