import {
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Icon,
  Text,
  Center,
  Skeleton,
  SkeletonText,
  Box,
} from '@chakra-ui/react'
import { HiColorSwatch } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx'

export const HomePage = () => {
  const { fetchProducts, products } = useProductStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      await fetchProducts()
      setIsLoading(false)
    }
    load()
  }, [fetchProducts])

  const skeletonArray = Array.from({ length: 6 })

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Productos
        </Heading>

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {skeletonArray.map((_, idx) => (
              <Box key={idx} boxShadow="lg" rounded="lg" overflow="hidden">
                <Skeleton height="200px" />
                <Box p={4}>
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : products?.filter(Boolean).length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
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
