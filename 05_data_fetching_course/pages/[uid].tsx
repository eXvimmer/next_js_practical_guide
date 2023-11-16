import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserIdPage({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{userId}</h1>
    </div>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const userId = params?.uid as string;
  return {
    props: {
      userId: "user-" + userId,
    },
  };
}) satisfies GetServerSideProps;
