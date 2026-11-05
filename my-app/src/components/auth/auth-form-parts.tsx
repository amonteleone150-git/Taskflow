import { Button } from "@/components/ui/button";

type AuthErrorAlertProps = {
  message: string;
};

export function AuthErrorAlert({ message }: AuthErrorAlertProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-lg border border-error/20 bg-error-soft px-3 py-2 text-sm leading-[1.5] text-error"
    >
      {message}
    </div>
  );
}

type AuthSubmitButtonProps = {
  pending: boolean;
  label: string;
  pendingLabel: string;
};

export function AuthSubmitButton({
  pending,
  label,
  pendingLabel,
}: AuthSubmitButtonProps) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
