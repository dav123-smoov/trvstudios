import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Upload, Loader2, CheckCircle2, Trash2, Pencil, RefreshCw, AlertTriangle } from 'lucide-react';
import initialCaseStudies from '../../data/caseStudies.json';

// Client-side image compressor to prevent Vercel 4.5MB request payload limit errors
const compressImage = (file, maxWidth = 1600, maxHeight = 1600, quality = 0.82) => {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    // If not an image or is SVG or is already tiny (< 150KB), don't compress
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.size < 150 * 1024) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ filename: file.name, base64: reader.result });
      reader.onerror = () => resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        resolve({ filename: cleanName, base64: dataUrl });
      };
      img.onerror = () => {
        resolve({ filename: file.name, base64: e.target.result });
      };
    };
    reader.onerror = () => resolve(null);
  });
};

export default function AdminDashboard({ onChangePage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [githubStatus, setGithubStatus] = useState(null);
  const [isLoadingStudies, setIsLoadingStudies] = useState(false);
  
  // Local list state initialized with build data, updated dynamically
  const [studies, setStudies] = useState(initialCaseStudies || []);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('packaging');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState('');
  
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const formRef = useRef(null);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const fetchLiveStudies = useCallback(async () => {
    setIsLoadingStudies(true);
    try {
      const res = await fetch(`/api/getCaseStudies?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.caseStudies && Array.isArray(data.caseStudies)) {
          setStudies(data.caseStudies);
        }
      }
    } catch (err) {
      console.warn('Could not fetch live studies:', err);
    } finally {
      setIsLoadingStudies(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/verifyAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        throw new Error(data.error || 'Invalid passcode.');
      }
      setIsAuthenticated(true);
      if (data.githubStatus) {
        setGithubStatus(data.githubStatus);
      }
      setError('');
      // Fetch the latest fresh studies from the server
      fetchLiveStudies();
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveStudies();
    }
  }, [isAuthenticated, fetchLiveStudies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!editingId && !coverImageFile) {
        throw new Error("Cover image is required for new case studies.");
      }

      let coverImage = null;
      if (coverImageFile) {
        coverImage = await compressImage(coverImageFile);
      }

      let galleryImages = [];
      if (galleryFiles && galleryFiles.length > 0) {
        galleryImages = (await Promise.all(Array.from(galleryFiles).map(f => compressImage(f)))).filter(Boolean);
      }

      const payload = {
        passcode,
        id: editingId,
        title,
        client,
        category,
        description,
        highlights: highlights.split(',').map(h => h.trim()).filter(Boolean),
        coverImage,
        galleryImages
      };

      const endpoint = editingId ? '/api/editCaseStudy' : '/api/uploadCaseStudy';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save case study to GitHub.');
      }

      setSuccess(true);
      
      // Update local state and trigger server re-fetch
      if (editingId) {
        setStudies(prev => prev.map(s => String(s.id).trim() === String(editingId).trim() ? data.caseStudy : s));
      } else {
        setStudies(prev => [...prev, data.caseStudy]);
      }
      
      resetForm();
      fetchLiveStudies();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setClient('');
    setDescription('');
    setHighlights('');
    setCoverImageFile(null);
    setGalleryFiles([]);
  };

  const handleEditClick = (study) => {
    setEditingId(study.id);
    setTitle(study.title || '');
    setClient(study.client || '');
    setCategory(study.category || 'packaging');
    setDescription(study.description || '');
    setHighlights(study.highlights ? study.highlights.join(', ') : '');
    setCoverImageFile(null);
    setGalleryFiles([]); 
    setSuccess(false);
    setError('');
    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
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
      if (!res.ok) throw new Error(data.error || 'Failed to delete case study from GitHub.');
      
      // Remove from UI immediately
      setStudies(prev => prev.filter(s => String(s.id).trim() !== String(id).trim()));
      
      if (editingId && String(editingId).trim() === String(id).trim()) {
        resetForm();
      }

      fetchLiveStudies();

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
          
          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-900/60 text-red-400 text-xs rounded-none leading-relaxed">
              {loginError}
            </div>
          )}

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
          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all rounded-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isLoggingIn ? 'Verifying Passcode...' : 'Login'}
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
        
        {/* GitHub PAT Health Warning if token is expired/invalid */}
        {githubStatus && !githubStatus.valid && (
          <div className="mb-8 p-5 bg-amber-950/40 border border-amber-800/70 text-amber-300 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div className="space-y-2">
              <strong className="font-semibold block text-amber-200">GitHub Connection Action Required:</strong>
              <p className="text-xs text-amber-300/90 leading-relaxed">{githubStatus.message}</p>
              <div className="text-[11px] text-amber-200/80 space-y-1 bg-black/50 p-3 border border-amber-900/50">
                <p>1. Go to <strong>github.com &gt; Settings &gt; Developer settings &gt; Personal access tokens &gt; Tokens (classic)</strong></p>
                <p>2. Click <strong>Generate new token (classic)</strong>, check the <strong>repo</strong> scope, and set Expiration to <strong>No expiration</strong> (or 1 year).</p>
                <p>3. In Vercel, navigate to <strong>Settings &gt; Environment Variables</strong>, update <strong>GITHUB_PAT</strong> with the new token, and trigger a redeployment.</p>
              </div>
            </div>
          </div>
        )}

        {/* Management Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display text-white mb-2">Manage Projects</h2>
              <p className="text-zinc-500 text-sm">Edit or delete existing case studies from your live website.</p>
            </div>
            <button
              type="button"
              onClick={fetchLiveStudies}
              disabled={isLoadingStudies}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white px-3 py-2 border border-zinc-800 hover:border-zinc-700 bg-[#0A0A0A] transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh case studies from GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStudies ? 'animate-spin' : ''}`} />
              {isLoadingStudies ? 'Syncing...' : 'Sync'}
            </button>
          </div>
          
          <div className="space-y-3">
            {studies.length === 0 ? (
               <p className="text-zinc-500 italic text-sm">No case studies found.</p>
            ) : (
              studies.map((study) => (
                <div key={study.id} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-zinc-800">
                  <div className="flex items-center gap-4 min-w-0">
                    <img src={study.coverImage} alt={study.title} className="w-12 h-12 object-cover border border-zinc-800 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{study.title}</h4>
                      <p className="text-zinc-500 text-xs truncate">{study.client} • ID: {study.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleEditClick(study)} 
                      className="p-2 text-zinc-600 hover:text-[#D4AF37] transition-colors cursor-pointer"
                      title="Edit Case Study"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(study.id)} 
                      disabled={deletingId === study.id}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete Case Study"
                    >
                      {deletingId === study.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mb-10 pt-10 border-t border-zinc-900" ref={formRef}>
          <h1 className="text-3xl font-display text-white mb-2">
            {editingId ? 'Edit Case Study' : 'Upload New Case Study'}
          </h1>
          <p className="text-zinc-500 text-sm">
            {editingId 
              ? "Update the details below. Leave image fields blank to keep the existing images."
              : "Fill out the details below to publish a new project."}
            {" "}Images are automatically optimized before uploading to ensure fast delivery.
          </p>
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
              <h4 className="text-white font-medium mb-1">Update Successful!</h4>
              <p className="text-zinc-400 text-sm">Your changes have been committed directly to GitHub. The live site will reflect updates immediately.</p>
              <button onClick={() => setSuccess(false)} className="mt-3 text-xs text-[#D4AF37] font-bold uppercase tracking-wider hover:underline cursor-pointer">
                Return to Form
              </button>
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
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Cover Image {editingId ? '(Optional)' : '(Required)'}
                </label>
                <input type="file" required={!editingId} accept="image/*" onChange={e => setCoverImageFile(e.target.files[0])} className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" />
                {editingId && <p className="text-[10px] text-zinc-500 mt-2">Leave blank to keep existing cover image.</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Gallery Images {editingId && '(Optional)'}
                </label>
                <input type="file" multiple accept="image/*" onChange={e => setGalleryFiles(e.target.files)} className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" />
                {editingId && <p className="text-[10px] text-zinc-500 mt-2">Leave blank to keep existing gallery images.</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <button disabled={isSubmitting} type="submit" className="flex-1 py-4 bg-[#D4AF37] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all rounded-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isSubmitting ? 'Uploading to Server...' : (editingId ? 'Update Case Study' : 'Publish Case Study')}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={resetForm}
                  className="px-6 py-4 bg-zinc-900 text-zinc-300 font-bold text-xs tracking-wider uppercase hover:bg-zinc-800 hover:text-white transition-all rounded-none cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
