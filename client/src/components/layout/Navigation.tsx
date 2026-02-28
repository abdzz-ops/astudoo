import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/previews", label: "Previews" },
    { path: "/faq", label: "FAQ / Other" },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <nav className="glass-panel rounded-full px-2 py-2 flex items-center gap-1 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300",
                isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
