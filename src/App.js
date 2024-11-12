import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm/UserForm';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/Protection/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Proteger la ruta de UserForm */}
          <Route 
            path="/user-form" 
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
