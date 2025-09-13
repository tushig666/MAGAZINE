"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchArticles } from "@/lib/data";
import type { Article } from "@/lib/types";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fashion", label: "Fashion" },
  { href: "/art", label: "Art" },
  { href: "/culture", label: "Culture" },
  { href: "/events", label: "Events" },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isSearchOpen]);
  
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setIsSearching(true);
      const delayDebounceFn = setTimeout(async () => {
        const results = await searchArticles(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-headline tracking-tight" style={{fontFamily: "'Libre Baskerville', serif"}}>
            BITCHESGONEMAAD
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                    "transition-colors hover:text-primary",
                    pathname === href ? "text-primary" : "text-foreground/60"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Search BITCHESGONEMAAD</DialogTitle>
                <DialogDescription>
                  Find articles about fashion, art, and culture.
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="e.g. 'Kanye West'"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {isSearching && <p className="text-muted-foreground">Searching...</p>}
                {searchResults.length > 0 ? (
                  searchResults.map(article => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group flex items-start gap-4 rounded-md p-2 -mx-2 hover:bg-secondary"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                          data-ai-hint={article.imageHint}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.subtitle}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  searchQuery.length > 2 && !isSearching && <p className="text-muted-foreground text-center py-4">No results found.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="mb-4 text-2xl font-headline tracking-tight" onClick={() => setSheetOpen(false)} style={{fontFamily: "'Libre Baskerville', serif"}}>
                  BITCHESGONEMAAD
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === href ? "text-primary" : ""
                      )}
                      onClick={() => setSheetOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
