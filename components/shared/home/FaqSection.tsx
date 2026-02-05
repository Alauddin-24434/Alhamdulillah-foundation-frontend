"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FaqSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqQuestions = t("faq.questions", {
    returnObjects: true,
  }) as { q: string; a: string }[];

  return (
    <section id="faq" className="py-20 md:py-32 relative overflow-hidden bg-accent/5">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 -z-10 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
        <div className="text-center max-w-6xl mx-auto mb-16 md:mb-20">
       
           <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary via-emerald-600 to-amber-500 bg-clip-text text-transparent">
             {t("faq.title", { defaultValue: "We'd Love to Hear From You" })}
           </h2>
           <p className="text-lg text-muted-foreground leading-relaxed">
             {t("faq.desc", { defaultValue: "Have a question or want to get involved? Reach out to us and we'll get back to you as soon as possible." })}
           </p>
        </div>


          {/* FAQ Grid */}
          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(faqQuestions) &&
              faqQuestions.map((q, i) => (
                <Card
                  key={i}
                  onClick={() => setExpandedFAQ(i === expandedFAQ ? null : i)}
                  className={`
                    p-6 md:p-8 cursor-pointer
                    border-border/40 hover:border-primary/40
                    transition-all duration-500
                    bg-card/40 backdrop-blur-md rounded-2xl
                    group
                    ${expandedFAQ === i ? "shadow-2xl shadow-primary/10 border-primary/30 ring-1 ring-primary/5" : "hover:shadow-lg"}
                  `}
                >
                  {/* Question */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                       <span className={`text-2xl font-black ${expandedFAQ === i ? "text-primary" : "text-muted-foreground/30 transition-colors group-hover:text-primary/40"}`}>
                          {(i + 1).toString().padStart(2, '0')}
                       </span>
                       <h3 className={`font-bold text-lg md:text-xl transition-colors ${expandedFAQ === i ? "text-primary" : "text-foreground group-hover:text-primary/70"}`}>
                         {q.q}
                       </h3>
                    </div>

                    <div className={`mt-1 p-1 rounded-full transition-all duration-300 ${expandedFAQ === i ? "bg-primary text-white rotate-180" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}>
                      <ChevronDown
                        className="w-5 h-5 flex-shrink-0"
                      />
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    className={`
                      grid transition-all duration-500 ease-in-out
                      ${
                        expandedFAQ === i
                          ? "grid-rows-[1fr] opacity-100 mt-6"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-12">
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-6 py-1">
                          {q.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-16 text-center">
             <p className="text-muted-foreground mb-4">{t("faq.confussion")}</p>
             <a 
               href="#contact" 
               className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all underline decoration-2 underline-offset-4"
             >
               {t("faq.askQuestion")} <ChevronDown className="-rotate-90 w-4 h-4" />
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}
