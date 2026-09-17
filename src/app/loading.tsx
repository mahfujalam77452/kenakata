export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center bg-paper px-6 py-16"
    >
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-mist border-t-accent-marigold" />
        </div>
        <div className="mx-auto h-5 w-40 animate-pulse rounded bg-mist" />
        <div className="mx-auto mt-3 h-3 w-64 max-w-full animate-pulse rounded bg-mist/80" />
      </div>
    </main>
  );
}