import { PageWrapper } from "@/components/layout/PageWrapper";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import { useFaqs } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";

const HARDCODED_FAQS = [
  { question: "What is A's Studio?", answer: "A's Studio is a premium UI design agency specializing in high-end, immersive interfaces for Roblox Studio experiences." },
  { question: "How fast is delivery?", answer: "We pride ourselves on fast delivery. Most standard UI commissions are completed within 3-5 business days, depending on complexity." },
  { question: "Do you offer UI scripting/programming?", answer: "Currently, we focus strictly on the visual design and layout (UI/UX). We provide the fully designed GUI objects ready for your scripters to animate and code." },
  { question: "What software do you use?", answer: "We use professional design tools like Figma, Photoshop, and After Effects to mock up designs, before translating them perfectly into Roblox Studio." },
  { question: "Can I request revisions?", answer: "Yes! We offer up to 2 minor revisions after the initial preview. Complete redesigns after approval will incur additional charges." },
  { question: "What sizes and resolutions do you support?", answer: "We design responsively. All UIs are built using scale constraints to ensure they look perfect on PC, Mobile, and Console." },
  { question: "How do I place an order?", answer: "You can place an order by contacting Abdz directly on Discord at @abdz.000. We will discuss your vision, provide a quote, and start working." },
  { question: "What is your refund policy?", answer: "We operate on a strict No Refunds policy once work has commenced. This is because digital design work cannot be returned once created." },
  { question: "Do you design custom icons?", answer: "Yes, custom iconography is included in our premium packages. For standard packages, we use high-quality licensed vector icons." },
  { question: "Can I see works in progress?", answer: "Absolutely. We send watermarked previews during the design phase to ensure we are aligned with your vision before final delivery." }
];

export default function Faq() {
  const { data: apiFaqs, isLoading } = useFaqs();
  
  // Use API FAQs if available, otherwise fallback to hardcoded
  const faqs = apiFaqs && apiFaqs.length > 0 ? apiFaqs : HARDCODED_FAQS;

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto w-full mt-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-gradient-silver mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Everything you need to know about working with A's Studio.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-full bg-white/5 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base md:text-lg text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>

        {/* Legal / TOS Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-8">Legal & Terms of Service</h2>
          
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-base mb-2">1. Impressum (Legal Notice)</h3>
              <p>Site Owner: Abdz</p>
              <p>Contact: Discord @abdz.000</p>
              <p>This portfolio is operated independently for the display and commission of Roblox UI designs.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-base mb-2">2. Terms of Service (TOS)</h3>
              <p>By commissioning A's Studio, you agree to these terms. All designs remain the intellectual property of A's Studio until full payment is received. We reserve the right to display commissioned work in this portfolio unless a Non-Disclosure Agreement (NDA) is explicitly signed beforehand.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-base mb-2">3. Refund & Cancellation Policy</h3>
              <p><strong>NO REFUNDS.</strong> Due to the digital and custom nature of our design work, all sales are final. Once a deposit is paid and work has started, cancellations will not result in a refund of the deposit. Time and labor cannot be returned.</p>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-base mb-2">4. Payment Terms</h3>
              <p>Payment is required upfront or via a 50/50 milestone agreement for larger projects. We accept various payment methods as discussed via Discord. Assets are delivered only upon 100% completion of payment.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
