"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowUpRight,
  Braces,
  Database,
  Layers3,
  Radio,
  Server,
  ShieldCheck,
} from "lucide-react";
import { systemNodes } from "@/data/portfolio";
import { useMotionPreference } from "@/components/ui/motion-provider";

const nodeIcons = {
  frontend: Layers3,
  backend: Server,
  databases: Database,
  apis: Braces,
  quality: ShieldCheck,
  realtime: Radio,
};

export function SystemCore() {
  const [selected, setSelected] = useState<string | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { motionAllowed } = useMotionPreference();
  const activeNode = systemNodes.find((node) => node.id === selected);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!motionAllowed || event.pointerType !== "mouse" || !stage.current)
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.current.style.setProperty("--graph-x", `${x * 5}px`);
    stage.current.style.setProperty("--graph-y", `${y * 5}px`);
  }

  function resetPointer() {
    stage.current?.style.setProperty("--graph-x", "0px");
    stage.current?.style.setProperty("--graph-y", "0px");
  }

  return (
    <div
      className="system-visual"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="graph-topline">
        <span>
          <span className="tiny-square" />
          THE DEVELOPER SYSTEM
        </span>
        <span>FIG. 01</span>
      </div>
      <div className="graph-stage" ref={stage}>
        <div className="graph-orbit orbit-outer" aria-hidden="true" />
        <div className="graph-orbit orbit-inner" aria-hidden="true" />
        <svg
          className="graph-connections"
          viewBox="0 0 600 520"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {systemNodes.map((node, index) => (
            <g
              key={node.id}
              className={
                selected === node.id ? "connection is-active" : "connection"
              }
            >
              <path className="connection-track" d={node.path} />
              <path
                className="connection-flow"
                d={node.path}
                style={{ animationDelay: `${index * -2.5}s` }}
              />
              <circle cx={node.x * 6} cy={node.y * 5.2} r="4" />
            </g>
          ))}
          <path
            className="graph-axis"
            d="M300 10V44 M300 476V510 M10 260H35 M565 260H590"
          />
        </svg>
        <div
          className="core-chip"
          aria-label="Ali, full-stack developer, at the core of the system"
        >
          <span className="core-top mono">THE CORE</span>
          <span className="core-name">
            ALI<span>.</span>
          </span>
          <span className="core-role">
            FULL-STACK
            <br />
            DEVELOPER
          </span>
          <span className="core-status" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        {systemNodes.map((node) => {
          const Icon = nodeIcons[node.id];
          return (
            <button
              type="button"
              key={node.id}
              className={`system-node node-${node.id} ${selected === node.id ? "is-selected" : ""}`}
              style={
                {
                  "--node-x": `${node.x}%`,
                  "--node-y": `${node.y}%`,
                } as CSSProperties
              }
              onClick={() => setSelected(selected === node.id ? null : node.id)}
              aria-label={`Explore ${node.label.toLowerCase()} layer`}
              aria-pressed={selected === node.id}
              aria-controls="system-node-detail"
            >
              <Icon
                className="node-icon"
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                <span className="node-name">{node.label}</span>
                <span className="node-meta">{node.meta}</span>
              </span>
              <span className="node-led" aria-hidden="true" />
            </button>
          );
        })}
        <span className="graph-coordinate coord-top" aria-hidden="true">
          x: 00 / y: 00
        </span>
        <span className="graph-coordinate coord-bottom" aria-hidden="true">
          CONNECTED BY CURIOSITY
        </span>
      </div>
      <div
        className={`graph-caption ${activeNode ? "has-selection" : ""}`}
        id="system-node-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeNode ? (
          <>
            <span>{activeNode.description}</span>
            <a
              href={`#${activeNode.target}`}
              aria-label={`Explore ${activeNode.label.toLowerCase()}`}
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </>
        ) : (
          <>
            <span className="caption-mark" aria-hidden="true">
              ↳
            </span>
            <span>Different layers. One connected mindset.</span>
            <span className="graph-hint">EXPLORE A NODE</span>
          </>
        )}
      </div>
    </div>
  );
}
