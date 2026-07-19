export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-[var(--accent)]">Hi, my name is</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
        Ashutosh Kumar Goswami
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--fg-muted)]">
        Backend &amp; cloud engineer building event-driven payment systems.
      </p>
    </main>
  );
}
