import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { articles, authors } from "@/lib/data";
import Link from "next/link";

export default function EditArticlePage({ params }: { params: { slug: string } }) {
    const article = articles.find((a) => a.slug === params.slug);

    if (!article) {
        notFound();
    }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Edit Article
        </h1>
         <Button variant="outline" asChild>
          <Link href="/admin">Cancel</Link>
        </Button>
      </header>

      <form className="max-w-3xl mx-auto space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input id="title" defaultValue={article.title} />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium mb-2">
            Subtitle
          </label>
          <Input id="subtitle" defaultValue={article.subtitle} />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <Textarea id="content" defaultValue={article.content} rows={15} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                 <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category
                </label>
                <Select defaultValue={article.category}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="Culture">Culture</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Author
                </label>
                <Select defaultValue={article.authorId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                        {authors.map(author => (
                            <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">Tags</label>
            <Input id="tags" defaultValue={article.tags.join(", ")} />
            <p className="text-xs text-muted-foreground mt-1">Separate tags with a comma.</p>
        </div>


        <div className="flex justify-between items-center">
            <Button variant="destructive">Delete Article</Button>
            <div className="flex gap-4">
                <Button variant="secondary">Save Draft</Button>
                <Button>Publish Changes</Button>
            </div>
        </div>
      </form>
    </div>
  );
}
