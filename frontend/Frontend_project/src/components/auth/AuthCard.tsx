import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient px-4 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display text-3xl font-semibold text-foreground">
            String<span className="text-primary">Art</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
};
