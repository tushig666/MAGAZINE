import { getAuthors } from "@/lib/data";
import { ArticleForm } from "@/app/admin/article-form";

export default async function NewArticlePage() {
  const authors = await getAuthors();
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          New Article
        </h1>
        <p className="text-muted-foreground mt-2">Create a new post for the magazine.</p>
      </header>

      <ArticleForm authors={authors} />
    </div>
  );
}
