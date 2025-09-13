export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">Terms of Service</h1>
                <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </header>
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>

                <h2>2. Content</h2>
                <p>
                    Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
                </p>
                 <p>
                   All content on this site is for informational and entertainment purposes only. The views and opinions expressed on this website are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer or company.
                </p>

                <h2>3. Intellectual Property</h2>
                <p>
                    The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of BITCHESGONEMAAD and its licensors.
                </p>

                <h2>4. Links To Other Web Sites</h2>
                <p>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by BITCHESGONEMAAD. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
                </p>

                <h2>5. Changes</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                </p>
            </div>
        </div>
    );
}