import React, { useState } from 'react';
import { Button, TextField, Alert, Avatar, Container, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Login.css';
import axios from 'axios';  // Utiliza axios para hacer solicitudes HTTP
import { useNavigate } from 'react-router-dom';  // Hook for navigation

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const client_id = '4a70rfjfvlhfhc17ra0vfimphb';  // Cognito Client ID
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://cognito-idp.us-east-1.amazonaws.com/', 
        {
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: client_id,
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password
          }
        },
        {
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
          }
        }
      );
      console.log('Respuesta de autenticación:', response.data);
      const idToken = response.data.AuthenticationResult.IdToken;
      setError('');
      // Almacenar el token en localStorage
      localStorage.setItem('idToken', idToken);

      console.log('Autenticación exitosa. Token:', idToken);

      // Navigate to the user form and pass the idToken via state
      navigate('/user-form', { state: { idToken } });  // Send the token to the user-form page

    } catch (err) {
      setError('Usuario o contraseña incorrectos.');
      console.log('Error de autenticación:', err);
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
