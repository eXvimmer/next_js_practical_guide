export default function SelectedClientPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Client #{params.id}</h1>
    </div>
  );
}
