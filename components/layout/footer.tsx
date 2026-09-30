import { ArrowUp } from "lucide-react";
import { MotionToggle } from "@/components/ui/motion-provider";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-identity">
        <a href="#home" className="footer-wordmark">
          ALI_ALQASSAB<span>.dev</span>
        </a>
        <p>Built with Next.js + TypeScript. Always evolving.</p>
      </div>
      <div className="footer-actions">
        <MotionToggle />
        <a className="back-to-top" href="#home">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
