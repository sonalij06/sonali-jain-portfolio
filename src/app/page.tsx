import { CustomCursor } from "@/components/CustomCursor";
import { MobileQuickActions } from "@/components/MobileQuickActions";
import { MotionBackground } from "@/components/MotionBackground";
import { SiteEffects } from "@/components/SiteEffects";
import { TouchPing } from "@/components/TouchPing";
import { StageNode } from "@/components/StageNode";
import { RemarksSection } from "@/components/RemarksSection";
import { MobileNav } from "@/components/MobileNav";
import {
  ARTICLES,
  JOBS,
  MARQUEE_TOOLS,
  NAV_LINKS,
  REPOS,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  STATS,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <div className="bg-fixed">
        <div className="bg-glow g1" />
        <div className="bg-glow g2" />
        <div className="bg-glow g3" />
        <MotionBackground />
        <div className="bg-noise" />
      </div>

      <CustomCursor />
      <TouchPing />
      <SiteEffects />
      <MobileQuickActions />

      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="dot" />
            SONALI&nbsp;JAIN
          </div>
          <MobileNav links={NAV_LINKS} />
          <div className="status-chip">
            <span className="ring" />
            status: operational
          </div>
        </div>
      </header>

      <div className="wrap rail-col">
        <div className="rail">
          <div className="rail-fill" id="railFill" />
        </div>

        {/* HERO */}
        <section className="hero stage" id="hero">
          <StageNode />
          <div className="stage-tag">
            $ pipeline.yml <span className="state">· triggered on push</span>
          </div>
          <div className="hero-grid">
            <div>
              <h1>
                <div className="line">
                  <span>Infrastructure</span>
                </div>
                <div className="line">
                  <span>
                    that <em className="accent">ships</em>
                  </span>
                </div>
                <div className="line">
                  <span>itself.</span>
                </div>
              </h1>
              <p className="hero-sub">
                I&rsquo;m <strong>Sonali Jain</strong>, a Cloud &amp; DevOps Engineer who designs automated,
                observable, self-healing systems &mdash; on AWS, Azure and GCP &mdash; so releases ship on
                their own and pages stay quiet at 3&nbsp;a.m.
              </p>
              <div className="cta-row">
                <a href="#experience" className="btn btn-primary magnetic" data-cursor="Scroll">
                  View pipeline history ↓
                </a>
                <a href="mailto:sonalijain0605@gmail.com" className="btn btn-ghost magnetic" data-cursor="Email">
                  Email me
                </a>
              </div>
              <div className="stat-strip">
                {STATS.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div className="num" data-count={stat.count ?? undefined}>
                      {stat.value}
                      <span className="unit">{stat.suffix}</span>
                    </div>
                    <div className="label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="term reveal">
              <div className="term-bar">
                <span />
                <span />
                <span />
                <div className="title">sonali@prod ~ </div>
              </div>
              <div className="term-body" id="termBody" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section stage" id="about">
          <StageNode />
          <div className="stage-tag">
            BUILD <span className="state">· profile.md compiled</span>
          </div>
          <div className="about-grid reveal">
            <div>
              <div className="avatar-badge">
                <div className="ring" />
                <span className="mono-mark">SJ</span>
              </div>
              <div className="avatar-status">
                <span className="ring2" />
                online &middot; Bangalore, IN
              </div>
            </div>
            <div className="about-copy">
              <div className="eyebrow">About</div>
              <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "14px 0 18px" }}>
                Cloud engineer, uptime obsessive.
              </h2>
              <p>
                I&rsquo;m a DevOps engineer with <strong>4.5+ years</strong> building cloud architecture,
                infrastructure as code, and automation for platforms that can&rsquo;t afford to go dark. Most
                recently I migrated <strong>40+ repositories</strong> to GitLab, rebuilt CI/CD and provisioning
                around Terraform, and cut manual release effort by <strong>60%</strong> &mdash; while deployment
                cycle time dropped <strong>40%</strong>.
              </p>
              <p>
                I care about the boring things that keep systems trustworthy: monitoring that actually catches
                problems (Prometheus, Grafana, ELK), IAM that doesn&rsquo;t get out of hand, and pipelines a
                teammate can read at 2&nbsp;a.m. without me on call. I work across AWS, Azure and GCP, and I like
                the conversation with stakeholders as much as the Terraform plan.
              </p>
              <div className="meta-list">
                <div className="meta-item">
                  <b>Location</b>Bangalore, India
                </div>
                <div className="meta-item">
                  <b>Education</b>B.Tech &middot; MIET, 2018&ndash;2022
                </div>
                <div className="meta-item">
                  <b>Certified</b>Azure Fundamentals (AZ-900)
                </div>
                <div className="meta-item">
                  <b>Cloud labs</b>25+ GCP Qwiklabs badges
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section stage" id="experience">
          <StageNode />
          <div className="stage-tag">
            RELEASE <span className="state">· 2 deployments to production</span>
          </div>
          <div className="section-head reveal">
            <div className="eyebrow">Experience</div>
            <h2>Where the pipelines run.</h2>
            <p>
              Two roles, one thread: take fragile manual process, automate it, and make the failure modes
              visible before they page anyone.
            </p>
          </div>

          {JOBS.map((job) => (
            <div className="job reveal" key={job.org}>
              <div className="job-head">
                <div>
                  <div className="job-role">{job.role}</div>
                  <div className="job-org">{job.org}</div>
                </div>
                <div className="job-meta">
                  <div className="dates">{job.dates}</div>
                  {job.location}
                </div>
              </div>
              <ul className="bullets">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="tech-row">
                {job.tech.map((tech) => (
                  <span className="tech-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section className="section stage" id="skills">
          <StageNode />
          <div className="stage-tag">
            REGISTRY <span className="state">· ls artifact-registry/</span>
          </div>
          <div className="section-head reveal">
            <div className="eyebrow">Skills</div>
            <h2>The stack, by shelf.</h2>
            <p>Everything I reach for, grouped the way it actually gets used &mdash; not alphabetized for show.</p>
          </div>
          <div className="skill-groups reveal">
            {SKILL_GROUPS.map((group) => (
              <div className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="marquee reveal">
          <div className="marquee-viewport">
            <div className="marquee-track">
              {MARQUEE_TOOLS.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <div className="marquee-track" aria-hidden="true">
              {MARQUEE_TOOLS.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>

        {/* WRITING */}
        <section className="section stage" id="writing">
          <StageNode />
          <div className="stage-tag">
            CHANGELOG <span className="state">· git log --oneline origin/writing</span>
          </div>
          <div className="section-head reveal">
            <div className="eyebrow">Writing</div>
            <h2>Notes from the field.</h2>
            <p>
              Long-form write-ups on Medium &mdash; mostly Kubernetes, monitoring stacks, and CI/CD automation,
              written the way I&rsquo;d explain it to a teammate.
            </p>
          </div>
          <div className="log-list reveal">
            {ARTICLES.map((article) => (
              <div className="log-item" key={article.href + article.title}>
                <div className="log-date">{article.date}</div>
                <div className="log-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
                <a className="log-link" data-cursor="Read" href={article.href} target="_blank" rel="noopener">
                  Read &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section className="section stage" id="github">
          <StageNode />
          <div className="stage-tag">
            ARTIFACTS <span className="state">· gh repo list sonalij06</span>
          </div>
          <div className="section-head reveal">
            <div className="eyebrow">Open source</div>
            <h2>What&rsquo;s in the registry.</h2>
            <p>A mix of infra tooling and the small projects that keep the fundamentals sharp.</p>
          </div>
          <div className="repo-grid reveal">
            {REPOS.map((repo) => (
              <a
                className="repo-card magnetic"
                data-cursor="View"
                href={repo.href}
                target="_blank"
                rel="noopener"
                key={repo.name}
              >
                <div className="repo-name">⌘ {repo.name}</div>
                <div className="repo-desc">{repo.description}</div>
                <div className="repo-foot">
                  <span>
                    <span className="lang-dot" />
                    {repo.lang}
                  </span>
                  <span>{repo.meta}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section stage" id="contact">
          <StageNode />
          <div className="stage-tag">
            DEPLOY <span className="state">· final stage</span>
          </div>
          <div className="contact-panel reveal">
            <div className="eyebrow">Get in touch</div>
            <h2>Let&rsquo;s ship something that stays up.</h2>
            <a className="contact-cmd magnetic" data-cursor="Email" href="mailto:sonalijain0605@gmail.com">
              $ ./deploy.sh --target=inbox &middot; sonalijain0605@gmail.com
              <span className="caret" />
            </a>
            <div className="social-row">
              {SOCIAL_LINKS.map((social) => (
                <a
                  className="social-link magnetic"
                  data-cursor="Open"
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  key={social.href}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* REMARKS */}
        <section className="section stage" id="remarks">
          <StageNode />
          <div className="stage-tag">
            REVIEW <span className="state">· gh pr review --comment</span>
          </div>
          <div className="section-head reveal">
            <div className="eyebrow">Remarks</div>
            <h2>Leave a review.</h2>
            <p>Worked together, read something useful, or just want to say hi &mdash; drop a remark below.</p>
          </div>
          <div className="reveal">
            <RemarksSection />
          </div>
        </section>

        <footer>
          <div className="foot-row">
            <span>&copy; <span id="year" /> Sonali Jain &middot; built with intent, not a template.</span>
            <span>● status: operational &middot; last deploy: just now</span>
          </div>
        </footer>
      </div>
    </>
  );
}
