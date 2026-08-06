import { useState, useMemo, useCallback } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import portfolioItems from '../data/caseStudies.json';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'stationery', label: 'Stationery' },
  { id: 'merch', label: 'Merchandise' },
  { id: 'digital', label: 'Digital' }
];

export default function PortfolioGrid() {
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
          
          <div className="flex flex-wrap gap-4 bg-[#0A0A0A] p-2 rounded-none border border-zinc-900">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-sm font-semibold tracking-wide transition-all px-4 py-2 rounded-none ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid matching WordPress premium theme style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
            >
              {/* Image Container - Straight Card */}
              <div className="relative aspect-[4/3] rounded-none overflow-hidden bg-zinc-900 border border-zinc-800/80 mb-6 shadow-2xl">
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
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-xl font-display font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium">
                    {item.client}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black text-zinc-400 transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
