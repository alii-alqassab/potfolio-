import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found container" tabIndex={-1}>
      <p className="section-label">404 / CONNECTION NOT FOUND</p>
      <h1>
        This node
        <br />
        isn’t connected<span className="text-accent">.</span>
      </h1>
      <p>
        The page you’re looking for doesn’t exist. Let’s get you back to the
        system.
      </p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the portfolio
      </Link>
    </main>
  );
}
