import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Alert, Avatar, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    if (username === 'admin' && password === 'admin') {
      // Autenticación exitosa
      setError('');
      console.log('Inicio de sesión exitoso');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-background">
      <Container maxWidth="xs">
        <Paper className="login-container" elevation={10} sx={{ borderRadius: '16px' }}>
          <div className="login-header">
            <Avatar className="login-avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" className="login-title">Iniciar sesión</Typography>
          </div>

          {error && <Alert severity="error" className="login-error">{error}</Alert>}

          <form onSubmit={handleLogin} className="login-form">
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nombre de Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
            >
              Iniciar Sesión
            </Button>
          </form>

          <Typography variant="body2" className="login-footer">
            <br />
            ¿No tienes una cuenta aún? <a href="/register" className="register-link">Registrarse</a>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
