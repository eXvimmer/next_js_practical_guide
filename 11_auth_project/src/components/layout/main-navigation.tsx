import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import styles from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => signOut(/* { redirect: false } */)}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
