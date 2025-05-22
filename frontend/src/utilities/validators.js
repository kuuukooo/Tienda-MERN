/**
 * Valida los datos del checkout.
 * @param {{ci:string, telefono:string, nombres:string, apellidos:string,
 *   departamento:string, ciudad:string, direccion:string}} data
 * @returns {Record<string,string>} un objeto { campo: mensajeError }
 */
export function validateCheckout(data) {
  const errs = {};

  // CI/RUC
  if (!data.ci?.trim()) {
    errs.ci = "CI/RUC es obligatorio";
  }

  // Teléfono: solo dígitos, 7–15 caracteres
  if (!data.telefono?.trim()) {
    errs.telefono = "Teléfono es obligatorio";
  } else if (!/^\d+$/.test(data.telefono)) {
    errs.telefono = "Solo dígitos";
  } else if (data.telefono.length < 7 || data.telefono.length > 15) {
    errs.telefono = "Debe tener entre 7 y 15 dígitos";
  }

  // Nombres y apellidos: mínimo 2 caracteres
  if (!data.nombres?.trim() || data.nombres.trim().length < 2) {
    errs.nombres = "Mínimo 2 caracteres";
  }
  if (!data.apellidos?.trim() || data.apellidos.trim().length < 2) {
    errs.apellidos = "Mínimo 2 caracteres";
  }

  // Departamento
  if (!data.departamento) {
    errs.departamento = "Selecciona un departamento";
  }

  // Ciudad
  if (!data.ciudad?.trim()) {
    errs.ciudad = "Ciudad es obligatorio";
  }

  // Dirección
  if (!data.direccion?.trim()) {
    errs.direccion = "Dirección es obligatoria";
  }

  return errs;
}
