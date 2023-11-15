import path from "path";
import fs from "fs/promises";
import { Product } from "@/types";

export async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const content = await fs.readFile(filePath, { encoding: "utf8" });
  const data: { products: Product[] } = JSON.parse(content);
  return data;
}
