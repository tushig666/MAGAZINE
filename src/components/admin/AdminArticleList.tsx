"use client";

import type { Article } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface AdminArticleListProps {
  articles: Article[];
}

export function AdminArticleList({ articles }: AdminArticleListProps) {
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      // Add delete logic here later
      alert(`Article with id ${id} would be deleted.`);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.title}</TableCell>
            <TableCell>{article.category}</TableCell>
            <TableCell>
              {new Date(article.publishDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/edit/${article.slug}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(article.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
