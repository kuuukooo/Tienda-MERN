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

const LoginPage = () => {
  const { login, error, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Cuando el usuario se loguea, redirigir a la home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={4} textAlign="center">
        Iniciar Sesión
      </Heading>
      {error && (
        <Text color="red.500" mb={4} textAlign="center">
          {error}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
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
            Entrar
          </Button>

          <Text textAlign="center">
            ¿No tienes cuenta?{' '}
            <Link to="/register">
              <Text as="span" color="blue.400" _hover={{ textDecoration: 'underline' }}>
                Registrarse
              </Text>
            </Link>
          </Text>

          <Link to="/recover">
            <Text as="span" color="blue.400" _hover={{ textDecoration: 'underline' }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Link>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
