"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// images for slider
const CAROUSEL_SLIDES = [
  { id: 1, src: "https://images.othoba.com/images/thumbs/2636160_RFL_Waredrop_Top_Slider_Web_16July2026.jpeg", href: "#", alt: "Promo slide for Bike" },
  { id: 2, src: "https://images.othoba.com/images/thumbs/2613148_Pureit_Top_Slider_Web_20August2026.png", href: "#", alt: "Promo slide for 3 piece" },
  { id: 3, src: "https://images.othoba.com/images/thumbs/2139183_GpTopslider%20Web.png", href: "#", alt: "Promo slide for clouth" },
  { id: 4, src: "https://images.othoba.com/images/thumbs/2670710_American_Express_Top_Slider_Web_06September2026%20(3).jpeg", href: "#", alt: "Promo slide for Ribe" },
  { id: 5, src: "https://images.othoba.com/images/thumbs/2610406_Tvs_Bike_Top_Slider_Web_19Aug2026%20(1).jpeg", href: "#", alt: "Promo slide for bold" },
];

//images for side bar
const STATIC_PROMOS = [
  { id: 1, src: "/product_one.jpg", href: "#", alt: "Promo product Bike" },
  { id: 2, src: "/poduct_two.jpg", href: "#", alt: "Promo product cycle" },
  { id: 3, src: "/product_three.jpg", href: "#", alt: "Promo product toy" },
  { id: 4, src: "/product_four.jpg", href: "#", alt: "Promo product buscat" },
];

const AUTO_SLIDE_INTERVAL_MS = 2000;


export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = CAROUSEL_SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slideCount]);

  const goTo = (index: number) => {
    setActiveSlide((index + slideCount) % slideCount);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-4 lg:grid-cols-12">
        {/* Auto-sliding carousel */}
        <div className="relative overflow-hidden rounded-xl lg:col-span-8">
          <div className="relative aspect-[5/2] w-full lg:aspect-auto lg:h-[440px]">
            
            <div
  className="flex h-full transition-transform duration-700 ease-in-out"
  style={{
    width: `${slideCount * 100}%`,
    transform: `translateX(-${activeSlide * (100 / slideCount)}%)`,
  }}
>
  {CAROUSEL_SLIDES.map((slide, index) => (
    <Link
      key={slide.id}
      href={slide.href}
      className="relative h-full shrink-0"
      style={{
        width: `${100 / slideCount}%`,
      }}
      aria-hidden={index !== activeSlide}
      tabIndex={index === activeSlide ? 0 : -1}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover"
        priority={index === 0}
      />
    </Link>
  ))}
</div>
          </div>

          {/* Prev / next arrows */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeSlide - 1)}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm transition-colors hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeSlide + 1)}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-sm transition-colors hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {CAROUSEL_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeSlide ? "w-5 bg-accent-marigold" : "w-1.5 bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Promo panel: 2x2 on mobile/tablet, 2-horizontal + 2-vertical on desktop */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:h-full lg:grid-rows-3">
          {STATIC_PROMOS.map((promo, index) => (
            <Link
              key={promo.id}
              href={promo.href}
              className={`relative aspect-[5/2] overflow-hidden rounded-sm bg-mist lg:aspect-auto ${
                index >= 2 ? "lg:col-span-2" : ""
              }`}
            >
              <Image
                src={promo.src}
                alt={promo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}