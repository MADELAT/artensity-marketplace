import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout removePadding>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab"
            alt="Contemporary Art"
            className="w-full h-[110vh] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-['Helvetica Neue'] font-light text-white mb-4 tracking-widest">
              ArTendency
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wider">
              Art as an inspiring weapon
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              <Button size="lg" className="bg-transparent border border-white hover:bg-white/20 text-white text-lg px-8 py-6" asChild>
                <Link to="/explore">Explore Artworks</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border border-white hover:bg-white/20 text-white text-lg px-8 py-6" asChild>
                <Link to="/login">Join as Artist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 px-4 bg-art-offwhite">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Artworks</h2>
            <Button variant="ghost" className="group" asChild>
              <Link to="/explore" className="flex items-center">
                View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <ArtworkGrid />
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Featured Artists</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link 
                key={index} 
                to={`/artist/artist-${index + 1}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={`https://images.unsplash.com/photo-${[
                      "1494790108377-be9c29b29330",
                      "1507003211169-0a1dd7228f2d",
                      "1539571696357-5a69c17a67c6",
                      "1534528741775-53994a69daeb"
                    ][index]}?auto=format&fit=crop&w=600&q=80`}
                    alt={`Artist ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-medium">
                  {[
                    "Emma Roberts",
                    "Michael Chen",
                    "Sofia Garcia",
                    "James Wilson"
                  ][index]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {[
                    "Abstract Painter",
                    "Digital Artist",
                    "Sculptor",
                    "Photographer"
                  ][index]}
                </p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/artists">View All Artists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">How Artendency Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Discover Art</h3>
              <p className="text-muted-foreground">
                Browse our curated selection of contemporary artworks from emerging and established artists.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Connect</h3>
              <p className="text-muted-foreground">
                Communicate directly with artists and galleries to learn more about their work.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Collect</h3>
              <p className="text-muted-foreground">
                Purchase artwork securely and build your collection with confidence.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=2000&q=80"
            alt="Art Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Join the Artendency Community
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work, a gallery seeking to expand your reach, or a collector searching for your next piece, Artendency is the platform for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/login">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
