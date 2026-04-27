import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Search, 
  Trophy, 
  Zap, 
  Clock, 
  Flame, 
  ArrowLeft,
  Maximize2,
  Share2,
  Info,
  Menu,
  X
} from 'lucide-react';
import { games } from './data/games';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ['All', 'Action', 'Sports', 'Simulation', 'Puzzle', 'Arcade', 'Casual'];

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-[#08080a]/80 backdrop-blur-md border-b border-slate-800 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => {
              setSelectedGame(null);
              setActiveCategory('All');
              setSearchQuery('');
            }}
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(79,70,229,0.6)] group-hover:scale-110 transition-transform">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:block">Calculators</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold hidden sm:block">Scientific & Graphing Solutions</p>
            </div>
          </div>

          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search titles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-400">
              <span className="text-white border-b-2 border-indigo-500 pb-1 cursor-pointer">Library</span>
            </nav>
            <button 
              className="p-2 text-slate-400 hover:text-white transition-colors block md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Categories Bar */}
        {!selectedGame && (
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap
                  ${activeCategory === cat 
                    ? 'bg-slate-900 border border-indigo-500/30 text-white' 
                    : 'bg-slate-900/40 border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'}
                `}
              >
                {cat} Games
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="group flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-indigo-500/50 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                  <button className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-indigo-500/50 transition-colors"><Share2 className="w-4 h-4" /></button>
                  <button className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-indigo-500/50 transition-colors"><Info className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="aspect-video w-full bg-black rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl shadow-indigo-500/10 relative">
                <iframe 
                  src={selectedGame.url} 
                  className="w-full h-full border-0"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">{selectedGame.title}</h2>
                  <div className="flex items-center gap-3">
                     <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase rounded-lg border border-indigo-500/20">{selectedGame.category}</span>
                     <div className="flex gap-2">
                        {selectedGame.tags.map(tag => (
                          <span key={tag} className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">#{tag}</span>
                        ))}
                     </div>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 transition-all active:scale-95">
                  Launch Fullscreen
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-slate-900">
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xs uppercase font-black text-slate-500 tracking-[0.3em]">Operational Data</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{selectedGame.description}</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs uppercase font-black text-slate-500 tracking-[0.3em]">Similar Nodes</h3>
                  <div className="space-y-3">
                    {games.slice(0, 4).filter(g => g.id !== selectedGame.id).map(game => (
                      <div 
                        key={game.id} 
                        className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all group"
                        onClick={() => setSelectedGame(game)}
                      >
                        <div className="w-14 h-14 bg-indigo-900/20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5">
                           <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${game.id}`} alt="" className="w-10 h-10 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{game.title}</div>
                          <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest">{game.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Hero */}
              {!searchQuery && (
                <div className="relative h-[480px] rounded-[3rem] overflow-hidden group border border-slate-800 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070" 
                    className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 grayscale" 
                    alt="Hero"
                  />
                  <div className="absolute inset-x-12 bottom-12 z-20 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500 rounded-lg">
                        <Zap className="w-5 h-5 text-white fill-white" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">System Priority: Active</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                      ADVANCED<br/><span className="text-indigo-600">CALCULATORS</span>
                    </h2>
                    <p className="text-slate-500 text-xl max-w-xl hidden md:block font-medium">
                      High-performance computational algorithms and graphing tools. Secured library featuring proprietary mathematical solutions for academic research.
                    </p>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-900 pb-6">
                  <h3 className="text-xs uppercase font-black tracking-[0.4em] text-slate-500">Library Cache // {filteredGames.length} Items Found</h3>
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                     <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Node Status: Operational</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredGames.map((game, index) => (
                      <motion.div
                        layout
                        key={game.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-4 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all cursor-pointer box-border"
                        onClick={() => setSelectedGame(game)}
                      >
                        <div className="aspect-video rounded-2xl bg-slate-950 mb-4 flex items-center justify-center relative overflow-hidden border border-white/5 shadow-inner">
                          <img 
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${game.id}`} 
                            className="w-20 h-20 opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 invert group-hover:invert-0" 
                            alt={game.title} 
                          />
                          <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors" />
                          <div className="absolute top-3 right-3 text-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Zap className="w-4 h-4 fill-indigo-500" />
                          </div>
                        </div>
                        <h3 className="font-bold text-lg text-slate-100 mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{game.title}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">{game.category}</span>
                          <span className="text-[10px] text-indigo-400 font-black tracking-widest">98% POS</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {filteredGames.length === 0 && (
                <div className="py-32 text-center space-y-8 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
                  <div className="inline-block p-6 bg-slate-900 rounded-full border border-slate-800">
                     <Search className="w-16 h-16 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-400 underline decoration-indigo-500/30">Target data not found</h3>
                    <p className="text-slate-600 mt-3 text-lg">Query: "{searchQuery}" could not be resolved in any active library nodes.</p>
                  </div>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="px-10 py-3 bg-slate-900 border border-slate-700 text-slate-300 font-black uppercase text-xs tracking-widest rounded-full hover:border-indigo-500 hover:text-white transition-all"
                  >
                    Refresh Directory
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-t border-slate-900 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20 text-[11px] text-slate-600">
          <div className="flex flex-wrap gap-8">
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Server: US-East-1 Online</span>
            <span>Connected Clients: 1,429</span>
            <span>Proxy Status: HTTPS Mirror 4 Active</span>
          </div>
          <div className="flex gap-8 font-bold uppercase tracking-widest">
            <span className="text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors">Privacy Protocol</span>
            <span className="text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors">Usage Terms</span>
            <span className="text-slate-400/30">v4.2.0-Alpha</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-slate-900 pt-12">
          <div className="space-y-4">
            <h1 className="text-xl font-black tracking-tighter uppercase text-white">Calculators</h1>
            <p className="text-xs text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
              Advanced computing resources for scientific research and analysis.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 underline decoration-indigo-500/50 underline-offset-4">Directory</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Nodes List</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Uptime Stats</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">System API</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 underline decoration-indigo-500/50 underline-offset-4">Security</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Encryption</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Transparency</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Bug Bounty</li>
            </ul>
          </div>
          <div className="flex gap-4 self-start">
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500 hover:text-white transition-all cursor-pointer opacity-40 hover:opacity-100"><Share2 className="w-5 h-5" /></div>
             <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500 hover:text-white transition-all cursor-pointer opacity-40 hover:opacity-100"><Info className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase font-black tracking-[0.5em] text-slate-800">
          <div>© 2024 CALCULATORS / CORE SECURED</div>
          <div className="flex gap-10">
             <span>Coord: 37.7749N 122.4194W</span>
             <span className="text-green-500/40">Lat: 0.12ms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
