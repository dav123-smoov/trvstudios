import { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const serviceList = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'A strong brand identity signals trust and increases perceived value, helping you attract better clients and command higher prices.',
    deliverables: ['Custom Logo Design', 'Brand Guidelines', 'Typography System']
  },
  {
    number: '02',
    title: 'Product Packaging',
    description: 'Premium packaging that turns browsers into buyers. Custom structural designs that make your product look expensive before it is even opened.',
    deliverables: ['Custom Box Design', 'Print-Ready Files', '3D Mockups']
  },
  {
    number: '03',
    title: 'Business Setup',
    description: 'A properly registered, compliant business builds instant credibility and unlocks opportunities with corporate clients and institutions.',
    deliverables: ['CAC Registration', 'Name Availability', 'TIN Assistance']
  },
  {
    number: '04',
    title: 'Digital Presence',
    description: 'A high-converting website and strong Google presence ensure new clients find you, trust you, and reach out — without you chasing them.',
    deliverables: ['Website Design', 'Google Business', 'SEO Setup']
  }
];

const Services = memo(function Services({ onOpenLeadModal }) {
  return (
    <section id="services" className="py-24 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Capabilities
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-[1.1]">
            Expertise that scales <br />
            <span className="text-zinc-500 italic font-light">your business.</span>
          </h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-zinc-900">
          {serviceList.map((service) => (
            <div
              key={service.number}
              className="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-zinc-900 hover:bg-[#0A0A0A] transition-colors duration-300 px-4 -mx-4 rounded-xl"
            >
              {/* Left: Number & Title */}
              <div className="md:w-1/3 mb-6 md:mb-0 flex gap-6">
                <span className="text-sm font-semibold text-zinc-600 mt-1">{service.number}</span>
                <h3 className="text-2xl font-display font-medium text-white">
                  {service.title}
                </h3>
              </div>

              {/* Middle: Description */}
              <div className="md:w-1/3 mb-6 md:mb-0 pr-8">
                <p className="text-zinc-400 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              {/* Right: Deliverables & CTA */}
              <div className="md:w-1/3 flex flex-col items-start md:items-end justify-between">
                <ul className="space-y-2 mb-6">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={onOpenLeadModal}
                  className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 group/btn"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default Services;
