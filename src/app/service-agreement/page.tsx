
'use client';

import { services } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ServiceAgreementPage() {
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
            <CardTitle className="font-headline text-3xl md:text-4xl">Service Agreement</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="prose max-w-none text-foreground prose-headings:font-headline">
            <p>
              This Service Agreement ("Agreement") governs the relationship between Growthincs ("Agency", "we", "us") and you, the client ("Client", "you"). By engaging our services, you agree to be bound by the terms outlined below. Please read this document carefully.
            </p>

            <h2>1. Scope of Services</h2>
            <p>
              The Agency agrees to provide digital marketing and development services as mutually agreed upon in a separate Statement of Work (SOW) or project proposal. Our services include, but are not limited to:
            </p>
            <ul>
              {services.map(service => (
                <li key={service.slug}><strong>{service.title}:</strong> {service.shortDescription}</li>
              ))}
            </ul>
            <p>
              Specific deliverables, timelines, and pricing will be detailed in the SOW for each project.
            </p>

            <h2>2. Client Obligations</h2>
            <p>
              The Client agrees to provide all necessary information, access to digital assets (e.g., website backend, ad accounts), and timely feedback required for the Agency to perform its services. Delays in providing these materials may impact project timelines.
            </p>

            <h2>3. Payment Terms</h2>
            <p>
              Payment schedules will be outlined in the SOW. Typically, this may involve an upfront deposit, milestone payments, or a monthly retainer. Invoices are due upon receipt. Late payments may be subject to interest charges as permitted by law.
            </p>
            
            <h2>4. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential all non-public information obtained during the course of the project. This includes business strategies, client data, and proprietary methods. This obligation extends beyond the termination of the Agreement.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              Upon full payment, the Client will own the rights to all final, delivered creative work and developed code ("Final Deliverables"). The Agency retains the right to use the Final Deliverables and a description of the project for its portfolio and marketing purposes. The Agency also retains ownership of all preliminary work, internal processes, and tools used to create the deliverables.
            </p>

            <h2>6. Term and Termination</h2>
            <p>
              This Agreement begins on the date of engagement and continues until all services are completed. Either party may terminate this Agreement with 30 days' written notice. In the event of termination, the Client is responsible for payment for all work completed up to the date of termination.
            </p>

            <h2>7. Disclaimer of Warranties & Limitation of Liability</h2>
            <p>
              The Agency will perform its services with professional skill and care. However, we cannot guarantee specific results or outcomes (e.g., specific search engine rankings, lead volume, or revenue increases) as these are dependent on numerous factors outside our direct control. The Agency's liability for any claim arising from this Agreement will not exceed the total fees paid by the Client to the Agency in the preceding three (3) months.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the Agency is primarily located, without regard to its conflict of law principles.
            </p>

             <p className="mt-8 border-t pt-4 text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This is a sample service agreement. It is not legal advice. You should consult with a legal professional to ensure your service agreement is appropriate for your specific business and jurisdiction.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
