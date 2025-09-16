import { LoginForm } from "@repo/ui";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}

