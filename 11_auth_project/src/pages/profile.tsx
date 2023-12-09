import { GetServerSideProps } from "next";
import UserProfile from "../components/profile/user-profile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { session: JSON.stringify(session) },
  };
}) satisfies GetServerSideProps;

export default ProfilePage;
