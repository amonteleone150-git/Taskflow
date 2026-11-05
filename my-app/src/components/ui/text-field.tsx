import type {
  InputHTMLAttributes,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
} from "react";

const fieldBase =
  "h-[42px] w-full rounded-lg border bg-surface px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-subtle disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-background disabled:text-subtle";

const normalBorder =
  "border-border hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]";

const errorBorder =
  "border-error focus:border-error focus:shadow-[0_0_0_1px_var(--error)]";

export const inputClass = fieldBase;

export const selectClass =
  "h-[42px] rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]";

export const textareaClass =
  "w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-subtle hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]";

type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type" | "name" | "id"
> & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  helper?: string;
  hideLabel?: boolean;
  labelSuffix?: ReactNode;
  containerClassName?: string;
  inputRef?: Ref<HTMLInputElement>;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  helper,
  hideLabel = false,
  labelSuffix,
  containerClassName = "",
  inputRef,
  className = "",
  ...props
}: TextFieldProps) {
  const describedBy = error
    ? `${id}-error`
    : helper
      ? `${id}-helper`
      : undefined;

  return (
    <div className={`space-y-1.5 ${containerClassName}`.trim()}>
      <label
        htmlFor={id}
        className={
          hideLabel
            ? "sr-only"
            : `block text-sm font-medium ${
                error ? "text-error" : "text-muted-strong"
              }`
        }
      >
        {label}
        {labelSuffix ? <> {labelSuffix}</> : null}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        ref={inputRef}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${fieldBase} ${error ? errorBorder : normalBorder} ${className}`.trim()}
        {...props}
      />

      {error ? (
        <p id={`${id}-error`} className="text-xs leading-[1.4] text-error">
          {error}
        </p>
      ) : helper ? (
        <p
          id={`${id}-helper`}
          className="text-xs leading-[1.4] tracking-[0.01em] text-subtle"
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`${textareaClass} ${className}`.trim()}
      {...props}
    />
  );
}
