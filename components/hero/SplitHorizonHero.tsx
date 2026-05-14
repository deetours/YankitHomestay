import Image from 'next/image';
import styles from './SplitHorizonHero.module.css';

export function SplitHorizonHero() {
  return (
    <section className={styles.hero}>
      <header className={styles.nav}>
        <a className={styles.logo} href="/">
          <span className={styles.logoMain}>YANKIT</span>
          <span className={styles.logoSub}>SPITI VALLEY</span>
        </a>

        <nav className={styles.navLinks} aria-label="Primary">
          <a href="#stay">Stay</a>
          <a href="#spaces">Spaces</a>
          <a href="#experiences">Experiences</a>
          <a href="#about">About</a>
          <a href="#journal">Journal</a>
        </nav>

        <a className={styles.bookButton} href="#booking">
          Book Your Stay
        </a>
      </header>

      <div className={styles.imageLayer}>
        <Image
          src="/images/spiti-hero-landscape.jpg"
          alt="Spiti valley homestay surrounded by mountains"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.imageOverlay} />
      </div>

      <div className={styles.contentPanel}>
        <svg className={styles.ridge} viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,88 C130,118 250,40 390,78 C560,126 700,138 850,84 C1010,28 1120,92 1240,74 C1325,62 1385,46 1440,58 L1440,180 L0,180 Z" />
        </svg>

        <div className={styles.content}>
          <svg className={styles.mountainIcon} viewBox="0 0 64 32" aria-hidden="true">
            <path d="M6 28L24 8l10 12 8-9 16 17H6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <p className={styles.eyebrow}>Family-run homestay in Spiti Valley</p>

          <h1 className={styles.headline}>
            Wake Up Where
            <br />
            the Mountains Breathe
          </h1>

          <p className={styles.subheadline}>
            A quiet Spiti homestay surrounded by stone villages, open skies, warm meals, and the kind of silence you
            remember.
          </p>

          <div className={styles.ctaRow}>
            <a className={styles.primaryCta} href="#booking">
              Check Availability &rarr;
            </a>
            <a className={styles.secondaryCta} href="#stay">
              View the Stay &rsaquo;
            </a>
          </div>
        </div>

        <div className={styles.trustDetail}>
          <svg viewBox="0 0 64 32" aria-hidden="true">
            <path d="M6 28L24 8l10 12 8-9 16 17H6Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span>12,000 ft</span>
          <span>&middot;</span>
          <span>Local meals</span>
          <span>&middot;</span>
          <span>Mountain views</span>
        </div>

        <div className={styles.interiorCutout}>
          <Image
            src="/images/interior-tea-window.jpg"
            alt="Warm room with tea and mountain view at Yankit Homestay"
            fill
            sizes="(max-width: 900px) 100vw, 460px"
          />
        </div>
      </div>
    </section>
  );
}
