import { articles } from "@/lib/data";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ArticleCard } from "@/components/articles/ArticleCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredArticles = articles.filter((article) => article.featured);
  const latestArticles = articles
    .sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 4);
  const editorsPicks = articles.filter((article) => article.editorsPick);

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroCarousel articles={featuredArticles} />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          Latest Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {editorsPicks.length > 0 && (
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              Editor's Picks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editorsPicks.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
