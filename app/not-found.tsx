import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <p className="text-sm uppercase tracking-widest text-muted">404</p>
      <h1 className="display mt-4 text-5xl sm:text-7xl">Nothing here.</h1>
      <p className="mt-6 max-w-md text-muted">
        That page doesn&rsquo;t exist — but the work does.
      </p>
      <Link
        href="/work"
        className="link-underline mt-8 inline-block w-fit text-lg"
      >
        See the work →
      </Link>
    </section>
  );
}
