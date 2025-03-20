import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Productos
        </Text>

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

        <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
            Crear un Producto
          </Text>
        </Link>
      </VStack>
    </Container>
  )
}
