import { GetServerSideProps } from "next";
import AuthForm from "../components/auth/auth-form";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: true,
      },
    };
  }
  return { props: {} };
}) satisfies GetServerSideProps;

export default AuthPage;
