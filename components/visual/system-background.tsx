export function SystemBackground() {
  return (
    <div className="system-background" aria-hidden="true">
      <div className="background-grid" />
      <svg
        className="background-traces"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        <path d="M0 180H130L170 220V430L210 470H360 M1440 100H1260L1215 145V580L1170 625H1050 M0 800H190L245 745H410 M1440 840H1270L1200 910H1080" />
        <g className="background-points">
          <circle cx="360" cy="470" r="3" />
          <circle cx="1050" cy="625" r="3" />
          <circle cx="410" cy="745" r="3" />
          <circle cx="1080" cy="910" r="3" />
        </g>
      </svg>
    </div>
  );
}
