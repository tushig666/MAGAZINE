import { notFound } from "next/navigation";
import { getArticle, getAuthors } from "@/lib/data";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  const authors = await getAuthors();

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          Edit Article
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Editing: "{article.title}"
        </p>
      </header>
      <div className="max-w-2xl mx-auto">
        <ArticleForm article={article} authors={authors} />
      </div>
    </div>
  );
}
