import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Center,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShippingFast } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const CheckoutComplete = ({ isOpen, onClose }) => {
  const modalBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const { width, height } = useWindowSize();

  if (!isOpen) return null;

  return (
    <>
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay bg="blackAlpha.500" />
        <ModalContent bg={modalBg}>
          <ModalHeader>¡Pedido enviado!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDir="column" py={4}>
              <Text fontSize="lg" mb={4} textAlign="center">
                Tu pedido se ha procesado exitosamente.
              </Text>
              <Icon as={FaShippingFast} boxSize="3rem" color={textColor} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckoutComplete;
