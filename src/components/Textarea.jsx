import React from 'react';
import TextField from '@mui/material/TextField';

const Textarea = ({ label, value, onChange, fullWidth, rows, variant, ...rest }) => {
  return (
    <TextField
      label={label}
      variant={variant || 'outlined'}
      fullWidth={fullWidth || true}
      multiline
      rows={rows || 4}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Textarea;
