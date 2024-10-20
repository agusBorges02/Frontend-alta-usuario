import React, { useState, useEffect } from 'react';
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import { Button, TextField, Typography, Paper, Modal, Box, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, IconButton, Avatar } from '@mui/material';
import Lottie from 'lottie-react';
import './UserForm.css';
import successAnimation from '../../animations/tick_animation.json';  
import { useLocation, useNavigate } from 'react-router-dom';  // Importar useLocation para idToken y useNavigate para logout
import LogoutIcon from '@mui/icons-material/Logout';  // Ícono de logout
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  // Ícono de cuenta/usuario
import axios from 'axios';  // Para hacer la solicitud HTTP

const UserForm = () => {
  const [name, setName] = useState('');
  const [vector, setVector] = useState(null);  // Aquí se almacena el vector generado
  const [email, setEmail] = useState('');  // Estado para el email generado
  const [selectedCameras, setSelectedCameras] = useState([]);  // Estado para las cámaras seleccionadas (ahora múltiples)
  const [open, setOpen] = useState(false);  // Estado para controlar el modal
  const location = useLocation();
  const navigate = useNavigate();  // Hook para logout

  const { idToken, fullName } = location.state || { fullName: 'Usuario' };  // Extraer el idToken y el nombre completo del estado

  // Lista hardcodeada de cámaras
  const cameraOptions = [
    { id: '1', name: 'Cámara 1 - Entrada Principal' },
    { id: '2', name: 'Cámara 2 - Pasillo' },
    { id: '3', name: 'Cámara 3 - Patio' },
  ];

  // Función para generar un email automáticamente basado en el nombre
  const generateEmail = (name) => {
    const randomSuffix = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
    const emailName = name ? name.toLowerCase().replace(/\s+/g, '.') : 'user';  // Convierte el nombre a minúsculas y reemplaza espacios por puntos
    return `${emailName}${randomSuffix}@domain.com`;  // Email generado
  };

  // useEffect para generar un email automáticamente cada vez que se renderiza la pantalla
  useEffect(() => {
    const newEmail = generateEmail(name);
    setEmail(newEmail);
  }, [name]);  // Se ejecuta cada vez que cambia el nombre

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && vector && selectedCameras.length > 0) {  // Verificar que al menos una cámara esté seleccionada
      // Preparar el payload para enviar al API Gateway
      const payload = {
        fullName: name,
        email: email,  // Usamos el email autogenerado
        vector: vector,  // El vector de 128 dimensiones
        cameras: selectedCameras  // Las cámaras seleccionadas
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
      alert('Por favor ingresa un nombre, selecciona al menos una cámara y captura una foto.');
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCameras(event.target.value);  // Actualiza el estado con las cámaras seleccionadas
  };

  const handleLogout = () => {
    localStorage.removeItem('idToken');  // Elimina el idToken del almacenamiento local
    navigate('/login');  // Redirige al usuario a la página de login
  };

  const handleClose = () => setOpen(false);  // Cierra el modal

  return (
    <div className="user-form-container">
      {/* Barra superior con icono de usuario y nombre */}
      <div className="header">
        <div className="user-info">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h6" className="user-name">{fullName}</Typography>
        </div>

        {/* Botón de logout con ícono */}
        <IconButton 
          color="secondary" 
          onClick={handleLogout} 
          className="logout-button"
          title="Cerrar sesión"
        >
          <LogoutIcon />
        </IconButton>
      </div>

      <Paper className="user-form-paper" elevation={10} sx={{ borderRadius: '16px'}}>
        <Typography variant="h4" className="user-form-title">Alta de Usuarios</Typography>

        <form onSubmit={handleSubmit} className="user-form" sx={{ borderRadius: '16px'}}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="user-form-input"
          />

          {/* Dropdown para seleccionar múltiples cámaras */}
          <FormControl fullWidth className="user-form-input">
            <InputLabel id="camera-select-label">Seleccionar Cámara(s)</InputLabel>
            <br />
            <Select
              labelId="camera-select-label"
              multiple  // Permite la selección múltiple
              value={selectedCameras}
              onChange={handleCameraChange}
              renderValue={(selected) => selected.join(', ')}  // Mostrar las cámaras seleccionadas
            >
              {cameraOptions.map((camera) => (
                <MenuItem key={camera.id} value={camera.name}>
                  <Checkbox checked={selectedCameras.indexOf(camera.name) > -1} />
                  <ListItemText primary={camera.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
