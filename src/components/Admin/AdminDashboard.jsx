import { useState, useCallback } from 'react';
import { ArrowLeft, Upload, Loader2, CheckCircle2, Trash2 } from 'lucide-react';
import initialCaseStudies from '../../data/caseStudies.json';

export default function AdminDashboard({ onChangePage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Local list state for optimistic UI updates
  const [studies, setStudies] = useState(initialCaseStudies || []);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('packaging');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState('');
  
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() !== '') {
      setIsAuthenticated(true);
      setError('');
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ filename: file.name, base64: reader.result });
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!coverImageFile) {
        throw new Error("Cover image is required.");
      }

      const coverImage = await toBase64(coverImageFile);
      const galleryImages = await Promise.all(Array.from(galleryFiles).map(toBase64));

      const payload = {
        passcode,
        title,
        client,
        category,
        description,
        highlights: highlights.split(',').map(h => h.trim()).filter(Boolean),
        coverImage,
        galleryImages
      };

      const res = await fetch('/api/uploadCaseStudy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload to GitHub.');
      }

      setSuccess(true);
      // Optimistically update the list
      setStudies([...studies, data.caseStudy]);
      
      // Reset form
      setTitle('');
      setClient('');
      setDescription('');
      setHighlights('');
      setCoverImageFile(null);
      setGalleryFiles([]);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to completely delete this case study? This cannot be undone.")) return;
    
    setDeletingId(id);
    setError('');
    
    try {
      const res = await fetch('/api/deleteCaseStudy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode, id })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete case study.');
      
      // Optimistically remove from UI
      setStudies(studies.filter(s => s.id !== id));
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#0A0A0A] border border-zinc-800 p-8 rounded-none shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-display text-white mb-2">TRV Studio Admin</h2>
            <p className="text-zinc-500 text-xs">Enter your secret passcode to access the CMS.</p>
          </div>
          
          <div>
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
              className="w-full px-4 py-3 bg-[#050505] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none transition-colors rounded-none"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all rounded-none cursor-pointer">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans pb-24">
      <div className="border-b border-zinc-900 bg-[#0A0A0A] p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => onChangePage('home')} className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[#D4AF37] font-display font-medium text-lg">TRV Admin Panel</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-xs text-zinc-500 hover:text-white uppercase tracking-wider font-bold cursor-pointer">
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-6">
        {/* Management Section */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-display text-white mb-2">Manage Projects</h2>
            <p className="text-zinc-500 text-sm">Delete existing case studies from your live website.</p>
          </div>
          
          <div className="space-y-3">
            {studies.length === 0 ? (
               <p className="text-zinc-500 italic text-sm">No case studies found.</p>
            ) : (
              studies.map((study) => (
                <div key={study.id} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <img src={study.coverImage} alt={study.title} className="w-12 h-12 object-cover border border-zinc-800" />
                    <div>
                      <h4 className="text-white text-sm font-medium">{study.title}</h4>
                      <p className="text-zinc-500 text-xs">{study.client}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(study.id)} 
                    disabled={deletingId === study.id}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                    title="Delete Case Study"
                  >
                    {deletingId === study.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mb-10 pt-10 border-t border-zinc-900">
          <h1 className="text-3xl font-display text-white mb-2">Upload Case Study</h1>
          <p className="text-zinc-500 text-sm">Fill out the details below. Once submitted, wait 2 minutes for the live site to automatically rebuild.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-sm rounded-none">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-8 p-6 bg-green-950/20 border border-green-900/40 flex items-start gap-4 rounded-none">
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Upload Successful!</h4>
              <p className="text-zinc-400 text-sm">Your new case study has been securely pushed to GitHub. Netlify is rebuilding the site right now. It will be live in ~2 minutes.</p>
              <button onClick={() => setSuccess(false)} className="mt-3 text-xs text-[#D4AF37] font-bold uppercase tracking-wider hover:underline cursor-pointer">Upload Another</button>
            </div>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Project Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-[#0A0A0A] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Client Name</label>
                <input required type="text" value={client} onChange={e => setClient(e.target.value)} className="w-full p-3 bg-[#0A0A0A] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-[#0A0A0A] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none cursor-pointer">
                <option value="packaging">Packaging</option>
                <option value="stationery">Stationery</option>
                <option value="merch">Merchandise</option>
                <option value="digital">Digital</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Full Description</label>
              <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 bg-[#0A0A0A] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none resize-none" />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Execution Highlights (Comma Separated)</label>
              <input type="text" value={highlights} onChange={e => setHighlights(e.target.value)} placeholder="e.g. Gold Foil Stamping, Matte Finish, Custom Grid" className="w-full p-3 bg-[#0A0A0A] border border-zinc-800 focus:border-[#D4AF37] text-white text-sm focus:outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border border-zinc-800 bg-[#0A0A0A]">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Cover Image (Required)</label>
                <input type="file" required accept="image/*" onChange={e => setCoverImageFile(e.target.files[0])} className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Gallery Images</label>
                <input type="file" multiple accept="image/*" onChange={e => setGalleryFiles(e.target.files)} className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" />
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all rounded-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isSubmitting ? 'Uploading to Server...' : 'Publish Case Study'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
