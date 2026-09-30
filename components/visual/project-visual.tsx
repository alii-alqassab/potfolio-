import {
  Braces,
  Code2,
  Database,
  FileCode2,
  Globe,
  Layers3,
  MessageSquare,
  Radio,
  Server,
} from "lucide-react";
import type { Project } from "@/types/portfolio";

// Illustrations show actual project capabilities, not fabricated screenshots or metrics.
export function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  if (variant === "social")
    return (
      <div className="project-visual social-visual" aria-hidden="true">
        <div className="visual-topline">
          <span>
            <span className="mini-led" />
            SOCIAL / SYSTEM ARCHITECTURE
          </span>
          <Radio size={13} />
        </div>
        <div className="social-schema">
          <div className="schema-client">
            <div className="schema-label">
              <Globe size={14} />
              NEXT.JS
            </div>
            <div className="wireframe-profile">
              <i />
              <div>
                <span />
                <span />
              </div>
            </div>
            <div className="wireframe-post">
              <span />
              <span />
              <span />
            </div>
            <div className="wireframe-actions">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="schema-pipe">
            <span />
            <div>HTTP / WS</div>
          </div>
          <div className="schema-server">
            <Server size={22} strokeWidth={1.5} />
            <strong>Go</strong>
            <span>APPLICATION</span>
          </div>
          <div className="schema-fan">
            <span />
            <span />
          </div>
          <div className="schema-outputs">
            <div>
              <Database size={16} />
              <span>SQLite</span>
            </div>
            <div>
              <MessageSquare size={16} />
              <span>Live chat</span>
              <i />
            </div>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>INTERFACE</span>
          <span>LOGIC</span>
          <span>PERSISTENCE + REAL-TIME</span>
        </div>
      </div>
    );
  if (variant === "stocks")
    return (
      <div className="project-visual stocks-visual" aria-hidden="true">
        <div className="visual-topline">
          <span>
            <span className="mini-led" />
            PORTFOLIO / DATA FLOW
          </span>
          <Layers3 size={13} />
        </div>
        <div className="stock-schema">
          <div className="stock-interface">
            <div className="schema-label">
              <Code2 size={14} />
              REACT.JS
            </div>
            <div className="stock-table">
              <div>
                <span />
                <span />
                <span />
              </div>
              <div>
                <span />
                <span />
                <span />
              </div>
              <div>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="stock-sparkline">
              <svg viewBox="0 0 160 36" fill="none">
                <path d="M0 32L22 24L42 28L60 15L80 20L102 7L122 13L143 3L160 9" />
              </svg>
              <span>PORTFOLIO DATA</span>
            </div>
          </div>
          <div className="stock-branches">
            <span className="branch-label">CONNECTED DATA</span>
            <span className="stock-branch" />
            <div className="stock-service">
              <Database size={18} />
              <div>
                <strong>PostgreSQL</strong>
                <span>DATA PERSISTENCE</span>
              </div>
            </div>
            <div className="stock-service">
              <Braces size={18} />
              <div>
                <strong>Python</strong>
                <span>LOGIC + AI FEATURES</span>
              </div>
            </div>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>INVESTMENTS</span>
          <span>APPLICATION LOGIC</span>
          <span>CONNECTED</span>
        </div>
      </div>
    );
  if (variant === "forum")
    return (
      <div
        className="project-visual compact-visual forum-visual"
        aria-hidden="true"
      >
        <div className="compact-symbol">
          <MessageSquare size={27} strokeWidth={1.3} />
          <span className="symbol-orbit" />
        </div>
        <div className="forum-threads">
          <div>
            <i />
            <span />
            <span className="thread-tag">Go</span>
          </div>
          <div>
            <i />
            <span />
            <span className="thread-tag">SQLite</span>
          </div>
          <div>
            <i />
            <span />
            <span className="thread-tag">HTML/CSS</span>
          </div>
        </div>
        <span className="compact-visual-label">A SPACE FOR CONVERSATION</span>
      </div>
    );
  return (
    <div
      className="project-visual compact-visual practice-visual"
      aria-hidden="true"
    >
      <div className="compact-symbol">
        <FileCode2 size={28} strokeWidth={1.3} />
        <span className="symbol-orbit" />
      </div>
      <div className="practice-languages">
        <span>Go</span>
        <span>Python</span>
        <span>Java</span>
        <div className="difficulty-path">
          <i />
          <span />
          <i />
          <span />
          <i />
        </div>
      </div>
      <span className="compact-visual-label">CHOOSE. THINK. SOLVE.</span>
    </div>
  );
}
