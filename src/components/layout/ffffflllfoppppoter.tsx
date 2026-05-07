
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-headline text-2xl font-bold">Growthincs</h3>
            <p className="mt-2 text-muted-foreground">
              Your partner in digital growth. We deliver results, not just reports.
            </p>
            <div className="mt-6">
              <p className="font-semibold">Stay updated with our insights</p>
              <form className="mt-2 flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" className="flex-1" />
                <Button type="submit" variant="default">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            <div>
              <h4 className="font-semibold tracking-wider uppercase text-foreground">Navigation</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
                <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold tracking-wider uppercase text-foreground">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/service-agreement" className="text-muted-foreground hover:text-primary">Service Agreement</Link></li>
              </ul>
            </div>
             <div className="lg:col-span-2">
                 <h4 className="font-semibold tracking-wider uppercase text-foreground">Contact</h4>
                 <ul className="mt-4 space-y-2 text-muted-foreground">
                    <li>Email: <a href="mailto:contact@growthincs.in" className="hover:text-primary">contact@growthincs.in</a></li>
                    <li>Location: Bhubaneswar, India</li>
                 </ul>
                 <div className="mt-6 flex space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Instagram</span><Instagram className="h-6 w-6" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></Link>
                 </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Growthincs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
