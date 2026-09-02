import Image from "next/image";

const features = [
  ["Review the turn", "See the prompt beside everything that changed in an agent's last turn. Attribution survives rebases and squashes."],
  ["Know you've covered it", "Work through every change block, jump to what remains, and catch review marks that went stale after another edit."],
  ["Check what pixels did", "Keep screenshots, visual test results, numbered markers, and notes beside the code that produced them."],
  ["Send back a verdict", "Export an agent-ready review packet or post new comments to an existing GitHub pull request."],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">The native review desk for Mac</span>
          <h1>Review everything<br />your coding agent changed.</h1>
          <p className="tagline">Fettle tracks what you've checked, keeps the prompt and screenshots beside the code, and sends your verdict back.</p>
          <p className="lede">Open local changes, agent turns, clean branches, or pull requests without pushing first. Work through the evidence, leave precise feedback, and hand the review back with its context intact.</p>
          <p className="platform-note">Code and review state stay on your Mac unless you explicitly run an AI review or promote comments to GitHub.</p>
          <p className="platform-note">Mac only. Requires macOS 26 Tahoe or later on Apple silicon.</p>
          <div className="actions">
            <a className="button" href="https://github.com/mcclowes/fettle">View on GitHub</a>
            <a className="button secondary" href="/docs/getting-started/">Get started</a>
          </div>
        </div>
        <figure className="product-shot hero-shot">
          <Image src="/screenshots/review.png" width={1710} height={1107} sizes="(max-width: 900px) 100vw, 54vw" alt="Fettle showing a split code review with changed files and review controls" priority />
        </figure>
      </section>

      <section className="band intro-band">
        <span className="eyebrow">Context changes the review</span>
        <h2>Finish the review with confidence, then send the decision back with its context intact.</h2>
      </section>

      <section className="band">
        <div className="section-heading">
          <span className="eyebrow">One review loop</span>
          <h2>From first file to final verdict</h2>
        </div>
        <div className="feature-grid">
          {features.map(([title, body], index) => (
            <article className="feature" key={title}>
              <span className="feature-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band split-band">
        <div>
          <span className="eyebrow">Works alone, better together</span>
          <h2>Pair it with Saggar when agents are doing the work.</h2>
        </div>
        <div>
          <p className="lede">Fettle reviews any local repository on its own. Saggar adds turn grouping and the prompt behind each change, so a review starts with intent instead of archaeology.</p>
          <div className="actions">
            <a className="button secondary" href="https://saggar.marginalutility.dev">Meet Saggar</a>
            <a className="text-link" href="/docs/saggar/">How the pairing works →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
