import { ArticleForm } from "@/components/admin/ArticleForm";
import { getAuthors } from "@/lib/data";

export default async function NewArticlePage() {
  const authors = await getAuthors();
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          Create New Article
        </h1>
      </header>
      <div className="max-w-2xl mx-auto">
        <ArticleForm authors={authors} />
      </div>
    </div>
  );
}
