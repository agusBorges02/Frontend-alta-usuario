import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import '../WebcamCapture/WebcamCapture.css';

const WebcamCapture = ({ setPhoto }) => {
  const webcamRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setIsCaptured(true);
  };

  return (
    <div className='capturar-foto-container'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button className='boton-capturar-foto' onClick={capturePhoto}>
        {isCaptured ? 'Foto Capturada' : 'Capturar Foto'}
      </button>
    </div>
  );
};

export default WebcamCapture;
