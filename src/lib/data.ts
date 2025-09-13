// This is a temporary data store.
// It will be replaced with Firebase Firestore.
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { Author, Article, Event } from "@/lib/types";

// --- Seed Data (for initial setup) ---

let authorsData: Author[] = [
  {
    id: 'author-1',
    name: 'Julien Renault',
    avatarUrl: 'https://picsum.photos/seed/author1/100/100',
    imageHint: 'man portrait',
    bio: 'Julien is a Paris-based fashion journalist and critic, known for his sharp analysis of couture and ready-to-wear. He has contributed to major fashion publications for over a decade.'
  },
  {
    id: 'author-2',
    name: 'Lexi Chen',
    avatarUrl: 'https://picsum.photos/seed/author2/100/100',
    imageHint: 'woman portrait',
    bio: 'Lexi is a culture writer and photographer based in New York. Her work explores the intersection of street style, music, and art, capturing the zeitgeist of modern youth culture.'
  },
   {
    id: 'author-3',
    name: 'Simone Jackson',
    avatarUrl: 'https://picsum.photos/seed/author3/100/100',
    imageHint: 'woman smiling',
    bio: 'Simone is an art historian and curator specializing in contemporary digital art. She is a vocal advocate for new media artists and the integration of technology in creative expression.'
  }
];

let articlesData: Article[] = [
    {
    id: 'article-1',
    authorId: 'author-1',
    slug: 'asap-rocky-kanye-west-new-fashion-royalty',
    title: 'A$AP Rocky & Kanye West: The New Fashion Royalty',
    subtitle: 'How two hip-hop icons reshaped the landscape of modern fashion.',
    coverImage: 'https://picsum.photos/seed/asap-kanye/1200/800',
    imageHint: 'men fashion',
    content: "The worlds of hip-hop and high fashion have been intertwined for decades, but no two artists have blurred the lines quite like A$AP Rocky and Kanye West. From their early adoptions of avant-garde designers to launching their own billion-dollar brands, they've not only followed trends but have become the trendsetters themselves. This article delves into their style evolution, their impact on major fashion houses, and how they've redefined what it means to be a fashion icon in the 21st century. We'll explore key moments, from Kanye's game-changing Yeezy line to A$AP's collaborations with Dior and other luxury brands, analyzing their influence on streetwear and haute couture alike.",
    tags: ['Hip-Hop', 'Kanye West', 'A$AP Rocky', 'Streetwear', 'High Fashion'],
    category: 'Fashion',
    publishDate: '2024-07-20T10:00:00Z',
    featured: true,
    editorsPick: false,
  },
  {
    id: 'article-2',
    authorId: 'author-2',
    slug: 'dior-enduring-power-of-the-new-look',
    title: 'Dior: The Enduring Power of the New Look',
    subtitle: "Over 75 years later, Christian Dior's revolutionary silhouette continues to inspire.",
    coverImage: 'https://picsum.photos/seed/dior-power/1200/800',
    imageHint: 'elegant dress',
    content: "In the post-war austerity of 1947, Christian Dior unveiled a collection that would forever change the course of fashion. Dubbed the 'New Look,' its voluminous skirts, cinched waists, and soft shoulders were a radical departure from the utilitarian styles of the time. This piece explores the historical context of the New Look, its immediate and lasting impact, and how successive creative directors at the house of Dior—from Yves Saint Laurent to Maria Grazia Chiuri—have reinterpreted its core principles for a new generation. We examine the 'Bar' jacket and its countless iterations, a testament to the timelessness of a single, revolutionary idea.",
    tags: ['Dior', 'Christian Dior', 'New Look', 'Fashion History', 'Couture'],
    category: 'Fashion',
    publishDate: '2024-07-18T14:30:00Z',
    featured: true,
    editorsPick: true,
  },
  {
    id: 'article-3',
    authorId: 'author-2',
    slug: 'age-of-the-supermodel-beyond-the-runway',
    title: 'The Age of the Supermodel: Beyond the Runway',
    subtitle: 'From runway stars to cultural icons and business moguls.',
    coverImage: 'https://picsum.photos/seed/supermodels-runway/1200/800',
    imageHint: 'models posing',
    content: "The term 'supermodel' was coined in the 90s to describe a new breed of models who transcended the runway to become global celebrities. Naomi, Cindy, Linda, and Christy were more than just faces; they were personalities, brands, and forces of nature. This article traces the rise of the supermodel phenomenon, its cultural impact, and how the role has evolved in the age of social media. We look at the original supers and the new generation—like Kendall Jenner and Gigi Hadid—exploring how they leverage their platforms for activism, entrepreneurship, and shaping cultural conversations, proving that their influence extends far beyond the clothes they wear.",
    tags: ['Supermodels', '90s Fashion', 'Naomi Campbell', 'Kendall Jenner', 'Culture'],
    category: 'Culture',
    publishDate: '2024-07-15T11:00:00Z',
    featured: true,
    editorsPick: false,
  },
  {
    id: 'article-4',
    authorId: 'author-1',
    slug: 'balenciaga-from-couture-to-street-culture',
    title: 'Balenciaga: From Couture to Street Culture',
    subtitle: "Under Demna's vision, a storied couture house became the king of streetwear.",
    coverImage: 'https://picsum.photos/seed/balenciaga-demna/1200/800',
    imageHint: 'edgy fashion',
    content: "Founded by the master of shape and form, Cristóbal Balenciaga, the house of Balenciaga has a rich history in haute couture. Yet, in recent years, it has become synonymous with a completely different aesthetic: ironic, oversized, and deeply embedded in street and internet culture. This transformation was masterminded by creative director Demna. We investigate this seismic shift, analyzing how Demna has deconstructed and recontextualized luxury for the modern era. From the Triple S sneaker to collaborations with The Simpsons, we explore the strategies that made Balenciaga one of the most talked-about and influential brands in the world.",
    tags: ['Balenciaga', 'Demna', 'Streetwear', 'Luxury', 'Fashion'],
    category: 'Fashion',
    publishDate: '2024-07-12T09:00:00Z',
    featured: false,
    editorsPick: true,
  },
  {
    id: 'article-5',
    authorId: 'author-3',
    slug: 'interview-with-hedi-slimane',
    title: 'An Interview With Hedi Slimane',
    subtitle: 'The enigmatic designer on his vision for Celine, photography, and the power of youth.',
    coverImage: 'https://picsum.photos/seed/hedi-interview/1200/800',
    imageHint: 'man thinking',
    content: "Hedi Slimane is one of fashion's most influential, and controversial, figures. His razor-sharp tailoring and rock-and-roll aesthetic redefined menswear at Dior Homme in the 2000s and created commercial tidal waves at Saint Laurent. Now at Celine, he continues to project his singular, unwavering vision. In a rare and candid interview, Slimane discusses his creative process, his passion for photography, and the role of music and youth culture as the constant engine of his work. He shares his thoughts on the state of the fashion industry and why he remains committed to a vision of aspirational, timeless style.",
    tags: ['Hedi Slimane', 'Celine', 'Dior Homme', 'Fashion Design', 'Interview'],
    category: 'Fashion',
    publishDate: '2024-07-10T16:00:00Z',
    featured: false,
    editorsPick: false,
  },
  {
    id: 'article-6',
    authorId: 'author-3',
    slug: 'art-in-the-age-of-instagram',
    title: 'Art in the Age of Instagram',
    subtitle: 'How social media has changed the way we create, consume, and value art.',
    coverImage: 'https://picsum.photos/seed/art-instagram/1200/800',
    imageHint: 'phone art gallery',
    content: "Instagram has become a virtual gallery, a marketplace, and a performance stage for the art world. Artists can now bypass traditional gatekeepers, connecting directly with a global audience. But what is the cost? This article explores the multifaceted impact of social media on art. We examine how algorithms influence aesthetic trends, the rise of the 'Instagrammable' exhibition, and the debate over digital versus physical experiences. Featuring interviews with artists, gallerists, and critics, we ask whether social media is democratizing the art world or simply creating a new set of rules and pressures.",
    tags: ['Art', 'Social Media', 'Instagram', 'Digital Art', 'Contemporary Art'],
    category: 'Art',
    publishDate: '2024-07-08T12:00:00Z',
    featured: false,
    editorsPick: true,
  },
  {
    id: 'article-7',
    authorId: 'author-2',
    slug: 'the-rise-of-k-pop-a-global-phenomenon',
    title: 'The Rise of K-Pop: A Global Cultural Phenomenon',
    subtitle: 'Beyond the music, K-Pop is a universe of fashion, beauty, and fan culture.',
    coverImage: 'https://picsum.photos/seed/kpop-phenomenon/1200/800',
    imageHint: 'kpop group',
    content: "In just over a decade, K-Pop has grown from a regional music genre into a multi-billion dollar global industry that influences everything from fashion trends to beauty standards. Groups like BTS and Blackpink are household names, commanding legions of dedicated fans. This article unpacks the K-Pop phenomenon, exploring the meticulous training systems, the stunning visual productions, and the powerful bond between idols and their fandoms. We analyze K-Pop's unique blend of music, performance, and fashion, and its role as a major force of South Korean soft power on the world stage.",
    tags: ['K-Pop', 'BTS', 'Blackpink', 'Music', 'Culture'],
    category: 'Culture',
    publishDate: '2024-07-05T15:00:00Z',
    featured: false,
    editorsPick: false,
  }
];

let eventsData: Event[] = [
  {
    id: 'event-1',
    slug: 'louis-vuitton-x-pop-up',
    title: "Louis Vuitton 'X' Pop-Up Experience",
    description: "An immersive journey through 160 years of artistic collaborations and creative exchanges from the Maison's archives. Discover rare pieces and interactive installations.",
    image: 'https://picsum.photos/seed/lv-experience/1200/800',
    imageHint: 'luxury fashion',
    location: {
      name: 'Gagosian Gallery, Chelsea',
      address: '555 W 24th St, New York, NY 10011'
    },
    date: '2024-08-15T10:00:00Z',
    time: '11:00 AM - 7:00 PM Daily'
  },
  {
    id: 'event-2',
    slug: 'saint-laurent-rive-droite-gallery',
    title: 'Saint Laurent Rive Droite Ephemeral Gallery',
    description: 'A temporary gallery curated by Anthony Vaccarello, featuring a selection of contemporary art, rare books, and vintage furniture that reflects the Saint Laurent universe.',
    image: 'https://picsum.photos/seed/sl-gallery/1200/800',
    imageHint: 'minimalist gallery',
    location: {
      name: 'Rive Droite',
      address: '213 Rue Saint-Honoré, 75001 Paris, France'
    },
    date: '2024-09-05T10:00:00Z',
    time: '10:00 AM - 6:00 PM'
  },
  {
    id: 'event-3',
    slug: 'balenciaga-couture-show-screening',
    title: "Screening: Balenciaga's 52nd Couture Show",
    description: "An exclusive public screening of Demna's latest couture collection for Balenciaga. Experience the artistry and innovation of modern haute couture on the big screen.",
    image: 'https://picsum.photos/seed/balenciaga-show/1200/800',
    imageHint: 'fashion show',
    location: {
      name: 'The Landmark Theatre',
      address: '10850 W Pico Blvd, Los Angeles, CA 90064'
    },
    date: '2024-08-22T19:00:00Z',
    time: '7:30 PM'
  },
   {
    id: 'event-4',
    slug: 'met-gala-retrospective',
    title: 'The Met Gala: A Fashion Retrospective',
    description: "Explore the most iconic looks from the Met Gala's history in this stunning retrospective. See up close the garments that defined a generation of red carpets.",
    image: 'https://picsum.photos/seed/met-gala/1200/800',
    imageHint: 'red carpet',
    location: {
      name: 'The Metropolitan Museum of Art',
      address: '1000 5th Ave, New York, NY 10028'
    },
    date: '2024-10-01T10:00:00Z',
    time: '10:00 AM - 5:00 PM'
  },
  {
    id: 'event-5',
    slug: 'prada-mode-tokyo',
    title: 'Prada Mode Tokyo',
    description: "A traveling social club with a focus on contemporary culture, providing members a unique art experience along with music, dining, and conversation.",
    image: 'https://picsum.photos/seed/prada-tokyo/1200/800',
    imageHint: 'modern architecture',
    location: {
      name: 'Shibuya Stream Hall',
      address: '3-21-3 Shibuya, Shibuya City, Tokyo, Japan'
    },
    date: '2024-11-12T18:00:00Z',
    time: '6:00 PM onwards'
  },
  {
    id: 'event-6',
    slug: 'art-basel-miami-beach',
    title: 'Art Basel Miami Beach 2024',
    description: "The world's leading contemporary art fair returns to Miami Beach. Discover works from leading galleries and emerging artists from across the globe.",
    image: 'https://picsum.photos/seed/art-basel/1200/800',
    imageHint: 'art gallery',
    location: {
      name: 'Miami Beach Convention Center',
      address: '1901 Convention Center Dr, Miami Beach, FL 33139'
    },
    date: '2024-12-06T11:00:00Z',
    time: '11:00 AM - 6:00 PM'
  }
];


// --- API Functions ---

// Author Functions
export async function getAuthors(): Promise<Author[]> {
  console.log("Returning static author data.");
  return authorsData;
}

export async function getAuthor(id: string): Promise<Author | null> {
    console.log(`Getting static author data for id: ${id}`);
    const author = authorsData.find(a => a.id === id) || null;
    return author;
}

// Article Functions
export async function getArticles(category?: string): Promise<Article[]> {
    console.log(`Returning static article data. Category: ${category || 'all'}`);
    let articles = articlesData;
    if (category) {
        articles = articlesData.filter(a => a.category === category);
    }
    return articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getArticle(slug: string): Promise<Article | null> {
    console.log(`Getting static article data for slug: ${slug}`);
    const article = articlesData.find(a => a.slug === slug) || null;
    return article;
}

// Event Functions
export async function getEvents(): Promise<Event[]> {
  console.log("Returning static event data.");
  return eventsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getEvent(slug: string): Promise<Event | null> {
    console.log(`Getting static event data for slug: ${slug}`);
    const event = eventsData.find(e => e.slug === slug) || null;
    return event;
}

export async function addRsvp(eventId: string, email: string): Promise<void> {
  console.log(`(Static) RSVP added for ${email} to event ${eventId}. This is not persisted.`);
  // In a real scenario, this would interact with a database.
  // For this temporary solution, we do nothing.
}


export async function createArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const newId = `article-${Date.now()}`;
    const newArticle: Article = { ...article, id: newId };
    articlesData.unshift(newArticle);
    console.log(`(Static) Created article with ID: ${newId}`);
    return newArticle;
}

export async function updateArticle(id: string, articleUpdate: Partial<Omit<Article, 'id'>>): Promise<Article | null> {
    const articleIndex = articlesData.findIndex(a => a.id === id);
    if (articleIndex === -1) {
        console.log(`(Static) Article with ID ${id} not found for update.`);
        return null;
    }
    articlesData[articleIndex] = { ...articlesData[articleIndex], ...articleUpdate };
    console.log(`(Static) Updated article with ID: ${id}`);
    return articlesData[articleIndex];
}

export async function deleteArticle(id: string): Promise<void> {
    const initialLength = articlesData.length;
    articlesData = articlesData.filter(a => a.id !== id);
    if (articlesData.length < initialLength) {
        console.log(`(Static) Deleted article with ID: ${id}`);
    } else {
        console.log(`(Static) Article with ID ${id} not found for deletion.`);
    }
}

export async function searchArticles(queryText: string): Promise<Article[]> {
  if (!queryText) {
    return [];
  }
  const lowercasedQuery = queryText.toLowerCase();
  
  const results = articlesData.filter(article =>
    article.title.toLowerCase().includes(lowercasedQuery) ||
    article.subtitle.toLowerCase().includes(lowercasedQuery) ||
    article.content.toLowerCase().includes(lowercasedQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
  );
  console.log(`(Static) Found ${results.length} articles for query: "${queryText}"`);
  return results;
}


export function uploadImage(
  file: File,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    onProgress(20);
    // This is a mock upload. It returns a picsum URL after a short delay.
    setTimeout(() => {
        onProgress(60);
        setTimeout(() => {
            onProgress(100);
            const randomId = Math.floor(Math.random() * 1000);
            resolve(`https://picsum.photos/seed/${randomId}/1200/800`);
        }, 300);
    }, 300);
  });
}
