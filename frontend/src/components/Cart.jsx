import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  Box,
  Center,
  Heading,
  Skeleton,
  useBreakpointValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from "../store/cart";
import { useState, useEffect } from "react";

export const Cart = ({ isOpen, onClose }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Simular loading para Skeleton
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  // Full screen en móviles
  const drawerSize = useBreakpointValue({ base: "full", md: "md" });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={drawerSize}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color={textColor}>Tu Carrito</DrawerHeader>
        <DrawerBody>
          {isLoading ? (
            <VStack spacing={4}>
              <Skeleton height="20px" width="80%" />
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="90%" />
            </VStack>
          ) : items.length === 0 ? (
            <Box height="full" w="full">
              <Center h="full" flexDir="column" color={textColor} px={4}>
                <Icon as={FaCartShopping} boxSize="3rem" mb={4} />
                <Heading size="lg" mb={2} textAlign="center">
                  Tu carrito se encuentra vacío.
                </Heading>
                <Text mb={4} textAlign="center">
                  Por favor, añade un producto.
                </Text>
              </Center>
            </Box>
          ) : (
            <VStack spacing={4} align="stretch">
              {items.map(({ product, quantity }) => (
                <Box
                  key={product._id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <HStack justify="space-between">
                    <Text flex="1">{product.name}</Text>

                    <NumberInput
                      size="sm"
                      maxW="80px"
                      value={quantity}
                      min={1}
                      onChange={(_, val) => updateQuantity(product._id, val)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Text>₲{(product.price * quantity).toLocaleString("es-PY")}</Text>

                    <IconButton
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => removeFromCart(product._id)}
                      aria-label="Eliminar"
                    />
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {!isLoading && items.length > 0 && (
          <DrawerFooter flexDir="column">
            <Text fontWeight="bold" mb={2}>
              Total: ₲{(total).toLocaleString("es-PY")}
            </Text>
            <Button w="full" mb={2} onClick={() => {/* checkout */ }}>
              Checkout
            </Button>
            <Button variant="outline" w="full" onClick={clearCart}>
              Vaciar Carrito
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
