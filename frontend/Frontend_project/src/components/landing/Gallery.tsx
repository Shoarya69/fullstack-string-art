import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import coupleStringart from '@/assets/gallery/couple-stringart.webp';
import krishnaStringart from '@/assets/gallery/krishna-stringart.webp';
import menStringart from '@/assets/gallery/men-stringart.webp';
import viratStringart from '@/assets/gallery/viratkohli-stringart.png';

const galleryItems = [
  {
    id: 1,
    title: 'Couple Portrait',
    category: 'Portraits',
    image: coupleStringart,
  },
  {
    id: 2,
    title: 'Krishna Art',
    category: 'Spiritual',
    image: krishnaStringart,
  },
  {
    id: 3,
    title: 'Portrait Study',
    category: 'Portraits',
    image: menStringart,
  },
  {
    id: 4,
    title: 'Virat Kohli',
    category: 'Celebrities',
    image: viratStringart,
  },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="relative py-20 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore stunning string art creations made by our community of artists.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Circular Frame Container */}
              <div className="relative w-[240px] h-[240px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px] mb-5">
                {/* Outer Frame Ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '3px solid rgba(0, 0, 0, 0.08)'
                  }}
                />

                {/* Circular Image with Border and Shadow */}
                <div
                  className="w-full h-full rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover overlay - circular */}
                <div
                  className="absolute inset-0 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                >
                  <span className="text-primary font-medium">View Details</span>
                </div>
              </div>

              {/* Info Below Circle */}
              <div className="text-center px-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/signup">
            <Button variant="hero" size="lg" className="group">
              Create Your Own
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
