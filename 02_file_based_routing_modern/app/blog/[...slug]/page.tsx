export default function BlogPage({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {params.slug.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
