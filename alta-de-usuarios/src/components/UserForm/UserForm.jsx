import React, { useState } from 'react';
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import { Button, TextField, Typography, Paper, Modal, Box } from '@mui/material';
import Lottie from 'lottie-react';
import './UserForm.css';
import successAnimation from '../../animations/tick_animation.json';  

const UserForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [open, setOpen] = useState(false);  // Estado para controlar el modal

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && photo) {
      // Abrir el modal con la animación de éxito
      setOpen(true);
      // Aquí puedes hacer el POST a la API para guardar en la base de datos
      console.log('Nombre:', name);
      console.log('Foto:', photo);
    } else {
      alert('Por favor ingresa un nombre y captura una foto.');
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="user-form-container">
      <Paper className="user-form-paper" elevation={10} sx={{ borderRadius: '16px'}}>
        <Typography variant="h4" className="user-form-title">Alta de Usuarios</Typography>

        <form onSubmit={handleSubmit} className="user-form">
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="user-form-input"
          />
          
          <WebcamCapture setPhoto={setPhoto} />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="user-form-button"
          >
            Registrar Usuario
          </Button>
        </form>
      </Paper>

      {/* Popup con la animación de éxito */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <Lottie animationData={successAnimation} loop={false} className="success-animation" />
          <Typography variant="h5" className="success-message">¡Usuario registrado exitosamente!</Typography>
          <br />
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            className="close-button"
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserForm;
