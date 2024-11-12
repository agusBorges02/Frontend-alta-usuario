import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Modal, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, IconButton, Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import ListCameras from './ListCameras';  // Importar el componente de cámaras
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import './UserForm.css';
import Lottie from 'lottie-react';
import successAnimation from '../../animations/tick_animation.json';  

const UserForm = () => {
  const [name, setName] = useState('');
  const [vector, setVector] = useState(null);
  const [email, setEmail] = useState('');
  const [selectedCameras, setSelectedCameras] = useState([]);  // Mantiene las cámaras seleccionadas
  const [availableCameras, setAvailableCameras] = useState([]);  // Almacena las cámaras disponibles
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const idToken = location.state?.idToken || localStorage.getItem('idToken');
  const fullName = location.state?.fullName || 'admin_user';

  // Verificación de idToken para la autenticación
  useEffect(() => {
    if (!idToken) {
      navigate('/login');
    }
  }, [idToken, navigate]);

  // Generación automática de email basado en el nombre
  const generateEmail = (name) => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    const emailName = name ? name.toLowerCase().replace(/\s+/g, '.') : 'user';
    return `${emailName}${randomSuffix}@domain.com`;
  };

  useEffect(() => {
    const newEmail = generateEmail(name);
    setEmail(newEmail);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && vector && selectedCameras.length > 0) {
      const payload = {
        fullName: name,
        email: email,
        vector: vector,
        cameras: selectedCameras
      };

      console.log(payload)

      try {
        const response = await axios.post('https://access-control-api.grupo.2024.umlabs.link/altaUsuario', payload, {
          headers: {
            Authorization: idToken,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setOpen(true);
        }
      } catch (error) {
        console.log('Error al hacer la solicitud:', error);
      }
    } else {
      alert('Por favor ingresa un nombre, selecciona al menos una cámara y captura una foto.');
    }
  };

  // Actualización de cámaras seleccionadas
  const handleCameraChange = (event) => {
    setSelectedCameras(event.target.value);
  };

  // Manejo del cierre del modal
  const handleClose = () => setOpen(false);

  return (
    <div className="user-form-container">
  <div className="header">
    <div className="user-info">
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Typography variant="h6">{fullName}</Typography>
    </div>
    <IconButton className="logout-button" onClick={() => {
      localStorage.removeItem('idToken');
      navigate('/login');
    }}>
      <LogoutIcon />
    </IconButton>
  </div>

  <Paper elevation={10} className="user-form-paper" sx={{borderRadius: '10px'}}>
    <Typography variant="h4" gutterBottom>Alta de Usuarios</Typography>

    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <FormControl fullWidth>
        <InputLabel id="camera-select-label">Seleccionar Cámara(s)</InputLabel>
        <Select
          labelId="camera-select-label"
          label="Seleccionar Cámara(s)"
          multiple
          value={selectedCameras}
          onChange={handleCameraChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableCameras.map((camera) => (
            <MenuItem key={camera.thingName} value={camera.thingName}>
              <Checkbox checked={selectedCameras.indexOf(camera.thingName) > -1} />
              <ListItemText primary={camera.thingName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <WebcamCapture setVector={setVector} />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Registrar Usuario
      </Button>
    </form>
  </Paper>

  <Modal open={open} onClose={handleClose}>
    <Box className="modal-box">
    <Lottie animationData={successAnimation} loop={false} className="success-animation" />
      <Typography variant="h5">¡Usuario registrado exitosamente!</Typography>
      <Button onClick={handleClose} variant="contained" color="primary">
        Cerrar
      </Button>
    </Box>
  </Modal>

  <ListCameras idToken={idToken} onCameraSelect={setAvailableCameras} />
</div>

  );
};

export default UserForm;
