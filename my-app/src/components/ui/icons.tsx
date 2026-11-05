export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className={`h-2.5 w-2.5 ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}

export function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={`h-[15px] w-[15px] ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.3 2.2a1.4 1.4 0 0 1 2 2L5.8 11.7 2.5 12.5l.8-3.3 8-7Z" />
    </svg>
  );
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={`h-[15px] w-[15px] ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.6 8.2h5.8l.6-8.2M6.5 7v3.5M9.5 7v3.5" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={`h-4 w-4 ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={`h-4 w-4 ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
