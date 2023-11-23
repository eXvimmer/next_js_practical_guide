export default function UserIdPage({ params }: { params: { uid: string } }) {
  return (
    <div>
      <h1>{params.uid}</h1>
    </div>
  );
}
