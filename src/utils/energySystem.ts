/**
 * Energy system - regenerates 1 energy per 30 minutes
 */

const ENERGY_REGEN_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const calculateEnergyRegeneration = (
  currentEnergy: number,
  maxEnergy: number,
  lastUpdate: number
): number => {
  if (currentEnergy >= maxEnergy) {
    return currentEnergy;
  }

  const now = Date.now();
  const timePassed = now - lastUpdate;
  const energyToAdd = Math.floor(timePassed / ENERGY_REGEN_TIME);

  return Math.min(currentEnergy + energyToAdd, maxEnergy);
};

export const getTimeUntilNextEnergy = (lastUpdate: number): number => {
  const now = Date.now();
  const timePassed = now - lastUpdate;
  const timeUntilNext = ENERGY_REGEN_TIME - (timePassed % ENERGY_REGEN_TIME);

  return timeUntilNext;
};

export const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
