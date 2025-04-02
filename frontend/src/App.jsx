import { useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import CreatePage from './pages/CreatePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import useAuth from './hooks/useAuth.jsx'

function App() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.800')} boxShadow='md' mb={4}>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Grupo de rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
        </Route>

        {/* Rutas públicas */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Box>
  );
}

export default App;
