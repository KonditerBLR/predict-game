import { GameResult, CardColor, DiceRange } from '@/types';
import { getRandomCardColor, getRandomDiceValue, getDiceRange, getRandomNumber } from './rng';
import { XP_PER_GAME, XP_WIN_BONUS } from './levelSystem';

export const playCardGame = (prediction: CardColor, betAmount: number): GameResult => {
  const actual = getRandomCardColor();
  const won = prediction === actual;
  const winAmount = won ? betAmount * 2 : 0;
  const xpGained = XP_PER_GAME + (won ? XP_WIN_BONUS : 0);

  return {
    won,
    prediction,
    actual,
    winAmount,
    xpGained,
  };
};

export const playDiceGame = (prediction: DiceRange, betAmount: number): GameResult => {
  const diceValue = getRandomDiceValue();
  const actual = getDiceRange(diceValue);
  const won = prediction === actual;

  // Different multipliers based on prediction
  const multipliers: Record<DiceRange, number> = {
    low: 3,     // 2/6 chance = 33%
    middle: 2,  // 3/6 chance = 50%
    high: 3,    // 2/6 chance = 33%
  };

  const winAmount = won ? betAmount * multipliers[prediction] : 0;
  const xpGained = XP_PER_GAME + (won ? XP_WIN_BONUS : 0);

  return {
    won,
    prediction: `${prediction} (dice: ${diceValue})`,
    actual: `${actual} (dice: ${diceValue})`,
    winAmount,
    xpGained,
  };
};

export const playNumberGame = (prediction: number, betAmount: number): GameResult => {
  const actual = getRandomNumber(1, 10);
  const won = prediction === actual;
  const winAmount = won ? betAmount * 10 : 0;
  const xpGained = XP_PER_GAME + (won ? XP_WIN_BONUS : 0);

  return {
    won,
    prediction: prediction.toString(),
    actual: actual.toString(),
    winAmount,
    xpGained,
  };
};
