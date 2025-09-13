import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a story to share, a question, or a collaboration in mind? We'd love to hear from you.
                </p>
            </header>

            <div className="max-w-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <a href="mailto:contact@bitchesgonemaad.com" className="bg-secondary p-6 rounded-lg flex items-center gap-4 hover:bg-secondary/80 transition-colors">
                        <Mail className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-bold text-lg">Email</h3>
                            <p className="text-muted-foreground text-sm">contact@bitchesgonemaad.com</p>
                        </div>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-secondary p-6 rounded-lg flex items-center gap-4 hover:bg-secondary/80 transition-colors">
                        <Instagram className="w-8 h-8 text-primary" />
                         <div>
                            <h3 className="font-bold text-lg">Instagram</h3>
                            <p className="text-muted-foreground text-sm">@bitchesgonemaad</p>
                        </div>
                    </a>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                        <Input id="subject" placeholder="What's this about?" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                        <Textarea id="message" placeholder="Your message..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">Send Message</Button>
                </form>
            </div>
        </div>
    );
}