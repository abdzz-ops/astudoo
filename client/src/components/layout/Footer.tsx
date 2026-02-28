import { motion } from "framer-motion";
import { Link } from "wouter";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full mt-32 border-t border-white/5 bg-background/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-gradient-silver">A's Studio</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium Roblox UI design. Elevating experiences with clean, modern, and highly polished interfaces.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Discord: <span className="text-white font-medium hover:underline cursor-pointer">@abdz.000</span>
              </span>
              <span>Owner: Abdz</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/faq" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/faq" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} A's Studio. All rights reserved.</p>
          <p className="flex gap-4">
            <span>No Refunds Policy applies.</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
