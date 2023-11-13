import React from 'react';
import Button from '@mui/material/Button';

const ButtonCustom = ({ label, color, variant, onClick }) => {
  return (
    <Button variant={variant || 'contained'} color={color || 'primary'} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ButtonCustom
