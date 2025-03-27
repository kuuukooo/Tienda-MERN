import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.js';

const RegisterPage = () => {
  const { register, error, user } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Si el usuario ya está logueado, redirigirlo (puedes ajustar la ruta)
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} bg={useColorModeValue('white', 'gray.700')} borderRadius="md" boxShadow="md">
      <Heading mb={4} textAlign="center">
        Registrarse
      </Heading>
      {error && (
        <Text color="red.500" mb={4} textAlign="center">
          {error}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full">
            Registrarse
          </Button>
          <Text textAlign="center">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login">
              <Text as="span" color="blue.400" _hover={{ textDecoration: 'underline' }}>
                Iniciar sesión
              </Text>
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterPage;
