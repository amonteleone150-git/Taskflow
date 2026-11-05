import { eventColorOptions } from "@/lib/calendar";
import type { EventFormData } from "@/components/calendar/event-form";

type EventColorPickerProps = {
  value: EventFormData["color"];
  onChange: (color: EventFormData["color"]) => void;
};

export function EventColorPicker({ value, onChange }: EventColorPickerProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-muted-strong">
        Colore
      </label>
      <div className="flex flex-wrap gap-2">
        {eventColorOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative h-8 w-8 rounded-full transition-transform sm:h-9 sm:w-9 ${opt.bg} ${
              value === opt.value
                ? "scale-105 ring-2 ring-primary ring-offset-2 ring-offset-surface"
                : ""
            }`}
            aria-label={opt.label}
            aria-pressed={value === opt.value}
          >
            {value === opt.value && (
              <span className="absolute inset-0 flex items-center justify-center text-white">
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3 w-3"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 6.5 5 9l4.5-5.5" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className="h-3 w-3"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}
