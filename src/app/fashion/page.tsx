import { getArticles } from "@/lib/data";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default async function FashionPage() {
  const fashionArticles = await getArticles("Fashion");

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Fashion</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The latest trends, runway analysis, and stories from the world of high fashion.
        </p>
      </header>

      {fashionArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fashionArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-headline">No Articles Yet</h2>
            <p className="text-muted-foreground mt-2">Check back soon for the latest in fashion.</p>
        </div>
      )}
    </div>
  );
}
