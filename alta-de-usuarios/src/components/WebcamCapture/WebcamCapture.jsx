import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import './WebcamCapture.css';

const WebcamCapture = ({ setVector }) => {
  const webcamRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [loading, setLoading] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsCaptured(true);
    sendPhotoToServer(imageSrc);  // Enviar la foto al servidor local
  };

  const sendPhotoToServer = async (image) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/process_image', {
        image: image.split(',')[1],  // Solo la parte base64 de la imagen
      });

      if (response.data && response.data.vector) {
        const vector = response.data.vector;
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
