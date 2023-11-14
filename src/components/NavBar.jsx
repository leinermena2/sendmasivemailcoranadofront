import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar = () => {
 
  const styleColor = {
    background: '#007245'
  }
  
    return (
        <AppBar position="static" style={styleColor}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Envío de Correos Masivos
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar