"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Article, Author } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle, uploadImage } from "@/lib/data";
import { X, Upload, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  subtitle: z.string().min(10, { message: "Subtitle must be at least 10 characters long." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters long." }),
  authorId: z.string({ required_error: "Please select an author." }),
  category: z.string().min(1, { message: "Category is required." }),
  coverImage: z.string().url({ message: "A cover image is required." }).or(z.literal("")),
  content: z.string().min(50, { message: "Content must be at least 50 characters long." }),
  tags: z.array(z.object({ value: z.string().min(1) })),
  publishDate: z.string(),
  featured: z.boolean(),
  editorsPick: z.boolean(),
});

interface ArticleFormProps {
  article?: Article;
  authors: Author[];
}

export function ArticleForm({ article, authors }: ArticleFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(article?.coverImage || null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      subtitle: article?.subtitle || "",
      slug: article?.slug || "",
      authorId: article?.authorId || "",
      category: article?.category || "Fashion",
      coverImage: article?.coverImage || "",
      content: article?.content || "",
      tags: article?.tags.map(t => ({ value: t })) || [{ value: "" }],
      publishDate: article?.publishDate || new Date().toISOString(),
      featured: article?.featured || false,
      editorsPick: article?.editorsPick || false,
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadProgress(0);
    try {
      const downloadURL = await uploadImage(file, setUploadProgress);
      form.setValue("coverImage", downloadURL);
      setPreviewImage(downloadURL);
      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded.",
      });
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Image upload failed",
        description: "Could not upload the image. Please try again.",
      });
    } finally {
        setUploadProgress(null);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    form.setValue("coverImage", "");
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const articleData = {
      ...values,
      tags: values.tags.map(t => t.value),
    };

    if (!articleData.coverImage && previewImage) {
        articleData.coverImage = previewImage;
    }

    if (!articleData.coverImage) {
         toast({
            variant: "destructive",
            title: "Cover image is missing",
            description: "Please upload a cover image for the article.",
        });
        return;
    }

    try {
      if (article) {
        await updateArticle(article.id, articleData);
        toast({ title: "Article Updated", description: `"${values.title}" has been saved.` });
      } else {
        await createArticle(articleData);
        toast({ title: "Article Created", description: `"${values.title}" has been published.` });
      }
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not save the article. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Enter a brief subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g. my-awesome-article" {...field} />
              </FormControl>
               <FormDescription>
                This is the URL-friendly version of the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div>
                  {previewImage ? (
                    <div className="relative group aspect-video w-full">
                      <Image
                        src={previewImage}
                        alt="Cover preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={removeImage}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Input
                        id="cover-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <label
                        htmlFor="cover-image-upload"
                        className="group cursor-pointer"
                      >
                        <div className="aspect-video w-full rounded-md border-2 border-dashed border-input flex flex-col items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                          <Upload className="h-8 w-8 mb-2" />
                          <span>Click or drag to upload image</span>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </FormControl>
              {uploadProgress !== null && (
                <div className="flex items-center gap-2 mt-2">
                    <Progress value={uploadProgress} className="w-full" />
                    <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write the article content here..." {...field} rows={15} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Tags</FormLabel>
          <div className="space-y-2 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`tags.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={`Tag ${index + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          </div>
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
            Add Tag
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map(author => (
                        <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <div className="space-y-4">
            <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Featured Article</FormLabel>
                            <FormDescription>
                                Display this article in the main hero carousel on the homepage.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
             />
             <FormField
                control={form.control}
                name="editorsPick"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Editor's Pick</FormLabel>
                            <FormDescription>
                                Mark this article as an "Editor's Pick" on the homepage.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
             />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting || uploadProgress !== null}>
            {form.formState.isSubmitting ? "Saving..." : (article ? "Save Changes" : "Create Article")}
        </Button>
      </form>
    </Form>
  );
}
