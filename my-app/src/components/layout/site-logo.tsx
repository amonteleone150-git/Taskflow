import Link from "next/link";
import { CloseIcon } from "@/components/ui/icons";

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-subtle">
        <CloseIcon />
      </span>
      <span className="font-display text-[17px] font-bold tracking-tight">
        Taskflow
      </span>
    </Link>
  );
}
