"use client";

import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { summarizeArticle } from "@/ai/flows/ai-powered-content-summaries";
import { generateArticleReadTime } from "@/ai/flows/generate-article-read-time";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [readTime, setReadTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAiData = async () => {
      setIsLoading(true);
      try {
        const [summaryResult, readTimeResult] = await Promise.all([
          summarizeArticle({ articleContent: article.content }),
          generateArticleReadTime({ content: article.content }),
        ]);
        setSummary(summaryResult.summary);
        setReadTime(readTimeResult.readTimeMinutes);
      } catch (error) {
        console.error("Failed to fetch AI data:", error);
        // Fallback to a truncated subtitle if summary fails
        setSummary(article.subtitle.slice(0, 100) + '...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiData();
  }, [article.content, article.subtitle]);

  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={article.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1 flex flex-col">
          <Badge variant="outline" className="mb-2 w-fit">{article.category}</Badge>
          <CardTitle className="font-headline text-xl leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <div className="mt-3 text-sm text-muted-foreground flex-1">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
              <p>{summary}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between">
           <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {isLoading || readTime === null ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <span>{readTime} min read</span>
            )}
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
