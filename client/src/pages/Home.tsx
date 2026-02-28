import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useStats, useIncrementStats } from "@/hooks/use-portfolio";
import { Link } from "wouter";

export default function Home() {
  const { data: stats } = useStats();
  const incrementStats = useIncrementStats();
  const [hasIncremented, setHasIncremented] = useState(false);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!hasIncremented && incrementStats.isIdle) {
      incrementStats.mutate();
      setHasIncremented(true);
    }
  }, [hasIncremented, incrementStats.isIdle, incrementStats.mutate]);

  return (
    <PageWrapper>
      
      {/* Top Status Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mx-auto mt-4 mb-16 inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel"
      >
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </div>
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Eye size={14} />
          {stats?.views !== undefined ? (
            <motion.span 
              key={stats.views}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              {stats.views.toLocaleString()} Total Views
            </motion.span>
          ) : "Loading..."}
        </span>
      </motion.div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-10 md:mt-20 mb-32 relative">
        <motion.div style={{ y, opacity }} className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-gradient-silver mb-6"
          >
            A's Studio.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            Crafting unparalleled Roblox user interfaces. We blend <span className="text-white font-medium">minimalism</span> with <span className="text-white font-medium">immersion</span> to create experiences that captivate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/previews">
              <button className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  View Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-neutral-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </Link>
            <button 
              className="px-8 py-4 rounded-full glass-panel text-white font-semibold hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
              onClick={() => window.open('https://discord.com/users/abdz.000', '_blank')}
            >
              Contact @abdz.000
            </button>
          </motion.div>
        </motion.div>

        {/* Abstract hero background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square border border-white/5 rounded-full z-0 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square border border-white/5 rounded-full z-0 opacity-40" />
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {[
          { title: "Premium Quality", desc: "Every pixel placed with intention. We don't just design, we engineer visual perfection." },
          { title: "Fast Delivery", desc: "Speed without compromise. Get your UI integrated exactly when you need it." },
          { title: "Clean Architecture", desc: "Organized, scalable, and ready for deployment in your Roblox experiences." }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="glass-card p-8 rounded-3xl"
          >
            <Sparkles className="text-white/50 mb-4" size={24} />
            <h3 className="text-xl font-display font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

    </PageWrapper>
  );
}
