import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";
import { useRouter } from "next/router";

function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className={styles.profile}>Loading...</p>;
  } else if (!session) {
    router.push("/auth");
    return;
  }

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
