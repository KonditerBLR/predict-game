export type GameType = 'card' | 'dice' | 'number';

export type CardColor = 'red' | 'black';
export type DiceRange = 'low' | 'middle' | 'high';

export interface User {
  id: string;
  coins: number;
  energy: number;
  maxEnergy: number;
  xp: number;
  level: number;
  lastEnergyUpdate: number;
  gamesPlayed: number;
  gamesWon: number;
  totalWinnings: number;
}

export interface GameResult {
  won: boolean;
  prediction: string;
  actual: string;
  winAmount: number;
  xpGained: number;
}

export interface GameConfig {
  id: GameType;
  name: string;
  multiplier: number;
  minBet: number;
  unlockLevel: number;
  icon: string;
  description: string;
}

export interface AffiliateConfig {
  name: string;
  url: string;
  cta: string;
  bonus: string;
}

export type Language = 'en' | 'hi' | 'id';
