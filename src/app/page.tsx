

import Image from "next/image";
import { getProduct } from "@/lib/api/product";
import { getCategory } from "@/lib/api/category";

export default async function Home() {
  console.log("BASE API:", process.env.BASE_API);
  const products = await getCategory();
  console.log("Hello guru ! I am here" , products)

  return (
    <div className="home"></div>
  );
}
