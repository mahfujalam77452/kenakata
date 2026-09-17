import Link from "next/link"
import Image from "next/image"
import { Category } from "@/lib/types/Category"

export default function CategoryCard({category}:{category:Category}) {
    return (
        <>
           <Link
            key={category.id}
            href={`/products?categoryId=${category.id}`}
            className="group flex w-20 shrink-0 flex-col items-center gap-2 text-center sm:w-auto"
          >
            <span className="relative block h-16 w-16 overflow-hidden rounded-full border border-mist bg-white transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
              <Image
                src={category.image?.match(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i)? category.image : "https://i.imgur.com/BG8J0Fj.jpg"}
                alt={category.name.length < 20?category.name:"Kid's Toy"}
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <span className="text-xs font-medium text-ink sm:text-sm">{category.name.length < 20?category.name:"Kid's Toy"}</span>
          </Link>
        </>
    )
}