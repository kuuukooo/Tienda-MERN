import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons'
import { IoLogOut, IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import useAuthStore from '../store/auth.js'

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          md: 'row'
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Tienda 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>

          {user ? (
            <Link to={'/create'}>
              <Button>
                <PlusSquareIcon fontSize={20}></PlusSquareIcon>
              </Button>
            </Link>
          ) : (
            <></>
          )
          }

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size={'20'} />}
          </Button>

          {user ? (
            // Si el usuario está logueado, muestra el botón para cerrar sesión
            <Button onClick={handleLogout} colorScheme="red">
              <IoLogOut size={'20'} />
            </Button>
          ) : (
            // Si no está logueado, muestra botones para iniciar sesión o registrarse
            <>
              <Link to="/login">
                <Button colorScheme="blue" mr={2}>
                  Iniciar sesión
                </Button>
              </Link>
            </>
          )}

        </HStack>
      </Flex>
    </Container >
  )
}

export default Navbar
