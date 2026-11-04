interface Props {
  hasSelection: boolean;
  canExecute: boolean;
  canPurge: boolean;
  onExecute: () => void;
  onPurge: () => void;
}

export const ActionControls = ({ hasSelection, canExecute, canPurge, onExecute, onPurge }: Props) => {
  return (
    <section className="flex flex-col sm:flex-row gap-3 pt-2 font-mono">
      <button
        onClick={onExecute}
        disabled={!hasSelection || !canExecute}
        className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center space-x-2 shadow-lg disabled:cursor-not-allowed uppercase tracking-wider text-sm cursor-pointer"
      >
        <i className="fa-solid fa-bolt"></i>
        <span>EXECUTE ATTACK SEQUENCE</span>
      </button>

      <button
        onClick={onPurge}
        disabled={!hasSelection || !canPurge}
        className="bg-amber-900/40 hover:bg-amber-800/60 disabled:bg-slate-800/40 border border-amber-500/50 text-amber-300 disabled:text-slate-600 disabled:border-slate-800 font-bold py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider cursor-pointer"
      >
        <i className="fa-solid fa-trash-can"></i>
        <span>PURGE BUFFER</span>
      </button>
    </section>
  );
};