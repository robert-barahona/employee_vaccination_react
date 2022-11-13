export type TPattern = keyof typeof patternErrors;

export const patternErrors = {
  'letters': 'No se permiten números ni caracteres especiales',
  'numbers': 'Solo se permiten números',
  'ten-digits': 'Se require 10 dígitos enteros',
  'email': 'Correo no válido',
}