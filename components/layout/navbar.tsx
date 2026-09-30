"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";

export function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main > section[id]"),
    ];
    let scheduled = false;
    function updateActive() {
      const marker = Math.min(window.innerHeight * 0.35, 280);
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      )
        current = "contact";
      setActive(current);
      scheduled = false;
    }
    function onScroll() {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateActive);
      }
    }
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setMenuOpen(false);
    }
    const query = window.matchMedia("(min-width: 1100px)");
    function onResize() {
      if (query.matches) setMenuOpen(false);
    }
    query.addEventListener("change", onResize);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      query.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container navbar">
        <a
          className="wordmark"
          href="#home"
          aria-label="Ali Alqassab — home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            a<span>.</span>
          </span>
          <span>
            ALI_ALQASSAB<span className="wordmark-suffix">.dev</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="nav-contact"
          href="#contact"
          aria-current={active === "contact" ? "location" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {[...navigation, { id: "contact", label: "Contact" }].map(
          (item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => {
                setMenuOpen(false);
                document
                  .getElementById(item.id)
                  ?.focus({ preventScroll: true });
              }}
            >
              <span className="mobile-nav-number">0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ),
        )}
      </nav>
    </header>
  );
}
