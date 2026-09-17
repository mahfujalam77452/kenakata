
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register, login } from "@/lib/api/auth";
import { saveSession } from "@/lib/utils/session";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({ name, email, password });

      // POST /users/ doesn't return tokens, so log in right after registering
      const tokens = await login({ email, password });

      saveSession(tokens);
      router.back();
    } catch {
      setError("Could not create account. Try a different email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-mist bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-heading text-3xl font-bold text-ink">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-ink/55">
              Sign up to start shopping with us
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
              />

              <p className="mt-1.5 text-xs text-ink/45">
                Password must be at least 6 characters.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-sale-maroon/20 bg-sale-maroon/5 px-3 py-2.5">
                <p className="text-sm text-sale-maroon">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-teal py-3 text-sm font-semibold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-mist pt-6 text-center">
            <p className="text-sm text-ink/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-brand-teal transition-colors hover:text-brand-teal-dark"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

