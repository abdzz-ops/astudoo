import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type Preview } from "@shared/schema";
import { ExternalLink } from "lucide-react";

interface PreviewCardProps {
  preview: Preview;
  index: number;
}

export function PreviewCard({ preview, index }: PreviewCardProps) {
  // Map 'size' to CSS Grid spans
  const sizeClasses = {
    Huge: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]",
    Big: "md:col-span-2 md:row-span-1 h-[300px]",
    Mid: "col-span-1 row-span-1 h-[300px]",
    Small: "col-span-1 row-span-1 h-[200px]"
  };

  const spanClass = sizeClasses[preview.size as keyof typeof sizeClasses] || sizeClasses.Mid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "group relative rounded-3xl overflow-hidden glass-card cursor-pointer",
        spanClass
      )}
    >
      {/* The Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${preview.url})` }}
      />

      {/* Blur Overlay Logic */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500 ease-in-out",
        preview.blur 
          ? "backdrop-blur-2xl bg-black/40 group-hover:backdrop-blur-none group-hover:bg-black/10" 
          : "bg-black/10 group-hover:bg-black/60 group-hover:backdrop-blur-sm"
      )} />

      {/* Content Overlay */}
      <div className={cn(
        "absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ease-in-out",
        preview.blur
          ? "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
          : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
      )}>
        <div className="glass-panel p-4 md:p-6 rounded-2xl transform transition-transform duration-300 flex justify-between items-end">
          <div>
            <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 text-white/80 text-xs font-medium uppercase tracking-wider border border-white/10">
              {preview.size} Format
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
              {preview.description}
            </h3>
          </div>
          <button 
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300"
            onClick={() => window.open(preview.url, '_blank')}
            aria-label="View Full Image"
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
