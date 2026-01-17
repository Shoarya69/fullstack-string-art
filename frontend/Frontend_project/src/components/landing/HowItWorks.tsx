import { motion } from 'framer-motion';
import { Upload, Sliders, Download, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Image',
    description: 'Drag and drop any photo or portrait. Our system accepts JPG, PNG, and WebP formats up to 10MB.',
  },
  {
    icon: Sliders,
    title: 'Customize Settings',
    description: 'Adjust string density, contrast, and other parameters to achieve your desired artistic effect.',
  },
  {
    icon: Sparkles,
    title: 'Generate Art',
    description: 'Watch as our algorithm transforms your image into a stunning geometric string art pattern.',
  },
  {
    icon: Download,
    title: 'Download & Create',
    description: 'Export your design as a high-resolution file, ready for digital display or physical crafting.',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative section-spacious section-gradient">
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning string art in four simple steps. No artistic skills required.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass-card-hover p-10 h-full relative overflow-hidden">
                {/* Step number */}
                <div className="absolute top-4 right-4 font-display text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
};
