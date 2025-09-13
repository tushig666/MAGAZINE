import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default function ArtPage() {
  const artArticles = articles.filter(
    (article) => article.category === "Art"
  );

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Art</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Exploring the intersection of art and fashion, from contemporary galleries to digital installations.
        </p>
      </header>
       {artArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-headline">No Articles Yet</h2>
            <p className="text-muted-foreground mt-2">Check back soon for the latest in art.</p>
        </div>
      )}
    </div>
  );
}
