import Link from "next/link";

const clients = [
  { id: 1, name: "Mustafa" },
  { id: 2, name: "Yoonjin" },
  { id: 3, name: "Malena" },
  { id: 4, name: "Emily" },
  { id: 5, name: "Maya" },
];

function ClientsPage() {
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            <Link href={`/clients/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
