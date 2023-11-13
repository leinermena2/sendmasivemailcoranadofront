import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { sendMailBulk } from '../service/SendMailService';
import Swal from 'sweetalert2';

const FormSendMails = () => {
    const [clienteFile, setClienteFile] = useState(null);
    const [asunto, setAsunto] = useState('');
    const [cuerpoCorreo, setCuerpoCorreo] = useState('');
    const [adjuntos, setAdjuntos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleClienteFileChange = (event) => {
        const file = event.target.files[0];
        setClienteFile(file);
    };

    const handleAdjuntosChange = async (event) => {
        const files = event.target.files;
        const fileList = [];
    
        for (let i = 0; i < files.length; i++) {
            const fileObject = await fileToBase64(files[i]);
            fileList.push(fileObject);
        }
    
        setAdjuntos(fileList);
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
                   
                    if (adjuntos.length > 0) {
                        const adjuntosBase64Array = await Promise.all(
                            adjuntos.map(async (adjunto) => ({
                                name: adjunto.name,
                                content: adjunto.base64String,
                            }))
                        );

                        let obj = {
                            clienteFile: clienteFileBase64.base64String,
                            asunto,
                            cuerpoCorreo,
                            adjuntos: adjuntosBase64Array,
                        };
                        const sendResponse = await sendMailBulk(obj);
                        handleResponse(sendResponse);
                    } else {
                        Swal.fire('Uppss', 'Recuerda seleccionar los documentos adjuntos', 'info');
                        return;
                    }
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
    

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Enviar Correos
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <label htmlFor="icon-button-file">
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <CloudUploadIcon fontSize="large" />
                                </IconButton>
                                <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                    {selectedFileName ? `Archivo seleccionado: ${selectedFileName}` : 'Adjuntar lista de clientes'}
                                </Typography>
                                <input
                                    style={{ display: 'none' }}
                                    id="icon-button-file"
                                    type="file"
                                    onChange={handleClienteFileChange}
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Sujeto del correo" type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                aria-label="Cuerpo del correo"
                                placeholder="Cuerpo del correo"
                                value={cuerpoCorreo}
                                onChange={(e) => setCuerpoCorreo(e.target.value)}
                                style={{ width: '100%', minHeight: '100px', padding: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label htmlFor="icon-button-adjuntos">
                                <input
                                    style={{ display: 'none' }}
                                    id="icon-button-adjuntos"
                                    type="file"
                                    onChange={handleAdjuntosChange}
                                    multiple
                                />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <InsertDriveFileIcon fontSize="large" />
                                </IconButton>
                                <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
                                    Seleccionar archivos adjuntos
                                </Typography>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" startIcon={<SendIcon />}>
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
