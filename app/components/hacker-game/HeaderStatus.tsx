interface Props {
  nodeLevel: number;
  targetScore: number;
  currentScore: number;
  attempts: number;
  maxAttempts: number;
  purges: number;
  maxPurges: number;
  bitcoins: number;
  isShopOpen: boolean;
  onToggleShop: () => void;
}

export const HeaderStatus = ({
  nodeLevel,
  targetScore,
  currentScore,
  attempts,
  maxAttempts,
  purges,
  maxPurges,
  bitcoins,
  onToggleShop,
}: Props) => {
  const percentage = Math.min((currentScore / targetScore) * 100, 100);

  return (
    <header className="bg-[#0d131d] border border-emerald-500/30 rounded-xl p-4 mb-4 glow-green">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Target Metadata */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-2.5 rounded-lg text-center min-w-[100px]">
            <span className="text-xs text-emerald-400/70 block uppercase tracking-wider">SEC_LEVEL</span>
            <span className="text-xl font-bold text-emerald-400 font-['VT323'] tracking-widest">
              NODE_0{nodeLevel}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-server text-cyan-400 animate-pulse"></i>
              <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">CORP_MAINFRAME_V4</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">ENCRYPTION: AES-256-BIT // THREAT: MODERATE</p>
          </div>
        </div>

        {/* Breach Progress */}
        <div className="w-full md:w-1/3 bg-slate-900/90 border border-slate-700/60 p-3 rounded-lg">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">BREACH ENCRYPTION</span>
            <span className="font-bold text-cyan-400">
              {currentScore.toLocaleString()} / {targetScore.toLocaleString()} BITS
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden relative">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Run Stats */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-slate-900 border border-cyan-500/40 px-3 py-1.5 rounded-lg text-center">
            <span className="text-[10px] text-cyan-400 block uppercase">ATTEMPTS</span>
            <span className="text-lg font-bold text-cyan-300 font-['VT323']">
              {attempts} / {maxAttempts}
            </span>
          </div>

          <div className="bg-slate-900 border border-amber-500/40 px-3 py-1.5 rounded-lg text-center">
            <span className="text-[10px] text-amber-400 block uppercase">PURGES</span>
            <span className="text-lg font-bold text-amber-300 font-['VT323']">
              {purges} / {maxPurges}
            </span>
          </div>

          <div className="bg-slate-900 border border-purple-500/40 px-3 py-1.5 rounded-lg text-center">
            <span className="text-[10px] text-purple-400 block uppercase">BITCOINS</span>
            <span className="text-lg font-bold text-purple-300 font-['VT323']">₿ {bitcoins}</span>
          </div>

          <button
            onClick={onToggleShop}
            className="bg-purple-900/40 border border-purple-500 text-purple-300 hover:bg-purple-800/60 hover:text-white px-3 py-3 rounded-lg transition font-semibold text-xs flex items-center space-x-1.5 glow-purple cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="hidden sm:inline">BLACK_MARKET</span>
          </button>
        </div>
      </div>
    </header>
  );
};