export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">Privacy Policy</h1>
                 <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </header>
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                <p>
                    BITCHESGONEMAAD ("us", "we", or "our") operates the https://bitchesgonemaad.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>

                <h2>Information Collection and Use</h2>
                <p>
                    We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your email address when you RSVP to an event or contact us.
                </p>

                <h2>Use of Data</h2>
                <p>
                    We use the collected data for various purposes:
                </p>
                <ul>
                    <li>To provide and maintain the Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer care and support</li>
                    <li>To monitor the usage of the Service</li>
                    <li>To detect, prevent and address technical issues</li>
                </ul>

                <h2>Security of Data</h2>
                <p>
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </div>
        </div>
    );
}