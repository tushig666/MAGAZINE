"use client";

import { useEffect, useState } from "react";
import { generateArticleReadTime } from "@/ai/flows/generate-article-read-time";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Newspaper } from "lucide-react";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const [readTime, setReadTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReadTime = async () => {
      setIsLoading(true);
      try {
        const result = await generateArticleReadTime({ content });
        setReadTime(result.readTimeMinutes);
      } catch (error) {
        console.error("Failed to generate read time:", error);
        // Fallback for read time
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        setReadTime(Math.ceil(wordCount / wordsPerMinute));
      } finally {
        setIsLoading(false);
      }
    };
    fetchReadTime();
  }, [content]);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
      <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground border-y py-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {isLoading || readTime === null ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <span>{readTime} minute read</span>
          )}
        </div>
      </div>
      <p className="lead text-xl text-foreground/80">{content.substring(0, content.indexOf('.') + 1)}</p>
      {content
        .substring(content.indexOf('.') + 1)
        .split("\n")
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  );
}
