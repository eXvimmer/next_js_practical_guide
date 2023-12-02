import Image from "next/legacy/image";
import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/mustafa.jpeg"
          alt="An image of Mustafa"
          width={250}
          height={250}
        />
      </div>
      <h1>Hi, I&apos;m Mustafa</h1>
      <p>
        I write about web development, general programming, cyber security and
        trading.
      </p>
    </section>
  );
}

export default Hero;
