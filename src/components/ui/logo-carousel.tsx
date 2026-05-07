
"use client"

import * as React from "react"

const logos = [
  { name: "Mindtickle", color: "#F26532" },
  { name: "WebEngage", color: "#FFFFFF" },
  { name: "Hiver", color: "#FFC300" },
  { name: "SirionLabs", color: "#003DA5" },
  { name: "Uniphore", color: "#F15A29" },
  { name: "Razorpay", color: "#3B82F6" },
  { name: "Whatfix", color: "#D92D20" },
  { name: "Chargebee", color: "#8B5CF6" },
  { name: "BrowserStack", color: "#FFFFFF" },
  { name: "Postman", color: "#FF6C37" },
];

export function LogoCarousel() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm border border-border/50">
       <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
        Trusted by Industry Leaders
      </h3>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
        }}
      >
        <div className="animate-scroll flex w-max items-center gap-x-12">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 px-4">
               <span 
                className="text-xl font-bold font-headline whitespace-nowrap" 
                style={{ color: logo.color }}
               >
                {logo.name}
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

    