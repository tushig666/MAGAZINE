import { getArticles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminArticleList } from "@/components/admin/AdminArticleList";

export default async function AdminPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          Admin Dashboard
        </h1>
        <Button asChild>
          <Link href="/admin/new">Create New Article</Link>
        </Button>
      </header>
      <AdminArticleList articles={articles} />
    </div>
  );
}
