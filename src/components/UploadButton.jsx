import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px', 
  },
  input: {
    display: 'none',
  },
  button: {
    margin: '8px', 
  },
};

const UploadButtons = () => {
  return (
    <div style={styles.root}>
      <input
        accept="image/*"
        style={styles.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Adjuntar Correos
        </Button>
        <Button
          variant="contained"
          color="default"
          style={styles.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      <input accept="image/*" style={styles.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}

export default UploadButtons;
