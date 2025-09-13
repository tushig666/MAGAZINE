import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-headline font-bold">Admin Login</h1>
          <p className="mt-2 text-muted-foreground">
            Please enter your credentials to continue.
          </p>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
