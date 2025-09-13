"use server";

import { createArticle, deleteArticle, updateArticle } from "@/lib/data";
import type { Article } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// This is a simplified Zod-like validation for server actions
function validateArticle(data: any) {
    if (!data.title || typeof data.title !== 'string' || data.title.length < 1) throw new Error("Title is required");
    if (!data.subtitle || typeof data.subtitle !== 'string' || data.subtitle.length < 1) throw new Error("Subtitle is required");
    if (!data.slug || typeof data.slug !== 'string' || !/^[a-z0-9-]+$/.test(data.slug)) throw new Error("Invalid slug");
    if (!data.content || typeof data.content !== 'string' || data.content.length < 10) throw new Error("Content is too short");
    if (!data.coverImage || typeof data.coverImage !== 'string' || !data.coverImage.startsWith('http')) throw new Error("Invalid image URL");
    if (!data.authorId || typeof data.authorId !== 'string') throw new Error("Author is required");
    if (!data.category || !["Fashion", "Art", "Culture"].includes(data.category)) throw new Error("Invalid category");
    if (!data.tags || typeof data.tags !== 'string') throw new Error("Tags are required");
}

export async function saveArticle(
  articleId: string | undefined,
  formData: { [key: string]: any }
): Promise<Article> {

  // Basic validation
  validateArticle(formData);

  const articleData = {
    ...formData,
    tags: formData.tags.split(",").map((tag: string) => tag.trim()),
    // These are not in the form, so we set default values
    featured: false,
    editorsPick: false,
    publishDate: new Date().toISOString(),
    imageHint: 'user provided'
  };

  let savedArticle: Article | null = null;

  if (articleId) {
    // Update existing article
    savedArticle = await updateArticle(articleId, articleData);
     if (savedArticle) {
      revalidatePath(`/articles/${savedArticle.slug}`);
    }
  } else {
    // Create new article
    savedArticle = await createArticle(articleData);
  }

  if (!savedArticle) {
    throw new Error("Failed to save article");
  }

  // Revalidate paths to reflect changes
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/${savedArticle.category.toLowerCase()}`);


  return savedArticle;
}


export async function deleteArticleAction(articleId: string): Promise<void> {
    if (!articleId) {
        throw new Error("Article ID is required to delete.");
    }
    
    // First, get the article to revalidate its paths before deletion
    // In a real app with Firestore, you'd fetch it first.
    // Since we're using a mock, we just assume revalidation paths.
    
    await deleteArticle(articleId);
    
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/fashion');
    revalidatePath('/art');
    revalidatePath('/culture');
}
