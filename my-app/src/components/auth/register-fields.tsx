import { TextField } from "@/components/ui/text-field";

type RegisterFieldsProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  errors: Record<string, string>;
  disabled: boolean;
};

export function RegisterFields({
  name,
  email,
  password,
  confirmPassword,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  errors,
  disabled,
}: RegisterFieldsProps) {
  return (
    <>
      <TextField
        id="name"
        label="Nome"
        type="text"
        value={name}
        onChange={onNameChange}
        autoComplete="name"
        placeholder="Come ti chiami?"
        error={errors.name}
        required
        disabled={disabled}
      />

      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        autoComplete="email"
        placeholder="nome@esempio.it"
        error={errors.email}
        required
        disabled={disabled}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        autoComplete="new-password"
        placeholder="Almeno 8 caratteri"
        error={errors.password}
        helper="Usa almeno 8 caratteri."
        required
        minLength={8}
        disabled={disabled}
      />

      <TextField
        id="confirm-password"
        label="Conferma password"
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        autoComplete="new-password"
        placeholder="Ripeti la password"
        error={errors.confirmPassword}
        required
        disabled={disabled}
      />
    </>
  );
}
