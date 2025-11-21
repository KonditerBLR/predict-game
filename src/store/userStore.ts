import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, GameResult } from '@/types';
import { calculateEnergyRegeneration } from '@/utils/energySystem';
import { getLevelFromXP } from '@/utils/levelSystem';

interface UserStore extends User {
  initUser: () => void;
  updateCoins: (amount: number) => void;
  updateEnergy: () => void;
  consumeEnergy: () => boolean;
  addEnergy: (amount: number) => void;
  processGameResult: (result: GameResult, betAmount: number) => void;
  canAffordBet: (amount: number) => boolean;
  hasEnergy: () => boolean;
  addCoinsFromAd: () => void;
  addEnergyFromAd: () => void;
}

const INITIAL_USER: User = {
  id: '',
  coins: 1000,
  energy: 5,
  maxEnergy: 5,
  xp: 0,
  level: 1,
  lastEnergyUpdate: Date.now(),
  gamesPlayed: 0,
  gamesWon: 0,
  totalWinnings: 0,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_USER,

      initUser: () => {
        const state = get();

        // Auto-regenerate energy on init
        const newEnergy = calculateEnergyRegeneration(
          state.energy,
          state.maxEnergy,
          state.lastEnergyUpdate
        );

        if (newEnergy !== state.energy) {
          set({
            energy: newEnergy,
            lastEnergyUpdate: Date.now(),
          });
        }
      },

      updateCoins: (amount: number) => {
        set((state) => ({
          coins: Math.max(0, state.coins + amount),
        }));
      },

      updateEnergy: () => {
        const state = get();
        const newEnergy = calculateEnergyRegeneration(
          state.energy,
          state.maxEnergy,
          state.lastEnergyUpdate
        );

        if (newEnergy !== state.energy) {
          set({
            energy: newEnergy,
            lastEnergyUpdate: Date.now(),
          });
        }
      },

      consumeEnergy: () => {
        const state = get();
        get().updateEnergy();

        if (state.energy > 0) {
          set({
            energy: state.energy - 1,
            lastEnergyUpdate: Date.now(),
          });
          return true;
        }
        return false;
      },

      addEnergy: (amount: number) => {
        set((state) => ({
          energy: Math.min(state.maxEnergy, state.energy + amount),
          lastEnergyUpdate: Date.now(),
        }));
      },

      processGameResult: (result: GameResult, betAmount: number) => {
        set((state) => {
          const newXP = state.xp + result.xpGained;
          const newLevel = getLevelFromXP(newXP);
          const leveledUp = newLevel > state.level;

          // Bonus coins on level up
          const levelUpBonus = leveledUp ? 100 * newLevel : 0;

          return {
            coins: state.coins - betAmount + result.winAmount + levelUpBonus,
            xp: newXP,
            level: newLevel,
            gamesPlayed: state.gamesPlayed + 1,
            gamesWon: state.gamesWon + (result.won ? 1 : 0),
            totalWinnings: state.totalWinnings + result.winAmount,
          };
        });
      },

      canAffordBet: (amount: number) => {
        return get().coins >= amount;
      },

      hasEnergy: () => {
        get().updateEnergy();
        return get().energy > 0;
      },

      addCoinsFromAd: () => {
        set((state) => ({
          coins: state.coins + 50,
        }));
      },

      addEnergyFromAd: () => {
        set((state) => ({
          energy: Math.min(state.maxEnergy, state.energy + 1),
          lastEnergyUpdate: Date.now(),
        }));
      },
    }),
    {
      name: 'prediction-master-user',
    }
  )
);
