import { Container, SimpleGrid, Text, VStack, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx'

export const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  console.log(products)
  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Productos
        </Heading>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products?.length > 0 ? (
            products.map((product) =>
              product ? <ProductCard key={product._id} product={product} /> : null
            )
          ) : (
            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No se encontró ningún producto. 😿
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
