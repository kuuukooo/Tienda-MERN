// src/components/CheckoutForm.jsx
import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { departamentosPY } from "../utilities/departments";
import { validateCheckout } from "../utilities/validators";

const CheckoutForm = ({ onConfirm, onCancel }) => {
  const [form, setForm] = useState({
    ci: "",
    telefono: "",
    nombres: "",
    apellidos: "",
    departamento: "",
    ciudad: "",
    direccion: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    const errs = validateCheckout(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onConfirm(form);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.ci}>
        <FormLabel>CI / RUC</FormLabel>
        <Input value={form.ci} onChange={handleChange("ci")} />
        <FormErrorMessage>{errors.ci}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.telefono}>
        <FormLabel>Teléfono</FormLabel>
        <Input value={form.telefono} onChange={handleChange("telefono")} />
        <FormErrorMessage>{errors.telefono}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.nombres}>
        <FormLabel>Nombres</FormLabel>
        <Input value={form.nombres} onChange={handleChange("nombres")} />
        <FormErrorMessage>{errors.nombres}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.apellidos}>
        <FormLabel>Apellidos</FormLabel>
        <Input value={form.apellidos} onChange={handleChange("apellidos")} />
        <FormErrorMessage>{errors.apellidos}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.departamento}>
        <FormLabel>Departamento</FormLabel>
        <Select
          placeholder="Selecciona..."
          value={form.departamento}
          onChange={handleChange("departamento")}
        >
          {departamentosPY.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.departamento}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.ciudad}>
        <FormLabel>Ciudad</FormLabel>
        <Input value={form.ciudad} onChange={handleChange("ciudad")} />
        <FormErrorMessage>{errors.ciudad}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.direccion}>
        <FormLabel>Dirección</FormLabel>
        <Input value={form.direccion} onChange={handleChange("direccion")} />
        <FormErrorMessage>{errors.direccion}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Confirmar Datos
      </Button>
      <Button variant="ghost" onClick={onCancel}>
        Volver al carrito
      </Button>
    </VStack>
  );
};

export default CheckoutForm;
