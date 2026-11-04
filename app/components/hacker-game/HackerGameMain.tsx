// 'use client';

// import { useState } from 'react';
// import { NetworkCommand, Exploit, CommandType } from '@/types/game';
// import { evaluateHand } from './lib/evaluator';

// import { CRTOverlay } from './CRTOverlay';
// import { HeaderStatus } from './HeaderStatus';
// import { ExploitsBar } from './ExploitsBar';
// import { TerminalConsole } from './TerminalConsole';
// import { CommandBufferGrid } from './CommandBufferGrid';
// import { ActionControls } from './ActionControls';
// import { BlackMarketShop } from './BlackMarketShop';

// const COMMAND_TYPES: { type: CommandType; port: number; bits: number; color: string }[] = [
//   { type: 'PING', port: 80, bits: 15, color: 'border-emerald-500/60 text-emerald-300' },
//   { type: 'SYN', port: 443, bits: 25, color: 'border-cyan-500/60 text-cyan-300' },
//   { type: 'EXPLOIT', port: 8080, bits: 40, color: 'border-purple-500/60 text-purple-300' },
//   { type: 'ACK', port: 22, bits: 20, color: 'border-amber-500/60 text-amber-300' },
//   { type: 'BYPASS', port: 80, bits: 30, color: 'border-red-500/60 text-red-300' },
// ];

// function generateBuffer(count = 8): NetworkCommand[] {
//   return Array.from({ length: count }).map((_, i) => {
//     const randomCmd = COMMAND_TYPES[Math.floor(Math.random() * COMMAND_TYPES.length)];
//     return {
//       id: `cmd_${Date.now()}_${i}_${Math.random()}`,
//       ...randomCmd,
//       glitched: Math.random() < 0.15,
//     };
//   });
// }

// export default function HackerGameMain() {
//   const [nodeLevel] = useState(1);
//   const [targetScore] = useState(2500);
//   const [currentScore, setCurrentScore] = useState(0);
//   const [attempts, setAttempts] = useState(4);
//   const [maxAttempts] = useState(4);
//   const [purges, setPurges] = useState(3);
//   const [maxPurges] = useState(3);
//   const [bitcoins, setBitcoins] = useState(15);
//   const [isShopOpen, setIsShopOpen] = useState(false);
//   const [isGlitched, setIsGlitched] = useState(false);

//   const [exploits, setExploits] = useState<Exploit[]>([
//     { id: 'exp1', name: 'worm.sh', type: 'SYNERGY', desc: '+4x Mult for PING commands in sequence', rarity: 'uncommon', icon: 'fa-bug', color: 'text-emerald-400' },
//     { id: 'exp2', name: 'botnet_node.sys', type: 'FLAT_BITS', desc: '+50 Base Bits whenever SYN is included', rarity: 'common', icon: 'fa-network-wired', color: 'text-cyan-400' },
//     { id: 'exp3', name: 'zero_day_v1', type: 'MULT_BOOST', desc: '+2.0x Protocol Mult on DDoS combinations', rarity: 'rare', icon: 'fa-skull', color: 'text-purple-400' },
//   ]);

//   const [buffer, setBuffer] = useState<NetworkCommand[]>(() => generateBuffer(8));
//   const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
//   const [logs, setLogs] = useState<{ text: string; color: string }[]>([
//     { text: '[SYS_INIT] Connected to target NODE_01. Security defenses active.', color: 'text-emerald-400' },
//     { text: '[INFO] Construct a command payload in the buffer to breach encryption.', color: 'text-slate-400' },
//   ]);

//   const selectedCmds = selectedIndices.map((i) => buffer[i]);
//   const combo = evaluateHand(selectedCmds, exploits);

//   const logTerminal = (text: string, color = 'text-slate-300') => {
//     setLogs((prev) => [{ text, color }, ...prev.slice(0, 5)]);
//   };

//   const toggleSelectCommand = (index: number) => {
//     if (selectedIndices.includes(index)) {
//       setSelectedIndices(selectedIndices.filter((i) => i !== index));
//     } else {
//       if (selectedIndices.length < 5) {
//         setSelectedIndices([...selectedIndices, index]);
//       } else {
//         logTerminal('[WARN] Command buffer full! Maximum 5 commands per attack.', 'text-amber-400');
//       }
//     }
//   };

//   const handleExecute = () => {
//     if (selectedIndices.length === 0 || attempts <= 0) return;

//     // Disparar animación de Glitch visual
//     setIsGlitched(true);
//     setTimeout(() => setIsGlitched(false), 200);

//     const damage = Math.floor(combo.baseBits * combo.mult);
//     const newScore = currentScore + damage;
//     setCurrentScore(newScore);
//     setAttempts((prev) => prev - 1);

//     logTerminal(`[ATTACK_SUCCESS] Executed ${combo.name} for +${damage.toLocaleString()} BITS!`, 'text-cyan-400');

//     if (newScore >= targetScore) {
//       logTerminal('[NODE_BREACHED] Encryption broken! Sector clear. Bitcoins awarded.', 'text-emerald-400');
//       setBitcoins((prev) => prev + 10);
//     }

//     // Reemplazar cartas jugadas
//     const remainingBuffer = buffer.filter((_, idx) => !selectedIndices.includes(idx));
//     const replenished = generateBuffer(selectedIndices.length);
//     setBuffer([...remainingBuffer, ...replenished]);
//     setSelectedIndices([]);
//   };

//   const handlePurge = () => {
//     if (selectedIndices.length === 0 || purges <= 0) return;

//     setPurges((prev) => prev - 1);
//     logTerminal('[BUFFER_PURGE] Flushed selected command slots.', 'text-amber-400');

//     const remainingBuffer = buffer.filter((_, idx) => !selectedIndices.includes(idx));
//     const replenished = generateBuffer(selectedIndices.length);
//     setBuffer([...remainingBuffer, ...replenished]);
//     setSelectedIndices([]);
//   };

//   const handleBuyItem = (itemName: string, cost: number) => {
//     if (bitcoins >= cost) {
//       setBitcoins((prev) => prev - cost);
//       logTerminal(`[PURCHASE] Acquired ${itemName} for ₿${cost}.`, 'text-purple-400');

//       if (itemName === '+1 Attempt' && attempts < maxAttempts) {
//         setAttempts((prev) => prev + 1);
//       }
//     }
//   };

//   return (
//     <div className="crt-container">
//       <CRTOverlay />

//       <div className={`crt-screen max-w-7xl mx-auto p-3 md:p-6 flex flex-col min-h-screen justify-between relative z-10 ${isGlitched ? 'glitch-trigger' : ''}`}>
//         <HeaderStatus
//           nodeLevel={nodeLevel}
//           targetScore={targetScore}
//           currentScore={currentScore}
//           attempts={attempts}
//           maxAttempts={maxAttempts}
//           purges={purges}
//           maxPurges={maxPurges}
//           bitcoins={bitcoins}
//           isShopOpen={isShopOpen}
//           onToggleShop={() => setIsShopOpen(!isShopOpen)}
//         />

//         {!isShopOpen ? (
//           <main className="flex-grow flex flex-col justify-between space-y-4">
//             <ExploitsBar exploits={exploits} />

//             <TerminalConsole logs={logs} combo={combo} />

//             <CommandBufferGrid
//               buffer={buffer}
//               selectedIndices={selectedIndices}
//               onToggleSelect={toggleSelectCommand}
//             />

//             <ActionControls
//               hasSelection={selectedIndices.length > 0}
//               canExecute={attempts > 0}
//               canPurge={purges > 0}
//               onExecute={handleExecute}
//               onPurge={handlePurge}
//             />
//           </main>
//         ) : (
//           <BlackMarketShop
//             isOpen={isShopOpen}
//             bitcoins={bitcoins}
//             onClose={() => setIsShopOpen(false)}
//             onBuyItem={handleBuyItem}
//           />
//         )}

//         <footer className="mt-4 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 space-y-1 sm:space-y-0 font-mono">
//           <div>
//             <span>OVERRIDE v0.4.2 // BALATRO-INSPIRED CYBER DECK</span>
//           </div>
//           <div className="flex space-x-4">
//             <span>
//               <i className="fa-solid fa-shield-halved text-emerald-500 mr-1"></i>SYSTEM_SECURE
//             </span>
//             <span>
//               <i className="fa-solid fa-wifi text-cyan-500 mr-1"></i>LATENCY: 12ms
//             </span>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }