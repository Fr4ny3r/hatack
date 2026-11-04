import { NetworkCommand } from '../../types/game';

interface Props {
  buffer: NetworkCommand[];
  selectedIndices: number[];
  onToggleSelect: (index: number) => void;
}

export const CommandBufferGrid = ({ buffer, selectedIndices, onToggleSelect }: Props) => {
  return (
    <section className="space-y-3 font-mono">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center space-x-2">
          <i className="fa-solid fa-code text-cyan-400"></i>
          <span>COMMAND_BUFFER (SELECT UP TO 5 COMMANDS)</span>
        </span>
        <span className="text-xs text-cyan-400 font-mono">{selectedIndices.length} / 5 Selected</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
        {buffer.map((cmd, idx) => {
          const isSelected = selectedIndices.includes(idx);
          return (
            <div
              key={cmd.id}
              onClick={() => onToggleSelect(idx)}
              className={`cmd-card border rounded-xl p-2.5 flex flex-col justify-between h-28 relative ${cmd.color} ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold opacity-70">PORT:{cmd.port}</span>
                {cmd.glitched && (
                  <i
                    className="fa-solid fa-sparkles text-amber-400 text-xs animate-pulse"
                    title="GLITCHED (+10 BITS)"
                  ></i>
                )}
              </div>
              <div className="my-auto text-center">
                <span className="text-sm font-bold tracking-wider block">{cmd.type}</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  +{cmd.bits + (cmd.glitched ? 10 : 0)} BITS
                </span>
              </div>
              <div className="text-[9px] text-center text-slate-500 border-t border-slate-800/60 pt-1">
                CMD_0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};