import Link from "next/link";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
}

type FormButton = {
  type: "form";
  handleClick: () => void;
};

type LinkButton = {
  type: "link";
  link: string;
};

type ButtonVariant = FormButton | LinkButton;

function Button({ children, ...props }: ButtonProps & ButtonVariant) {
  if (props.type === "link") {
    return (
      <Link href={props.link} className={styles.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={props.handleClick}>
      {children}
    </button>
  );
}

export default Button;
