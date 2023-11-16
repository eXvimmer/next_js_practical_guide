import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserProfilePage({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export const getServerSideProps = (async (/* context */) => {
  return {
    props: {
      username: "Mustafa",
    },
  };
}) satisfies GetServerSideProps;
