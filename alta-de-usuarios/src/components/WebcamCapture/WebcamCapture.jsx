import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Typography, Paper } from '@mui/material';
import './WebcamCapture.css';

const WebcamCapture = ({ setPhoto }) => {
  const webcamRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setIsCaptured(true);
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
        >
          {isCaptured ? 'Foto Capturada' : 'Capturar Foto'}
        </Button>
      </Paper>
    </div>
  );
};

export default WebcamCapture;
