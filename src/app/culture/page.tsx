import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default function CulturePage() {
  const cultureArticles = articles.filter(
    (article) => article.category === "Culture"
  );

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Culture</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The people, movements, and moments shaping the cultural zeitgeist.
        </p>
      </header>

      {cultureArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-headline">No Articles Yet</h2>
            <p className="text-muted-foreground mt-2">Check back soon for the latest in culture.</p>
        </div>
      )}
    </div>
  );
}
