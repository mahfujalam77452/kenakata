"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-teal-dark text-white">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-marigold font-heading text-2xl font-bold text-brand-teal-dark">
              KK
            </div>
            <p className="mt-8 font-heading text-sm font-bold uppercase tracking-[0.2em] text-accent-marigold">
              Kenakata needs a moment
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">
              The whole shop is taking a pause.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/75">
              An unexpected application error stopped this page. Please try refreshing the shop.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-8 rounded-md bg-white px-6 py-3 text-sm font-bold text-brand-teal-dark transition-colors hover:bg-accent-marigold focus:outline-none focus:ring-2 focus:ring-accent-marigold focus:ring-offset-2 focus:ring-offset-brand-teal-dark"
            >
              Reload shop
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}