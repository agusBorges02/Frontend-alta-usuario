import React, { useState } from 'react';
import { Button, TextField, Typography, Alert, Avatar, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Register.css';  // Archivo CSS para los estilos

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setSuccess('');
      return;
    }

    // Verificar que todos los campos estén completos
    if (!email || !username || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      setSuccess('');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al backend
    console.log('Correo:', email);
    console.log('Nombre de Usuario:', username);
    console.log('Contraseña:', password);

    setError('');
    setSuccess('Usuario registrado exitosamente');
  };

  return (
    <div className="register-background">
      <Container maxWidth="xs">
        <Paper className="register-container" elevation={10} sx={{ borderRadius: '16px' }}>
          <div className="register-header">
            <Avatar className="register-avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" className="register-title">Registrar Usuario</Typography>
          </div>

          {error && <Alert severity="error" className="register-error">{error}</Alert>}
          {success && <Alert severity="success" className="register-success">{success}</Alert>}

          <form onSubmit={handleRegister} className="register-form">
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nombre de Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="register-button"
            >
              Registrar Usuario
            </Button>
          </form>

          <Typography variant="body2" className="register-footer">
            <br />
            ¿Ya tienes una cuenta? <a href="/login" className="register-link">Iniciar sesión</a>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
