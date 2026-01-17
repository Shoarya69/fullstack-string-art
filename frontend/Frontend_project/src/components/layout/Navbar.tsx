import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'How it Works', path: '/#how-it-works' },
  { name: 'Gallery', path: '/#gallery' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.includes('#')) {
      const element = document.querySelector(path.split('/')[1]);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="navbar-glass flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-2xl font-semibold" style={{ color: '#111111' }}>
            String<span className="text-primary">Art</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-sm font-medium tracking-wide uppercase transition-colors duration-300"
              style={{ color: '#1C1C1C' }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="glass" size="sm" style={{ color: '#1C1C1C' }}>
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} style={{ color: '#1C1C1C', borderColor: '#1C1C1C' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" style={{ color: '#1C1C1C' }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:text-primary transition-colors"
          style={{ color: '#1C1C1C' }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden navbar-glass p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="transition-colors py-2 text-lg"
                  style={{ color: '#1C1C1C' }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="glass" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={logout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="default" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
