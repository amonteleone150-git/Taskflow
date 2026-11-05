const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return "Inserisci la tua email.";
  }

  if (!emailPattern.test(email.trim())) {
    return "Inserisci un indirizzo email valido.";
  }

  return undefined;
}

export type LoginFields = {
  email: string;
  password: string;
};

export function validateLogin(fields: LoginFields): Record<string, string> {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  if (!fields.password) {
    errors.password = "Inserisci la tua password.";
  }

  return errors;
}

export type RegistrationFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function validateRegistration(
  fields: RegistrationFields,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Inserisci il tuo nome (almeno 2 caratteri).";
  }

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  if (fields.password.length < 8) {
    errors.password = "La password deve contenere almeno 8 caratteri.";
  } else if (fields.password.length > 128) {
    errors.password = "La password non può superare 128 caratteri.";
  }

  if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Le password non coincidono.";
  }

  return errors;
}
