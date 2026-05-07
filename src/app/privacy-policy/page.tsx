
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 3, 2025";

  return (
    <motion.div
      className="bg-secondary/50 py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="prose max-w-none text-foreground prose-headings:font-headline">
            <p>
              Growthincs ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect information you provide directly to us, such as when you fill out our contact form or interact with our chatbot. This may include:</p>
            <ul>
                <li>Your name</li>
                <li>Your email address</li>
                <li>The content of your message</li>
            </ul>
            <p>We also collect information automatically through analytics tools like Google Analytics, which may include your IP address, browser type, and browsing behavior.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer service.</li>
              <li>Operate and improve our website and services.</li>
              <li>Analyze website usage to understand how we can improve the user experience.</li>
              <li>Communicate with you about our services, if you have opted in.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as email delivery or website analytics. These providers are obligated to protect your information and are not permitted to use it for their own purposes.
            </p>

            <h2>4. AI Chatbot and Data Usage</h2>
            <p>
              When you interact with our AI-powered chatbot, your conversation history may be used to improve the AI model's performance and accuracy. This data is anonymized to the extent possible and is used solely for the purpose of enhancing the chatbot's ability to assist users.
            </p>

            <h2>5. Your Data Rights</h2>
            <p>
              You have the right to request access to the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. Please contact us at contact@growthincs.in to make such a request.
            </p>
            
            <h2>6. Cookies</h2>
            <p>
                Our website uses cookies to enhance your experience. A cookie is a small file placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
            
            <p className="mt-8 border-t pt-4 text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This is a sample privacy policy. It is not legal advice. You should consult with a legal professional.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
