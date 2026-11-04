interface Props {
  isOpen: boolean;
  bitcoins: number;
  onClose: () => void;
  onBuyItem: (itemName: string, cost: number) => void;
}

export const BlackMarketShop = ({ isOpen, bitcoins, onClose, onBuyItem }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="flex-grow flex flex-col justify-between space-y-4 my-2 font-mono">
      <div className="bg-[#0d131d] border border-purple-500/40 rounded-xl p-4 glow-purple">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-purple-300 flex items-center space-x-2">
              <i className="fa-solid fa-user-ninja text-purple-400"></i>
              <span>BLACK_MARKET // DARK_WEB_NODE</span>
            </h2>
            <p className="text-xs text-slate-400">
              Acquire rogue Zero-Days, hardware exploits, and upgrade protocols.
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer"
          >
            <i className="fa-solid fa-xmark mr-1"></i>RETURN_TO_NODE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Shop Item 1 */}
          <div className="bg-slate-950 border border-slate-800 hover:border-purple-500/60 p-4 rounded-xl flex flex-col justify-between space-y-3 transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-purple-950 text-purple-300 border border-purple-700 text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                  ZERO-DAY EXPLOIT
                </span>
                <span className="text-purple-400 font-bold font-['VT323'] text-lg">₿ 8</span>
              </div>
              <h3 className="font-bold text-white text-sm">root_access.exe</h3>
              <p className="text-xs text-slate-400 mt-1">Grants x1.5 Mult on all Escalation / Sequence combos.</p>
            </div>
            <button
              onClick={() => onBuyItem('root_access.exe', 8)}
              disabled={bitcoins < 8}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold py-2 rounded-lg text-xs uppercase transition cursor-pointer"
            >
              PURCHASE EXPLOIT
            </button>
          </div>

          {/* Shop Item 2 */}
          <div className="bg-slate-950 border border-slate-800 hover:border-cyan-500/60 p-4 rounded-xl flex flex-col justify-between space-y-3 transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                  PROTOCOL OVERCLOCK
                </span>
                <span className="text-purple-400 font-bold font-['VT323'] text-lg">₿ 6</span>
              </div>
              <h3 className="font-bold text-white text-sm">SYN Flood Upgrade</h3>
              <p className="text-xs text-slate-400 mt-1">Permanently increases base Bits for SYN commands (+15 Bits).</p>
            </div>
            <button
              onClick={() => onBuyItem('SYN Flood Upgrade', 6)}
              disabled={bitcoins < 6}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold py-2 rounded-lg text-xs uppercase transition cursor-pointer"
            >
              UPGRADE PROTOCOL
            </button>
          </div>

          {/* Shop Item 3 */}
          <div className="bg-slate-950 border border-slate-800 hover:border-emerald-500/60 p-4 rounded-xl flex flex-col justify-between space-y-3 transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                  UTILITY RIG
                </span>
                <span className="text-purple-400 font-bold font-['VT323'] text-lg">₿ 5</span>
              </div>
              <h3 className="font-bold text-white text-sm">+1 Connection Attempt</h3>
              <p className="text-xs text-slate-400 mt-1">Restores 1 lost attempt for the active hack target.</p>
            </div>
            <button
              onClick={() => onBuyItem('+1 Attempt', 5)}
              disabled={bitcoins < 5}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 font-bold py-2 rounded-lg text-xs uppercase transition cursor-pointer"
            >
              RESTORE CONNECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};