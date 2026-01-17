import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                String<span className="text-primary">Art</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Handcrafted tools for creative expression.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/#gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} StringArt Generator. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made for creators, by creators
          </p>
        </div>
      </div>
    </footer>
  );
};
