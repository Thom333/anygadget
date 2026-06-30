src/routes/login.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AnyGadget" }] }),
  component: LoginPage,
});
function LoginPage() {
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(false);
  return (
    <div className="container-page py-10 flex justify-center">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-6">
        <h1 className="text-xl font-bold">Sign in</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back to AnyGadget.</p>
        {!otp ? (
          <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); setOtp(true); }}>
            <label className="block text-sm">
              <span className="text-muted-foreground">Email or phone</span>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input type="email" required placeholder="you@email.com" className="w-full border border-input rounded-md pl-9 pr-3 py-2 bg-background" />
              </div>
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Password</span>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input type={show ? "text" : "password"} required placeholder="••••••••" className="w-full border border-input rounded-md pl-9 pr-9 py-2 bg-background" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted-foreground">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>
            <div className="flex justify-between text-xs">
              <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-primary" /> Remember me</label>
              <a className="text-primary hover:underline cursor-pointer">Forgot password?</a>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-md">Sign in</button>
          </form>
        ) : (
          <div className="mt-5 space-y-3">
            <p className="text-sm">We sent a 6-digit code to your email. Enter it below to continue.</p>
            <div className="flex gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <input key={i} maxLength={1} className="w-10 h-12 text-center text-lg font-bold border border-input rounded-md bg-background" />
              ))}
            </div>
            <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-md">Verify & continue</button>
            <button onClick={() => setOtp(false)} className="w-full text-xs text-muted-foreground hover:underline">Use another method</button>
          </div>
        )}
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
        </div>
        <div className="space-y-2">
          <SocialBtn label="Continue with Google" />
          <SocialBtn label="Continue with Apple" />
          <SocialBtn label="Continue with Facebook" />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-5">
          New to AnyGadget? <Link to="/register" className="text-primary font-semibold hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
function SocialBtn({ label }: { label: string }) {
  return (
    <button className="w-full border border-border hover:bg-muted py-2.5 rounded-md text-sm font-semibold">{label}</button>
  );
}
