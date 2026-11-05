import { Textarea } from "@/components/ui/text-field";

type EventDescriptionFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EventDescriptionField({
  value,
  onChange,
}: EventDescriptionFieldProps) {
  return (
    <div>
      <label
        htmlFor="description"
        className="mb-1.5 block text-sm font-medium text-muted-strong"
      >
        Descrizione
      </label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Note opzionali..."
      />
    </div>
  );
}
