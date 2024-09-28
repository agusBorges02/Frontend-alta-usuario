import React, { useState } from 'react';
import WebcamCapture from '../WebcamCapture/WebcamCapture';

const UserForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && photo) {
      // Aquí puedes hacer el POST a la API para guardar en la base de datos
      console.log('Nombre:', name);
      console.log('Foto:', photo);
    } else {
      alert('Por favor ingresa un nombre y captura una foto.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Alta de Usuarios</h1>
      <label>
        Nombre:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
      </label>
      <WebcamCapture setPhoto={setPhoto} />
      <button type="submit">Registrar Usuario</button>
    </form>
  );
};

export default UserForm;
