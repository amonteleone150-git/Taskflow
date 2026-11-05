import type { ButtonHTMLAttributes } from "react";

export type IconButtonVariant = "ghost" | "muted" | "action" | "danger";

const base =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<IconButtonVariant, string> = {
  ghost: "text-muted-strong hover:bg-surface-muted hover:text-foreground",
  muted: "text-muted hover:bg-surface-muted hover:text-foreground",
  action: "text-muted hover:bg-surface hover:text-foreground",
  danger:
    "text-muted hover:bg-error-soft hover:text-error focus-visible:outline-error",
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
};

export function IconButton({
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
