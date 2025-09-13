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
// import { summarizeArticle } from "@/ai/flows/ai-powered-content-summaries";
// import { generateArticleReadTime } from "@/ai/flows/generate-article-read-time";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [readTime, setReadTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // AI-powered summary and read time calculation is disabled for now.
  // We can re-enable this later with a more optimized strategy.
  // useEffect(() => {
  //   const fetchAiData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const [summaryResult, readTimeResult] = await Promise.all([
  //         summarizeArticle({ articleContent: article.content }),
  //         generateArticleReadTime({ content: article.content }),
  //       ]);
  //       setSummary(summaryResult.summary);
  //       setReadTime(readTimeResult.readTimeMinutes);
  //     } catch (error) {
  //       console.error("Failed to fetch AI data:", error);
  //       setSummary(article.subtitle.slice(0, 100) + '...');
  //       const wordsPerMinute = 200;
  //       const wordCount = article.content.split(/\s+/).length;
  //       setReadTime(Math.ceil(wordCount / wordsPerMinute));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchAiData();
  // }, [article.content, article.subtitle]);

  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <div className="overflow-hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            data-ai-hint={article.imageHint}
          />
        </div>
        <div className="pt-4">
          <Badge variant="outline" className="mb-2 rounded-sm border-foreground/40 text-foreground/60 text-xs tracking-widest">
            {article.category.toUpperCase()}
          </Badge>
          <h3 className="font-headline text-lg md:text-xl leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
