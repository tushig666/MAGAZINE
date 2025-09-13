import { getArticles } from "@/lib/data";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ArticleCard } from "@/components/articles/ArticleCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const allArticles = await getArticles();
  
  const featuredArticles = allArticles.filter((article) => article.featured);
  const latestArticles = allArticles
    .sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 4);
  const editorsPicks = allArticles.filter((article) => article.editorsPick);

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroCarousel articles={featuredArticles} />

      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Latest Stories
            </h2>
            <Button variant="link" asChild>
                <Link href="/fashion">View All Stories</Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
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
