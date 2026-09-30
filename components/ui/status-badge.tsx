export function StatusBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
