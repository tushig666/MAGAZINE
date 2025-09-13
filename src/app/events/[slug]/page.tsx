import { notFound } from "next/navigation";
import Image from "next/image";
import { events } from "@/lib/data";
import { RsvpModal } from "@/components/events/RsvpModal";
import { Calendar, MapPin, Clock } from "lucide-react";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: 'long',
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Hero Section */}
      <header className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
          data-ai-hint={event.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold">
            {event.title}
          </h1>
        </div>
      </header>

      {/* Event Details */}
      <div className="container max-w-4xl mx-auto py-12 md:py-20 px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="font-headline text-2xl font-bold mb-4">About the event</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold">Details</h2>
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Date</h3>
                <p className="text-muted-foreground">{eventDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Time</h3>
                <p className="text-muted-foreground">{event.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">{event.location.name}</p>
                <p className="text-sm text-muted-foreground">{event.location.address}</p>
              </div>
            </div>
            <RsvpModal />
          </div>
        </div>
      </div>
    </article>
  );
}
