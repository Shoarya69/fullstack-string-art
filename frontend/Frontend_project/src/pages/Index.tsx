import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Gallery } from '@/components/landing/Gallery';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>StringArt Generator | Transform Photos into String Art Masterpieces</title>
        <meta 
          name="description" 
          content="Transform your photos into stunning string art with our AI-powered generator. Create unique, handcrafted-looking geometric artwork in seconds." 
        />
      </Helmet>

      <Navbar />
      
      <main>
        <Hero />
        <HowItWorks />
        <Gallery />
      </main>

      <Footer />
    </>
  );
};

export default Index;
