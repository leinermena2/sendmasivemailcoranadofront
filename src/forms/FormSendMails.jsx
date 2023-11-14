import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { sendMailBulk } from '../service/SendMailService';
import Swal from 'sweetalert2';
import { ExcelIcon } from '../components/Icons';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const FormSendMails = () => {
    const [clienteFile, setClienteFile] = useState(null);
    const [asunto, setAsunto] = useState('');
    const [cuerpoCorreo, setCuerpoCorreo] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleClienteFileChange = (event) => {
        const file = event.target.files[0];
        setClienteFile(file);
    };


    const handleResponse = (response) => {
        if (response.status === 200) {
            Swal.fire('Éxito', response.message, 'success');
        } else {
            Swal.fire('Error', response.message, 'error');
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const confirmResult = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción enviará correos electrónicos. ¿Deseas continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, continuar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmResult.isConfirmed) {
                setLoading(true);

                if (clienteFile) {
                    const clienteFileBase64 = await fileToBase64(clienteFile);
                    let obj = {
                        clienteFile: clienteFileBase64.base64String,
                        asunto,
                        cuerpoCorreo,
                    };

                    const response = await sendMailBulk(obj);
                    
                    {
                        response.status == 200 ? 
                        Swal.fire('!Genial¡', response.message,'success') : 
                        Swal.fire('Error', response.message,'error')
                    }

                    console.log(response);
                    

                } else {
                    Swal.fire('Uppss', 'Recuerda que todos los campos deben estar completos', 'error');

                }
            }
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        } finally {
            setLoading(false);
        }
    };

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve({ name: file.name, base64String });
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    const styleColor = {
        background: '#007245'
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                <Typography variant="h6" component="div" gutterBottom style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} > 
                   Completar todos los campos
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                        <Grid item xs={2}>
                            <label htmlFor="icon-button-file">
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <ExcelIcon />

                                </IconButton>
                                <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                    {selectedFileName ? `Archivo seleccionado: ${selectedFileName}` : ''}
                                </Typography>
                                <input
                                    style={{ display: 'none' }}
                                    id="icon-button-file"
                                    type="file"
                                    onChange={handleClienteFileChange}
                                />
                            </label>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth label="Sujeto del correo" type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextareaAutosize
                                aria-label="Cuerpo del correo"
                                placeholder="Cuerpo del correo"
                                value={cuerpoCorreo}
                                onChange={(e) => setCuerpoCorreo(e.target.value)}
                                style={{
                                    width: '80%',
                                    minHeight: '100px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease-in-out',
                                }}
                                onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
                                onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                            />
                        </Grid>

                        <Grid item xs={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button onClick={handleSubmit} type="button" fullWidth style={styleColor} disabled={loading} variant="contained" color="primary" startIcon={<EmailIcon />}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Correos'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default FormSendMails;
