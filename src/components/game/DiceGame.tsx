import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { playDiceGame } from '@/utils/gameLogic';
import { DiceRange, GameResult } from '@/types';
import { Button, Card } from '@/components/common';
import { ResultModal } from './ResultModal';

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export const DiceGame: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRange, setSelectedRange] = useState<DiceRange | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const { coins, energy, hasEnergy, canAffordBet, consumeEnergy, processGameResult } = useUserStore();
  const { betAmount, setBetAmount } = useGameStore();

  const betAmounts = [20, 50, 100, 200];

  const handleRangeSelect = (range: DiceRange) => {
    if (!isRolling) {
      setSelectedRange(range);
    }
  };

  const handlePlay = async () => {
    if (!selectedRange || !hasEnergy() || !canAffordBet(betAmount)) {
      return;
    }

    if (!consumeEnergy()) {
      return;
    }

    setIsRolling(true);

    // Animate dice rolling
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls >= 10) {
        clearInterval(rollInterval);

        // Get final result
        const gameResult = playDiceGame(selectedRange, betAmount);
        const finalValue = parseInt(gameResult.actual.match(/\d+/)?.[0] || '1');
        setDiceValue(finalValue);
        setResult(gameResult);

        // Process result
        processGameResult(gameResult, betAmount);

        setTimeout(() => {
          setIsRolling(false);
          setShowResultModal(true);
        }, 500);
      }
    }, 100);
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    setSelectedRange(null);
    setResult(null);
  };

  const canPlay = selectedRange && hasEnergy() && canAffordBet(betAmount) && !isRolling;

  return (
    <div className="min-h-screen bg-app-bg text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-green to-accent-gold bg-clip-text text-transparent">
            {t('games.dice.name')}
          </h1>
          <p className="text-gray-400">{t('games.dice.description')}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="text-accent-gold">💰 {coins}</span>
            <span className="text-accent-green">⚡ {energy}/5</span>
            <span className="text-accent-red">{t('games.dice.multiplier')}</span>
          </div>
        </div>

        {/* Bet Selection */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t('actions.selectAmount')}</h3>
          <div className="grid grid-cols-4 gap-2">
            {betAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                disabled={!canAffordBet(amount)}
                className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                  betAmount === amount
                    ? 'bg-accent-green text-app-bg'
                    : 'bg-app-bg text-white hover:bg-app-border'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {amount}
              </button>
            ))}
          </div>
        </Card>

        {/* Dice Display */}
        <div className="mb-8 flex justify-center">
          <div
            className={`w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-8xl transform transition-all ${
              isRolling ? 'animate-spin' : ''
            }`}
          >
            {DICE_FACES[diceValue - 1]}
          </div>
        </div>

        {/* Range Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {t('games.dice.description')}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRangeSelect('low')}
              disabled={isRolling}
              className={`p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                selectedRange === 'low'
                  ? 'bg-accent-green text-app-bg shadow-lg shadow-accent-green/50 scale-105'
                  : 'bg-gradient-to-br from-blue-600 to-blue-800 hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-3xl mb-2">⚀⚁</div>
              {t('games.dice.low')}
              <div className="text-xs mt-1">3x</div>
            </button>

            <button
              onClick={() => handleRangeSelect('middle')}
              disabled={isRolling}
              className={`p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                selectedRange === 'middle'
                  ? 'bg-accent-gold text-app-bg shadow-lg shadow-accent-gold/50 scale-105'
                  : 'bg-gradient-to-br from-yellow-600 to-orange-600 hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-3xl mb-2">⚂⚃</div>
              {t('games.dice.middle')}
              <div className="text-xs mt-1">2x</div>
            </button>

            <button
              onClick={() => handleRangeSelect('high')}
              disabled={isRolling}
              className={`p-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                selectedRange === 'high'
                  ? 'bg-accent-red text-white shadow-lg shadow-accent-red/50 scale-105'
                  : 'bg-gradient-to-br from-red-600 to-red-800 hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-3xl mb-2">⚄⚅</div>
              {t('games.dice.high')}
              <div className="text-xs mt-1">3x</div>
            </button>
          </div>
        </div>

        {/* Play Button */}
        <Button
          onClick={handlePlay}
          disabled={!canPlay}
          variant="primary"
          size="lg"
          fullWidth
          className="text-xl py-6"
        >
          {isRolling ? '🎲 Rolling...' : `🎮 ${t('actions.play')} (${betAmount} coins)`}
        </Button>

        {/* Status Messages */}
        {!hasEnergy() && (
          <p className="text-center text-accent-red mt-4">
            ⚡ {t('status.notEnoughEnergy')}
          </p>
        )}
        {!canAffordBet(betAmount) && hasEnergy() && (
          <p className="text-center text-accent-red mt-4">
            💰 {t('status.notEnoughCoins')}
          </p>
        )}
      </div>

      {/* Result Modal */}
      {result && (
        <ResultModal
          isOpen={showResultModal}
          result={result}
          onClose={handlePlayAgain}
          betAmount={betAmount}
        />
      )}
    </div>
  );
};
