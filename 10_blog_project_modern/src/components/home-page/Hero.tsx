import Image from "next/image";
import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/mustafa.jpeg"
          alt="Mustafa's freaking face, before balding"
          width={250}
          height={250}
        />
      </div>
      <h1>Hi, I&apos;m Mustafa</h1>
      <p>
        I write about web development, programming, cyber security and trading.
      </p>
    </section>
  );
}

export default Hero;
