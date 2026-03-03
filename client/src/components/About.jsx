import React from 'react';
import { Spacing, Heart, Globe, Users, ScrollText } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#FCF9F6] min-h-screen">
      {/* Hero Section: The Soul */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1528459105426-b923161e5981?q=80&w=2060&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-80"
            alt="Handloom weaving"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Heritage</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Slow Craft for a <br /> <span className="italic text-amber-100">Fast World</span>
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-[#5C4033] leading-tight">
              We don't just sell fabric. <br /> We preserve a heartbeat.
            </h2>
            <p className="text-stone-600 font-light leading-relaxed text-lg">
              Founded in 2024, Loom & Craft was born out of a simple observation: the rhythmic clack of the handloom was fading. We realized that when a weaver leaves their craft for a factory job, we don't just lose a product—we lose a thousand years of geometry, math, and poetry.
            </p>
            <p className="text-stone-600 font-light leading-relaxed">
              Our mission is to bridge the gap between rural master weavers and the global conscious consumer. By removing middlemen and ensuring 80% of profits reach the artisan, we make slow fashion a sustainable livelihood.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop" 
                alt="Artisan hands" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl max-w-xs hidden md:block border-l-4 border-amber-800">
              <p className="text-sm italic font-serif text-stone-700">
                "A machine can copy a pattern, but only a human hand can imbue it with a soul."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest mt-4 text-amber-900">— Master Weaver, Varanasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars */}
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-4">
              <div className="flex justify-center text-amber-400"><Globe size={40} strokeWidth={1} /></div>
              <h3 className="text-xl font-serif">Radical Transparency</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Know exactly where your garment came from. Every piece comes with a digital certificate tracing it back to the specific cluster and weaver.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center text-amber-400"><Heart size={40} strokeWidth={1} /></div>
              <h3 className="text-xl font-serif">Community First</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                We reinvest in weaving clusters, providing healthcare and education for the children of the artisans who create our collections.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center text-amber-400"><ScrollText size={40} strokeWidth={1} /></div>
              <h3 className="text-xl font-serif">Honest Materials</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                No polyester, no synthetics. Only GOTS-certified organic cotton, AHIMSA (Cruelty-free) silk, and natural botanical dyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process: Timeline style */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-serif text-center text-[#5C4033] mb-16 underline decoration-amber-200 underline-offset-8">The Lifecycle of a Weave</h2>
        <div className="space-y-12">
          {[
            { step: "01", title: "Botanical Dyeing", desc: "Raw yarns are dipped in vats of indigo, madder, or turmeric for days." },
            { step: "02", title: "Hand Spun", desc: "The yarn is spun onto bobbins using traditional wooden charkhas." },
            { step: "03", title: "The Loom", desc: "Master weavers set the warp. This can take up to 4 days before a single inch is woven." },
            { step: "04", title: "Final Finish", desc: "The fabric is washed in the sun and checked for the artisan's signature weave pattern." }
          ].map((item, index) => (
            <div key={index} className="flex gap-8 items-start border-l border-stone-200 pl-8 relative">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-amber-800" />
              <div className="flex-shrink-0 text-3xl font-serif text-stone-300">{item.step}</div>
              <div>
                <h4 className="text-lg font-serif text-stone-900">{item.title}</h4>
                <p className="text-stone-500 font-light text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-50 py-20 text-center">
        <h2 className="text-3xl font-serif text-[#5C4033] mb-8">Own a Piece of History</h2>
        <button className="px-10 py-4 bg-[#5C4033] text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition-all">
          Explore the Archive
        </button>
      </section>
    </div>
  );
};

export default About;