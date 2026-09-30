"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { personal } from "@/data/portfolio";

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(personal.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className="copy-email-wrapper">
      <button
        className="copy-email"
        type="button"
        onClick={copyEmail}
        aria-label="Copy email address"
        title="Copy email address"
      >
        {status === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
      </button>
      <span role="status" className="copy-feedback">
        {status === "copied"
          ? "Copied!"
          : status === "error"
            ? "Please select and copy the email above."
            : ""}
      </span>
    </div>
  );
}
