type SectionHeaderProps = {
  number: string;
  label: string;
  title: string;
  accent?: string;
  description?: string;
};

export function SectionHeader({
  number,
  label,
  title,
  accent,
  description,
}: SectionHeaderProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-label">
          <span>{number}</span>
          <span className="label-line" />/{label}
        </p>
        <h2 id={`${label}-heading`}>
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-accent">{accent}</span>
            </>
          )}
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
