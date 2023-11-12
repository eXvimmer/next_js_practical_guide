import { useRouter } from "next/router";

function ClientsProjectPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    // router.push(`/clients/client1/projectA`);
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: {
        id: "client1",
        clientprojectid: "projectA",
      },
    });
  }

  return (
    <div>
      <h1>Clients Projects Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientsProjectPage;
