export default function ClientProject({
  params,
}: {
  params: { clientprojectid: string; id: string };
}) {
  return (
    <div>
      <h1>
        client/{params.id}/{params.clientprojectid}
      </h1>
    </div>
  );
}
