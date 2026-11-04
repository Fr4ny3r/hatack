import { NetworkCommand, Exploit, ComboResult } from '../types/game';

export function evaluateHand(selectedCommands: NetworkCommand[], activeExploits: Exploit[]): ComboResult {
  if (selectedCommands.length === 0) {
    return { name: 'NO_PAYLOAD', desc: 'Select commands to form an attack', baseBits: 0, mult: 1.0 };
  }

  const types = selectedCommands.map(c => c.type);
  const counts: Record<string, number> = {};
  types.forEach(t => counts[t] = (counts[t] || 0) + 1);
  const maxCount = Math.max(...Object.values(counts));

  let baseBits = selectedCommands.reduce((sum, c) => sum + c.bits + (c.glitched ? 10 : 0), 0);
  let mult = 1.0;
  let name = 'SINGLE_PACKET';
  let desc = 'Basic individual command injection';

  if (maxCount === 5) {
    name = 'SYSTEM_OVERLOAD (5-OF-A-KIND)';
    desc = 'Catastrophic buffer overwhelm';
    mult = 5.0;
  } else if (maxCount === 4) {
    name = 'BUFFER_OVERFLOW (4-OF-A-KIND)';
    desc = 'Massive memory corruption payload';
    mult = 3.5;
  } else if (maxCount === 3 && Object.keys(counts).length === 2) {
    name = 'DDoS_AMPLIFICATION (FULL HOUSE)';
    desc = 'Distributed synchronized traffic burst';
    mult = 3.0;
  } else if (maxCount === 3) {
    name = 'PORT_ESCALATION (TRIPLE)';
    desc = 'Triple-threaded privilege exploit';
    mult = 2.0;
  } else if (maxCount === 2 && Object.values(counts).filter(v => v === 2).length === 2) {
    name = 'DUAL_INJECTION (TWO PAIR)';
    desc = 'Parallel vector attack';
    mult = 1.5;
  } else if (maxCount === 2) {
    name = 'PACKET_DUPLICATION (PAIR)';
    desc = 'Duplicated protocol packet';
    mult = 1.2;
  }

  // Sinergias de Exploits (Jokers)
  activeExploits.forEach(exp => {
    if (exp.id === 'exp1' && types.includes('PING')) mult += 0.8;
    if (exp.id === 'exp2' && types.includes('SYN')) baseBits += 50;
    if (exp.id === 'exp3' && name.includes('DDoS')) mult += 2.0;
  });

  return { name, desc, baseBits, mult };
}