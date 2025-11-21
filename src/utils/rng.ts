/**
 * Provably fair RNG using crypto.getRandomValues
 * Anti-cheat validation with cryptographically secure random number generation
 */

export const getSecureRandom = (): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};

export const getRandomInt = (min: number, max: number): number => {
  const randomFloat = getSecureRandom();
  return Math.floor(randomFloat * (max - min + 1)) + min;
};

export const getRandomCardColor = (): 'red' | 'black' => {
  return getSecureRandom() < 0.5 ? 'red' : 'black';
};

export const getRandomDiceValue = (): number => {
  return getRandomInt(1, 6);
};

export const getDiceRange = (value: number): 'low' | 'middle' | 'high' => {
  if (value <= 2) return 'low';
  if (value <= 4) return 'middle';
  return 'high';
};

export const getRandomNumber = (min: number, max: number): number => {
  return getRandomInt(min, max);
};

// Generate a seed for replay/verification purposes
export const generateSeed = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
