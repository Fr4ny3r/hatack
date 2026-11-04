import { ComboResult } from '../../types/game';

interface Props {
  logs: { text: string; color: string }[];
  combo: ComboResult;
}

export const TerminalConsole = ({ logs, combo }: Props) => {
  const total = Math.floor(combo.baseBits * combo.mult);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 font-mono">
      {/* Terminal Live Output */}
      <div className="md:col-span-2 bg-[#090d14] border border-slate-800 rounded-xl p-3 h-36 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1 text-xs text-slate-500">
          <span>
            <i className="fa-solid fa-terminal mr-1 text-emerald-500"></i>CONSOLE_OUTPUT
          </span>
          <span className="text-[10px] text-emerald-500/60 animate-pulse">● LIVE_FEED</span>
        </div>
        <div className="text-xs space-y-1 overflow-y-auto pr-1 text-slate-300">
          {logs.map((log, index) => (
            <p key={index} className={log.color}>
              {log.text}
            </p>
          ))}
        </div>
      </div>

      {/* Combo Calculation Scoreboard */}
      <div className="bg-[#0d131d] border border-slate-800 rounded-xl p-3 flex flex-col justify-between relative glow-cyan">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
            DETECTED ATTACK PATTERN
          </span>
          <h2 className="text-base font-bold text-cyan-300 text-glow-cyan truncate">{combo.name}</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{combo.desc}</p>
        </div>

        <div className="my-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between font-['VT323']">
          <div className="text-center">
            <span className="text-[10px] text-slate-500 block font-sans">BITS (BASE)</span>
            <span className="text-2xl text-cyan-400 font-bold">{combo.baseBits}</span>
          </div>
          <span className="text-xl text-slate-500 font-bold">X</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 block font-sans">PROTOCOL (MULT)</span>
            <span className="text-2xl text-red-400 font-bold">{combo.mult.toFixed(1)}x</span>
          </div>
          <span className="text-xl text-slate-500 font-bold">=</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 block font-sans">TOTAL DAMAGE</span>
            <span className="text-2xl text-emerald-400 font-bold">{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};