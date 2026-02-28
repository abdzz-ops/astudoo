import { PageWrapper } from "@/components/layout/PageWrapper";
import { PreviewCard } from "@/components/PreviewCard";
import { usePreviews } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Previews() {
  const { data: previews, isLoading, error } = usePreviews();

  // Fallback realistic data if API is not fully seeded yet
  const fallbackData = [
    { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", description: "Minimalist Shop UI", size: "Huge", blur: true },
    { id: 2, url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop", description: "Cyberpunk Inventory", size: "Big", blur: false },
    { id: 3, url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop", description: "Sci-Fi HUD", size: "Mid", blur: true },
    { id: 4, url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2864&auto=format&fit=crop", description: "Settings Panel", size: "Mid", blur: false },
    { id: 5, url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2874&auto=format&fit=crop", description: "Leaderboard", size: "Small", blur: true },
    { id: 6, url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop", description: "Login Screen", size: "Small", blur: false },
  ];

  const displayData = previews?.length ? previews : fallbackData;

  return (
    <PageWrapper>
      <div className="mb-16 mt-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold text-gradient-silver mb-4"
        >
          Our Masterpieces
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Explore a curated selection of our highest quality interfaces. Hover over the blurred panels to reveal the designs.
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-white/50 w-12 h-12" />
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="glass-panel p-8 rounded-3xl text-center">
            <p className="text-destructive mb-2">Failed to load previews</p>
            <p className="text-muted-foreground text-sm">Please try again later</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {displayData.map((preview, idx) => (
            <PreviewCard 
              key={preview.id} 
              preview={preview as any} 
              index={idx} 
            />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
