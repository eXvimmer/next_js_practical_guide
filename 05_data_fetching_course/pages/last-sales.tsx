import { useEffect, useState } from "react";
interface Sale {
  id: string;
  username: string;
  volume: number;
}

export default function LastSalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`,
    )
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales.length) {
    return <p>Sales data is not avaialable yet</p>;
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
