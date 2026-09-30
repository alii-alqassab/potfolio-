import { personal } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <section
      id="profile"
      className="section container profile-section"
      aria-labelledby="profile-heading"
      tabIndex={-1}
    >
      <Reveal className="profile-intro">
        <p className="section-label">
          <span>01</span>
          <span className="label-line" />
          /profile
        </p>
        <h2 id="profile-heading">
          Curious by nature.
          <br />
          Builder by <span className="text-accent">practice.</span>
        </h2>
        <p className="profile-aside">
          <span className="small-cross" aria-hidden="true">
            +
          </span>{" "}
          The person behind the system.
        </p>
      </Reveal>
      <Reveal className="profile-content" delay={80}>
        <p className="profile-lead">{personal.profile}</p>
        <p className="profile-detail">{personal.profileDetail}</p>
        <dl className="profile-facts">
          <div>
            <dt>Currently</dt>
            <dd>{personal.studentStatus}</dd>
          </div>
          <div>
            <dt>Focused on</dt>
            <dd>Full-Stack Development</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{personal.location}</dd>
          </div>
          <div>
            <dt>Experience in</dt>
            <dd>Development & Team Leadership</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
