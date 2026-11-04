export type CommandType = 'PING' | 'SYN' | 'EXPLOIT' | 'ACK' | 'BYPASS';

export interface NetworkCommand {
  id: string;
  type: CommandType;
  port: number;
  bits: number;
  color: string;
  glitched?: boolean;
}

export interface Exploit {
  id: string;
  name: string;
  type: string;
  desc: string;
  rarity: 'common' | 'uncommon' | 'rare';
  icon: string;
  color: string;
}

export interface ComboResult {
  name: string;
  desc: string;
  baseBits: number;
  mult: number;
}