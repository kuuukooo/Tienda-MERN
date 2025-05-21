import { Button, Container, Flex, HStack, Text, useColorMode, Stack, Box, IconButton } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { FaCartArrowDown } from "react-icons/fa";
import { useDisclosure, Badge } from "@chakra-ui/react";
import { useCartStore } from "../store/cart";
import { Cart } from "./Cart.jsx";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          xs: 'row',
          sm: 'row',
          md: 'row'
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, #a8d655, #70c055)"
          bgClip={"text"}
        >
          <Link to={"/"}>
            🛒
          </Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <PlusSquareIcon fontSize={20}></PlusSquareIcon>
            </Button>
          </Link>

          <Box position="relative">
            <Button
              onClick={onOpen}
            >
              <FaCartArrowDown size={20} />
            </Button>
            {itemCount > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                borderRadius="full"
                bg="red.500"
                color="white"
              >
                {itemCount}
              </Badge>
            )}
          </Box>

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size={'20'} />}
          </Button>
        </HStack>
      </Flex>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Navbar
