import Image from 'next/image';
import styles from './FloatingSilenceHero.module.css';

export function FloatingSilenceHero() {
  return (
    <section className={styles.hero}>
      <header className={styles.nav}>
        <a className={styles.logo} href="/">
          <span className={styles.logoMain}>YANKIT</span>
          <span className={styles.logoSub}>SPITI HOMESTAY</span>
        </a>

        <nav className={styles.navLinks} aria-label="Primary">
          <a href="#stay">Stay</a>
          <a href="#experiences">Experiences</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
        </nav>

        <a className={styles.bookButton} href="#booking">
          Book Your Stay
        </a>
      </header>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Family-run homestay in Spiti Valley</p>

        <h1 className={styles.headline}>
          Wake Up Where
          <br />
          the Mountains
          <br />
          Breathe
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
            View the Stay
          </a>
        </div>

        <div className={styles.trustRow}>
          <span className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 18L8.2 10l3.2 3.8 3.8-5 7 9.2H2Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span>12,000 ft</span>
          </span>
          <span className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 11h14l-1.1 6.2a2 2 0 0 1-2 1.7H8.1a2 2 0 0 1-2-1.7L5 11Zm3-3.2c0-2.2 1.7-3.8 4-3.8s4 1.6 4 3.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Local meals</span>
          </span>
          <span className={styles.trustItem}>
            <svg className={styles.trustIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span>Mountain views</span>
          </span>
        </div>
      </div>

      <div className={styles.imageFrame}>
        <Image
          src="/images/spiti-hero-landscape.jpg"
          alt="Spiti valley homestay surrounded by mountains"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 54vw"
        />
        <div className={styles.imageOverlay} />
      </div>

      <div className={styles.interiorCutout}>
        <Image
          src="/images/interior-tea-window.jpg"
          alt="Warm room with tea and mountain view at Yankit Homestay"
          fill
          sizes="(max-width: 900px) 100vw, 330px"
        />
        <div className={styles.cutoutOverlay} />
      </div>
    </section>
  );
}
