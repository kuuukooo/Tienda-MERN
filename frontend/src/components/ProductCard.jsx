import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaShoppingBag } from "react-icons/fa";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { useCartStore } from "../store/cart";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgCard = useColorModeValue('gray.100', 'gray.700')

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Exito",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      removeFromCart(pid);
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Exito",
        description: "Producto editado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgCard}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ₲{(product.price.toLocaleString("es-PY"))}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            bgColor={'#8BC34A'}
            _hover={{ bg: '#5e9a4a' }}
            color={'black'}
          />
          <IconButton
            icon={<FaShoppingBag />}
            onClick={() => addToCart(product)}
            aria-label="Añadir al carrito"
            bgColor={'#4C6EF5'}
            _hover={{ bg: '#2b6cb0' }}
            color={'black'}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            bgColor={'#E53E3E'}
            _hover={{ bg: '#c53030' }}
            color={'black'}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Editar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={'#70c055'} _hover={{ bg: "#5e9a4a" }}
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Editar
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ProductCard;