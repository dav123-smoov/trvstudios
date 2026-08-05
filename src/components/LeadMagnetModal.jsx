import { useState, useCallback } from 'react';
import { X, CheckCircle, Calendar } from 'lucide-react';

const AVAILABLE_SERVICES = [
  'Logo & Brand Identity',
  'Website & Web Dev',
  'Product Packaging',
  'Custom Printing',
  'CAC Business Registration'
];

export default function LeadMagnetModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleServiceToggle = useCallback((service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const formData = {
      "form-name": "booking",
      "name": name,
      "email": email,
      "services": selectedServices.join(", "),
      "description": description
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => setSubmitted(true))
      .catch(error => console.error("Form submission error:", error));
  }, [name, email, selectedServices, description]);

  const handleResetAndClose = useCallback(() => {
    setName('');
    setEmail('');
    setSelectedServices([]);
    setDescription('');
    setSubmitted(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      
      {/* Container - Fixed Max Height, Flexbox layout */}
      <div className="relative w-full max-w-xl bg-[#0A0A0A] border border-zinc-800 rounded-none p-8 sm:p-10 shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Close Button - Floats over top-right */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-none bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Header - Fixed height */}
            <div className="mb-6 relative z-10 shrink-0 pr-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2 block">
                Booking
              </span>
              <h2 className="text-3xl font-display font-medium text-white mb-2">
                Start Your Project
              </h2>
              <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                Enter your project details below. Our team will contact you via email to schedule your strategy session.
              </p>
            </div>

            {/* Scrollable Form Body - Takes up remaining height and scrolls */}
            <form 
              name="booking" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-5 relative z-10 overflow-y-auto pr-2 flex-1 scrollbar-thin"
            >
              <input type="hidden" name="form-name" value="booking" />
              
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ademola Abdul"
                  className="w-full px-4 py-3 rounded-none bg-[#050505] border border-zinc-850 focus:border-[#D4AF37] text-white text-sm placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ademola@megatexpaints.com"
                  className="w-full px-4 py-3 rounded-none bg-[#050505] border border-zinc-850 focus:border-[#D4AF37] text-white text-sm placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-3">
                  Select Required Services *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AVAILABLE_SERVICES.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`p-3 text-left text-xs font-semibold border transition-all duration-150 flex items-center justify-between rounded-none cursor-pointer ${
                          isSelected
                            ? 'border-[#D4AF37] bg-zinc-900 text-white'
                            : 'border-zinc-850 bg-[#050505] text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <span>{service}</span>
                        <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ml-2 rounded-none ${
                          isSelected ? 'border-[#D4AF37]' : 'border-zinc-700'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-[#D4AF37]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your brand name, target timelines, or packaging requirements..."
                  className="w-full px-4 py-3 rounded-none bg-[#050505] border border-zinc-850 focus:border-[#D4AF37] text-white text-sm placeholder-zinc-700 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 sticky bottom-0 bg-[#0A0A0A] z-10">
                <button
                  type="submit"
                  disabled={selectedServices.length === 0}
                  className="w-full py-4 rounded-none bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.2)] text-xs font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Submit Booking Request</span>
                </button>
              </div>

            </form>
          </>
        ) : (
          /* Success Screen (Doesn't need scrolling) */
          <div className="text-center py-10 space-y-6 relative z-10 flex-1 flex flex-col justify-center animate-scaleIn">
            <div className="w-16 h-16 rounded-none bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-medium text-white">
                Booking Request Received
              </h2>
              <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">
                Thank you, {name}!
              </p>
            </div>

            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
              We have saved your details for: <br />
              <strong className="text-zinc-300 font-semibold block mt-1">{selectedServices.join(', ')}</strong>
              <br />
              Your request has been successfully sent directly to our team at <strong className="text-white font-semibold">davidbolaji2004@gmail.com</strong>. We will review your details and contact you within 24 hours.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-8 py-3 rounded-none bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
