import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  })

  const toast = useToast()
  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Éxito',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
    setNewProduct({
      name: '',
      price: '',
      description: '',
      image: ''
    })
  }
  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Crear un nuevo producto
        </Heading>

        <Box w={'full'} bg={useColorModeValue('white', 'gray.700')} p={6} rounded={'lg'} shadow={'md'}>
          <VStack spacing={4}>
            <Input
              placeholder='Nombre del Producto'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Precio'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='URL de la imagen'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Agregar Producto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage;