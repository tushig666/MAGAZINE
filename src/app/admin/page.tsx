"use client";

import { getArticles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminArticleList } from "@/components/admin/AdminArticleList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/admin/new">Create New Article</Link>
          </Button>
        </div>
      </header>
       {loading ? <p>Loading articles...</p> : <AdminArticleList articles={articles} />}
    </div>
  );
}
