import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { createProduct } = useProductStore();

  const validate = () => {
    const errs = {};

    // Nombre ≥ 3
    if (!newProduct.name || newProduct.name.trim().length < 3) {
      errs.name = "El nombre debe tener al menos 3 caracteres";
    }

    // Precio numérico y hasta 8 dígitos
    const priceNum = Number(newProduct.price);
    if (
      !newProduct.price ||
      isNaN(priceNum) ||
      priceNum < 0 ||
      newProduct.price.length > 8
    ) {
      errs.price = "El precio debe ser un número de hasta 8 dígitos";
    }

    // URL válida
    try {
      new URL(newProduct.image);
    } catch {
      errs.image = "Debes ingresar una URL válida";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validate()) {
      // Mostrar toast de error genérico
      toast({
        title: "Error de validación",
        description: "Revisa los campos marcados en rojo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct(newProduct);
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
        title: "Éxito",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // reset form
      setNewProduct({ name: "", price: "", image: "" });
      setErrors({});
    }
  };

  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mt={8}>
          Crear un nuevo producto
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input
                placeholder=""
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                _placeholder={{ color: placeholderColor }}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.price}>
              <FormLabel>Precio</FormLabel>
              <Input
                placeholder=""
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                _placeholder={{ color: placeholderColor }}
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.image}>
              <FormLabel>URL de la imagen</FormLabel>
              <Input
                placeholder=""
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                _placeholder={{ color: placeholderColor }}
              />
              <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>

            <Button
              bgColor="#70c055"
              _hover={{ bg: "#5e9a4a" }}
              onClick={handleAddProduct}
              w="full"
            >
              Agregar Producto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
