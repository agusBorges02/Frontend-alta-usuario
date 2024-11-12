import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Paper } from '@mui/material';
import axios from 'axios';
import './WebcamCapture.css';
import { useLocation, useNavigate } from 'react-router-dom';

const WebcamCapture = ({ setVector }) => {
  const webcamRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const idToken = location.state?.idToken || localStorage.getItem('idToken');

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsCaptured(true);
    sendPhotoToServer(imageSrc);  // Enviar la foto al servidor local
  };

  const sendPhotoToServer = async (image) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://access-control-api.grupo.2024.umlabs.link/apprunner',
        {
          image: image.split(',')[1],  // Only the base64 part of the image
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,  // Include the idToken in the Authorization header
          },
        }
      );
      console.log(response)

      if (response.data && response.data.vectors) {
        const vector = response.data.vectors[0];
        setVector(vector);  // Enviar el vector de vuelta al componente padre
        console.log(vector)
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al enviar la imagen al servidor local:", error);
      setLoading(false);
    }
  };

  return (
    <div className="webcam-capture-container">
      <Paper className="webcam-paper" elevation={3}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam-view"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: 'grey', color: 'white' }}
          onClick={capturePhoto}
          className="capture-button"
          disabled={loading}
        >
          {isCaptured ? (loading ? 'Procesando...' : 'Foto Capturada') : 'Capturar Foto'}
        </Button>
      </Paper>
    </div>
  );
};

export default WebcamCapture;
