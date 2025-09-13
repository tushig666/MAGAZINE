import { notFound } from "next/navigation";
import Image from "next/image";
import { articles, authors } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ArticleContent from "@/components/articles/ArticleContent";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Copy } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);


export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const author = authors.find((a) => a.id === article.authorId);

  const publishDate = new Date(article.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Hero Section */}
      <header className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          data-ai-hint={article.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <Badge>{article.category}</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-headline font-bold">
            {article.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            {article.subtitle}
          </p>
          {author && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Avatar>
                <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint={author.imageHint} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{author.name}</p>
                <p className="text-sm text-white/70">{publishDate}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Article Body */}
      <div className="container max-w-3xl mx-auto py-12 md:py-20 px-4">
        <ArticleContent content={article.content} />

        <div className="mt-12 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author Bio & Social Share */}
        <div className="mt-16 border-t pt-10">
          <div className="flex flex-col sm:flex-row gap-8">
            {author && (
              <div className="flex-1">
                <h3 className="font-headline text-xl font-semibold mb-4">About the Author</h3>
                 <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint={author.imageHint}/>
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{author.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="sm:w-1/3">
              <h3 className="font-headline text-xl font-semibold mb-4">Share this Article</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} target="_blank">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                   <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://bitchesgonemaad.com/articles/' + article.slug)}`} target="_blank">
                    <FacebookIcon />
                  </Link>
                </Button>
                 <Button variant="outline" size="icon" asChild>
                   <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://bitchesgonemaad.com/articles/' + article.slug)}`} target="_blank">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
