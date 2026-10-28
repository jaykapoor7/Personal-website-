"use client";
import Link from "next/link";
import { useEffect } from "react";

/** Old URLs land on the right section of the home page. */
export function Redirect({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <section className="shell pb-10 pt-40">
      <h1 className="text-4xl font-semibold">{label}</h1>
      <p className="mt-4 text-muted">
        This has moved.{" "}
        <Link href={to} className="link text-fg">
          Go to {label}
        </Link>
        .
      </p>
    </section>
  );
}
