import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import CreatePage from './pages/CreatePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const location = useLocation();
  // Ocultar la Navbar en las páginas de login y registro
  const noNavbarRoutes = ['/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <Box
      minH={'100vh'}
      bg={useColorModeValue('gray.100', 'gray.800')}
      boxShadow={'md'}
      mb={4}
    >
      {showNavbar && <Navbar />}
      <Routes>
        {/* Rutas protegidas: solo accesibles si el usuario está logueado */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Box>
  );
}

export default App;
