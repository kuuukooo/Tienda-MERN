import {
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Icon,
  Text,
  Center,
} from '@chakra-ui/react'
import { HiColorSwatch } from 'react-icons/hi'
import { useEffect } from 'react'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx'

export const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Productos
        </Heading>

        {products?.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Center py={20} flexDir="column" color="gray.500">
            <Icon as={HiColorSwatch} boxSize="3rem" mb={4} />
            <Heading size="lg" mb={2}>
              No se encontró ningún producto
            </Heading>
            <Text mb={4}>
              Por favor, crea un producto.
            </Text>
          </Center>
        )}
      </VStack>
    </Container>
  )
}
