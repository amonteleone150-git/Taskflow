export type EventColor =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "pink"
  | "orange"
  | "teal";

export const eventColors: Record<
  EventColor,
  { bg: string; border: string; text: string }
> = {
  blue: {
    bg: "bg-blue-500",
    border: "border-blue-500",
    text: "text-blue-700 dark:text-blue-300",
  },
  green: {
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  yellow: {
    bg: "bg-amber-500",
    border: "border-amber-500",
    text: "text-amber-700 dark:text-amber-300",
  },
  red: {
    bg: "bg-rose-500",
    border: "border-rose-500",
    text: "text-rose-700 dark:text-rose-300",
  },
  purple: {
    bg: "bg-violet-500",
    border: "border-violet-500",
    text: "text-violet-700 dark:text-violet-300",
  },
  pink: {
    bg: "bg-pink-500",
    border: "border-pink-500",
    text: "text-pink-700 dark:text-pink-300",
  },
  orange: {
    bg: "bg-orange-500",
    border: "border-orange-500",
    text: "text-orange-700 dark:text-orange-300",
  },
  teal: {
    bg: "bg-teal-500",
    border: "border-teal-500",
    text: "text-teal-700 dark:text-teal-300",
  },
};

export const eventColorOptions: {
  value: EventColor;
  label: string;
  bg: string;
}[] = [
  { value: "blue", label: "Blu", bg: "bg-blue-500" },
  { value: "green", label: "Verde", bg: "bg-emerald-500" },
  { value: "yellow", label: "Giallo", bg: "bg-amber-500" },
  { value: "red", label: "Rosso", bg: "bg-rose-500" },
  { value: "purple", label: "Viola", bg: "bg-violet-500" },
  { value: "pink", label: "Rosa", bg: "bg-pink-500" },
  { value: "orange", label: "Arancione", bg: "bg-orange-500" },
  { value: "teal", label: "Petrolio", bg: "bg-teal-500" },
];
