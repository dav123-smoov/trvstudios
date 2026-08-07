import { useState, useMemo, useCallback, memo } from 'react';
import { ArrowRight, Eye, ChevronRight } from 'lucide-react';
import portfolioItems from '../data/caseStudies.json';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'stationery', label: 'Stationery' },
  { id: 'merch', label: 'Merchandise' },
  { id: 'digital', label: 'Digital' }
];

const categoryLabels = {
  packaging: 'Packaging Design',
  stationery: 'Stationery',
  merch: 'Brand Merchandise',
  digital: 'Web & Digital'
};

export default function PortfolioGrid({ onOpenLeadModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = useCallback((id) => {
    setSelectedCategory(id);
  }, []);

  const filtered = useMemo(() => {
    return selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="work" className="py-24 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1]">
              Selected <br />
              <span className="text-zinc-500 italic font-light">Works.</span>
            </h2>
          </div>
          
          {/* Filter Tabs — improved contrast */}
          <div className="flex flex-wrap gap-2 bg-[#0A0A0A] p-2 border border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-xs font-bold tracking-widest uppercase transition-all px-4 py-2.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-black shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-none overflow-hidden bg-zinc-900 border border-zinc-800/80 mb-5 shadow-2xl">
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm border border-zinc-700/60 px-2.5 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    {categoryLabels[item.category] || item.category}
                  </span>
                </div>

                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                     <Eye className="w-6 h-6" />
                   </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex justify-between items-start px-1">
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-display font-medium text-white mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium mb-2">
                    {item.client}
                  </p>
                  {item.result && (
                    <p className="text-xs text-zinc-400 font-medium italic border-l-2 border-[#D4AF37]/50 pl-2.5">
                      {item.result}
                    </p>
                  )}
                </div>
                <div className="w-10 h-10 shrink-0 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black text-zinc-400 transition-colors mt-1">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-2">
              Ready to scale?
            </h3>
            <p className="text-zinc-400 font-medium text-sm max-w-md">
              Let's build a brand that positions your business for long-term growth.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="shrink-0 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            Start a Project
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
