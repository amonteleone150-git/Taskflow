import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getServerSession } from "@/lib/session";

export const instant = false;

export const metadata = {
  title: "Accedi",
  description: "Accedi al tuo spazio personale Taskflow.",
};

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      overline="Taskflow · Area personale"
      title="Bentornato"
      description="Accedi per ritrovare le tue attività e i tuoi eventi."
      footer={
        <span>
          Non hai ancora un account?{" "}
          <Link
            href="/register"
            className="font-medium text-accent hover:underline"
          >
            Registrati
          </Link>
        </span>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
