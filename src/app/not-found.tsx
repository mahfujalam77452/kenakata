import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent-marigold/20 font-heading text-3xl font-bold text-brand-teal-dark">
          404
        </div>
        <p className="mt-8 font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
          Page not found
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-ink sm:text-5xl">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink/65">
          The product or page you are looking for may have moved, or it may no longer be available.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-brand-teal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-accent-marigold focus:ring-offset-2"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}