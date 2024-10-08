import React, { useState } from 'react';
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import { Button, TextField, Typography, Paper, Modal, Box } from '@mui/material';
import Lottie from 'lottie-react';
import './UserForm.css';
import successAnimation from '../../animations/tick_animation.json';  
import { useLocation, useNavigate } from 'react-router-dom';  // Importar useLocation para idToken y useNavigate para logout
import axios from 'axios';  // Para hacer la solicitud HTTP

const UserForm = () => {
  const [name, setName] = useState('');
  const [vector, setVector] = useState(null);  // Aquí se almacena el vector generado
  const [open, setOpen] = useState(false);  // Estado para controlar el modal
  const location = useLocation();
  const navigate = useNavigate();  // Hook para logout

  const { idToken } = location.state || {};  // Extraer el idToken del estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && vector) {
      // Preparar el payload para enviar al API Gateway
      const payload = {
        fullName: name,
        email: 'example@domain1.com',  // Hardcodeado, puedes cambiarlo si lo deseas
        vector: vector  // El vector de 128 dimensiones
      };
  
      try {
        // Enviar los datos al endpoint de API Gateway con el token JWT en el encabezado
        const response = await axios.post('https://cl4m9j0opk.execute-api.us-east-1.amazonaws.com/TestAPI/altausuario', payload, {
          headers: {
            Authorization: idToken,  // No incluir 'Access-Control-Allow-Origin' aquí
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Respuesta del servidor:', response.status, response.data);
        if (response.status === 200) {
          // Si la respuesta es exitosa, muestra el modal de éxito
          setOpen(true);
        } else {
          console.log(`Error al enviar datos: ${response.status}, ${response.data}`);
        }
      } catch (error) {
        console.log('Error al hacer la solicitud:', error);
      }
    } else {
      alert('Por favor ingresa un nombre y captura una foto.');
    }
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem('idToken');  // Elimina el idToken del almacenamiento local
    navigate('/login');  // Redirige al usuario a la página de login
  };

  const handleClose = () => setOpen(false);  // Cierra el modal

  return (
    <div className="user-form-container">
      {/* Botón de logout */}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout} 
        className="logout-button"
      >
        Logout
      </Button>

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
          
          {/* Aquí va la captura de la webcam */}
          <WebcamCapture setVector={setVector} />  {/* Ahora pasamos setVector */}

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

      {/* Modal con la animación de éxito */}
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
