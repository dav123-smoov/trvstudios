import { useState, useCallback } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

const questions = [
  {
    id: 'q1',
    question: 'How consistent is your visual identity across your website, social media, and packaging?',
    options: [
      { text: 'Very inconsistent — different logos, fonts, everywhere.', points: 0 },
      { text: 'Somewhat consistent — basic logo, lacking clear guidelines.', points: 15 },
      { text: '100% consistent — strict brand guidelines and hierarchy.', points: 25 },
    ]
  },
  {
    id: 'q2',
    question: 'Do prospective customers immediately trust your business or hesitate?',
    options: [
      { text: 'They often hesitate or shop around purely based on price.', points: 0 },
      { text: 'Some trust us, but we lose deals to better-looking competitors.', points: 15 },
      { text: 'They immediately recognize premium quality and pay without friction.', points: 25 },
    ]
  }
];

export default function BrandHealthChecker({ onOpenLeadModal }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback((qId, points) => {
    setAnswers(prev => ({ ...prev, [qId]: points }));
  }, []);

  const calculateScore = () => {
    return Object.values(answers).reduce((acc, val) => acc + val, 0);
  };

  const totalAnswered = Object.keys(answers).length;
  const isComplete = totalAnswered === questions.length;
  const score = calculateScore();

  return (
    <section id="brand-audit" className="py-32 bg-[#050505] relative border-t border-zinc-900">
      <div className="max-w-[50rem] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xl sm:text-2xl font-display italic font-light text-[#D4AF37] mb-3 block">
            Brand Diagnostic
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1]">
            Is Your Brand <br />
            <span className="text-zinc-500 italic font-light">Recognized?</span>
          </h2>
        </div>

        {/* Quiz Container - Straight Card */}
        <div className="bg-[#0A0A0A] border border-zinc-800/80 rounded-none p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            {!submitted ? (
              <>
                <div className="space-y-12">
                  {questions.map((q, qIdx) => (
                    <div key={q.id}>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                        {qIdx + 1}. {q.question}
                      </h3>
                      <div className="space-y-3">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = answers[q.id] === opt.points;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleSelect(q.id, opt.points)}
                              className={`w-full p-5 rounded-none text-left text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-zinc-900/50 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-900/30'
                              }`}
                            >
                              <span>{opt.text}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-4 ${
                                isSelected ? 'border-[#D4AF37]' : 'border-zinc-700'
                              }`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress & Submit */}
                <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-xs text-zinc-500 font-bold tracking-wide uppercase">
                    Completed: {totalAnswered} / {questions.length}
                  </div>

                  <button
                    type="button"
                    disabled={!isComplete}
                    onClick={() => setSubmitted(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-none bg-white text-black text-xs font-bold uppercase tracking-wider disabled:opacity-30 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              /* Results Screen */
              <div className="text-center py-8">
                <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-4 block">
                  Brand Score
                </span>
                <div className="text-7xl font-display font-medium text-white mb-8 tracking-tighter">
                  {score}<span className="text-3xl text-zinc-600 font-medium font-sans">/50</span>
                </div>
                <p className="text-zinc-400 mb-12 max-w-md mx-auto font-medium">
                  Based on your answers, there is room to improve your brand's authority and trust signals. Let's build a foundation that commands premium pricing.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenLeadModal}
                    className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    Book Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                    }}
                    className="px-6 py-4 rounded-none border border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
