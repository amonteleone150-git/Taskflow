import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { getServerSession } from "@/lib/session";

export const instant = false;

export const metadata = {
  title: "Registrati",
  description: "Crea il tuo account personale Taskflow.",
};

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      overline="Taskflow · Nuovo account"
      title="Crea il tuo account"
      description="Bastano un nome, un'email e una password per iniziare."
      footer={
        <span>
          Hai già un account?{" "}
          <Link
            href="/login"
            className="font-medium text-accent hover:underline"
          >
            Accedi
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
