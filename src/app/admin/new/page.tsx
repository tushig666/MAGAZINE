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
import { getAuthors } from "@/lib/data";
import Link from "next/link";

export default async function NewArticlePage() {
    const authors = await getAuthors();
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">
          New Article
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
          <Input id="title" placeholder="Article Title" />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium mb-2">
            Subtitle
          </label>
          <Input id="subtitle" placeholder="Catchy Subtitle" />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <Textarea id="content" placeholder="Write your article here..." rows={15} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                 <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category
                </label>
                <Select>
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
                <Select>
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
            <Input id="tags" placeholder="e.g. Streetwear, Dior, Kanye West" />
            <p className="text-xs text-muted-foreground mt-1">Separate tags with a comma.</p>
        </div>


        <div className="flex justify-end gap-4">
            <Button variant="secondary">Save Draft</Button>
            <Button>Publish Article</Button>
        </div>
      </form>
    </div>
  );
}
