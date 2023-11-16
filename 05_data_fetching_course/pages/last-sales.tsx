import { useState } from "react";
import useSWR from "swr";

interface Sale {
  id: string;
  username: string;
  volume: number;
}

export default function LastSalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  const { data, error, isLoading } = useSWR(
    `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const transformedData: Sale[] = [];
          for (const key in data) {
            transformedData.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }
          setSales(transformedData);
          return data;
        }),
  );

  if (error) {
    return <p>failed to load the data</p>;
  }

  if (isLoading || !data || !sales.length) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((s) => {
        return (
          <li key={s.id}>
            {s.username} - ${s.volume}
          </li>
        );
      })}
    </ul>
  );
}
