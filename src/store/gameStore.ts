import { create } from 'zustand';
import { GameType, GameConfig } from '@/types';

interface GameStore {
  currentGame: GameType | null;
  betAmount: number;
  isPlaying: boolean;
  showResult: boolean;
  gameConfigs: GameConfig[];
  setCurrentGame: (game: GameType | null) => void;
  setBetAmount: (amount: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setShowResult: (show: boolean) => void;
  getGameConfig: (game: GameType) => GameConfig | undefined;
}

const GAME_CONFIGS: GameConfig[] = [
  {
    id: 'card',
    name: 'Card Color',
    multiplier: 2,
    minBet: 10,
    unlockLevel: 1,
    icon: '🎴',
    description: 'Predict Red or Black',
  },
  {
    id: 'dice',
    name: 'Dice Game',
    multiplier: 3,
    minBet: 20,
    unlockLevel: 3,
    icon: '🎲',
    description: 'Predict Low/Middle/High',
  },
  {
    id: 'number',
    name: 'Number Range',
    multiplier: 10,
    minBet: 50,
    unlockLevel: 5,
    icon: '🔢',
    description: 'Guess number 1-10',
  },
];

export const useGameStore = create<GameStore>((set, get) => ({
  currentGame: null,
  betAmount: 10,
  isPlaying: false,
  showResult: false,
  gameConfigs: GAME_CONFIGS,

  setCurrentGame: (game) => set({ currentGame: game }),

  setBetAmount: (amount) => set({ betAmount: amount }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setShowResult: (show) => set({ showResult: show }),

  getGameConfig: (game) => {
    return get().gameConfigs.find((config) => config.id === game);
  },
}));
