/**
 * Level system calculations
 * XP requirements increase progressively
 */

export const XP_PER_GAME = 10;
export const XP_WIN_BONUS = 5;

// XP required for each level (progressive formula)
export const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const getLevelFromXP = (xp: number): number => {
  let level = 1;
  let totalXP = 0;

  while (totalXP + getXPForLevel(level) <= xp) {
    totalXP += getXPForLevel(level);
    level++;
  }

  return level;
};

export const getXPProgress = (xp: number, level: number): { current: number; required: number; percentage: number } => {
  let totalXP = 0;
  for (let i = 1; i < level; i++) {
    totalXP += getXPForLevel(i);
  }

  const currentLevelXP = xp - totalXP;
  const requiredXP = getXPForLevel(level);
  const percentage = Math.min((currentLevelXP / requiredXP) * 100, 100);

  return {
    current: currentLevelXP,
    required: requiredXP,
    percentage,
  };
};

export const isGameUnlocked = (gameLevel: number, userLevel: number): boolean => {
  return userLevel >= gameLevel;
};
