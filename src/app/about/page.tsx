export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">About Us</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    BITCHESGONEMAAD is a visual magazine at the intersection of fashion, art, and culture. We are the modern voice, curating stories that matter.
                </p>
            </header>
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                <p>
                    Founded in 2024, BITCHESGONEMAAD started as a vision to break away from the traditional narratives of the fashion world. We believe in the power of visual storytelling to challenge conventions and inspire a new generation of creators and consumers.
                </p>
                <p>
                    Our platform is dedicated to showcasing the most innovative designers, boundary-pushing artists, and influential cultural movements of our time. We don't just report on the zeitgeist; we help shape it. From in-depth interviews with industry icons like Hedi Slimane to analyses of street culture's impact on houses like Balenciaga, our content is sharp, critical, and always ahead of the curve.
                </p>
                <p>
                    Join us as we explore the ever-evolving landscape of style and creativity.
                </p>
            </div>
        </div>
    )
}