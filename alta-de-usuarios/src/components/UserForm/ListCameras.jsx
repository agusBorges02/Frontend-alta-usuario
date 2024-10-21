import React, { useEffect } from 'react';
import axios from 'axios';

const ListCameras = ({ idToken, onCameraSelect }) => {
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get('https://cl4m9j0opk.execute-api.us-east-1.amazonaws.com/TestAPI/listarCamaras', {
          headers: {
            Authorization: idToken,
          },
        });

        const parsedBody = JSON.parse(response.data.body);

        if (Array.isArray(parsedBody)) {
          onCameraSelect(parsedBody);  // Pasamos las cámaras al componente padre
        }
      } catch (error) {
        console.error('Error al obtener cámaras:', error);
      }
    };

    fetchCameras();
  }, [idToken, onCameraSelect]);

  return null;  // No necesitamos renderizar nada en este componente
};

export default ListCameras;
