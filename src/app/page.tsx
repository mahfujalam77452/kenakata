

import Image from "next/image";
import { getProduct } from "@/lib/api/product";


import HeroSection from "@/components/ui/Hero";
import CategorySection from "@/components/category/CategorySection";

export default async function Home() {
  

  return (
    <div className="home">
      <HeroSection/>
      <CategorySection/>
    </div>
  );
}
