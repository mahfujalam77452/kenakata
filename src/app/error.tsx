"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-accent-marigold">
          Something went wrong
        </p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-brand-teal-dark sm:text-5xl">
          We could not load this page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink/65">
          The page hit an unexpected problem. Try again, and we will bring you back to your shopping journey.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-md bg-brand-teal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-accent-marigold focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}