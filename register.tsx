src/routes/register.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — AnyGadget" }] }),
  component: RegisterPage,
});
function RegisterPage() {
  return (
    <div className="container-page py-10 flex justify-center">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-6">
        <h1 className="text-xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Join AnyGadget in seconds.</p>
        <form className="mt-5 space-y-3">
          <Input label="Full name" placeholder="Ada Lovelace" />
          <Input label="Email" type="email" placeholder="you@email.com" />
          <Input label="Phone" placeholder="+234…" />
          <Input label="Password" type="password" placeholder="Min 8 characters" />
          <Input label="Confirm password" type="password" placeholder="Re-enter password" />
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="accent-primary mt-0.5" required />
            <span>I agree to AnyGadget's <a className="text-primary hover:underline">Terms</a> and <a className="text-primary hover:underline">Privacy Policy</a>.</span>
          </label>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-md">Create account</button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input rounded-md p-2 bg-background text-foreground" />
    </label>
  );
}
