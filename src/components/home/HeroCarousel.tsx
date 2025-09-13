"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  articles: Article[];
}

export function HeroCarousel({ articles }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem key={article.id}>
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                data-ai-hint={article.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-8 md:p-12">
                <div className="max-w-4xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                    Featured Story
                  </p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight">
                    {article.title}
                  </h1>
                  <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                    {article.subtitle}
                  </p>
                  <Button asChild className="mt-8" size="lg">
                    <Link href={`/articles/${article.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 text-white bg-white/10 hover:bg-white/20 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 text-white bg-white/10 hover:bg-white/20 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Carousel>
  );
}
