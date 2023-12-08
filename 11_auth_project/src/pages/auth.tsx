import { GetServerSideProps } from "next";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = (async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        permanent: true,
        destination: "/profile",
      },
    };
  }
  return { props: {} };
}) satisfies GetServerSideProps;

export default AuthPage;
