import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "responsive";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-subtle hover:bg-primary-hover",
  secondary:
    "border border-primary bg-surface text-accent hover:bg-primary-soft",
  outline:
    "border border-border bg-surface text-muted-strong hover:bg-surface-muted hover:text-foreground",
  ghost: "text-muted-strong hover:bg-surface-muted hover:text-foreground",
  danger:
    "bg-error-fill text-white hover:bg-error-fill-hover focus-visible:outline-error",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[38px] px-5 text-sm",
  md: "h-[42px] px-5 text-sm",
  lg: "h-[46px] px-7 text-sm",
  responsive: "h-11 w-full px-5 text-sm sm:h-[38px] sm:w-auto",
};

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Classi del bottone, utili anche per i link che devono sembrare bottoni. */
export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonClassOptions = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClass({ variant, size, className })}
      {...props}
    />
  );
}
