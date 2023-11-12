import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query);

  return <div>selected client project page</div>;
}

export default SelectedClientProjectPage;
