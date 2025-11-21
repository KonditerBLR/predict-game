import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { playCardGame } from '@/utils/gameLogic';
import { CardColor, GameResult } from '@/types';
import { Button, Card } from '@/components/common';
import { ResultModal } from './ResultModal';

export const CardGame: React.FC = () => {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState<CardColor | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [revealedColor, setRevealedColor] = useState<CardColor | null>(null);

  const { coins, energy, hasEnergy, canAffordBet, consumeEnergy, processGameResult } = useUserStore();
  const { betAmount, setBetAmount } = useGameStore();

  const betAmounts = [10, 25, 50, 100, 250];

  const handleColorSelect = (color: CardColor) => {
    if (!isFlipping) {
      setSelectedColor(color);
    }
  };

  const handlePlay = async () => {
    if (!selectedColor || !hasEnergy() || !canAffordBet(betAmount)) {
      return;
    }

    if (!consumeEnergy()) {
      return;
    }

    setIsFlipping(true);
    setRevealedColor(null);

    // Simulate card flip delay
    setTimeout(() => {
      const gameResult = playCardGame(selectedColor, betAmount);
      setResult(gameResult);
      setRevealedColor(gameResult.actual as CardColor);

      // Process result
      processGameResult(gameResult, betAmount);

      setTimeout(() => {
        setIsFlipping(false);
        setShowResultModal(true);
      }, 600);
    }, 300);
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    setSelectedColor(null);
    setRevealedColor(null);
    setResult(null);
  };

  const canPlay = selectedColor && hasEnergy() && canAffordBet(betAmount) && !isFlipping;

  return (
    <div className="min-h-screen bg-app-bg text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-green to-accent-gold bg-clip-text text-transparent">
            {t('games.card.name')}
          </h1>
          <p className="text-gray-400">{t('games.card.description')}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="text-accent-gold">💰 {coins}</span>
            <span className="text-accent-green">⚡ {energy}/5</span>
            <span className="text-accent-red">{t('games.card.multiplier')}</span>
          </div>
        </div>

        {/* Bet Selection */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t('actions.selectAmount')}</h3>
          <div className="grid grid-cols-5 gap-2">
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

        {/* Card Display */}
        <div className="mb-8 flex justify-center">
          <div
            className={`relative w-48 h-72 transition-all duration-600 transform-style-3d ${
              isFlipping ? 'animate-flip' : ''
            }`}
          >
            {/* Card Back (default state) */}
            {!revealedColor && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/20">
                <div className="text-6xl">🎴</div>
              </div>
            )}

            {/* Card Front (revealed) */}
            {revealedColor && (
              <div
                className={`absolute inset-0 rounded-2xl shadow-2xl flex items-center justify-center border-4 ${
                  revealedColor === 'red'
                    ? 'bg-gradient-to-br from-red-600 to-red-800 border-red-400'
                    : 'bg-gradient-to-br from-gray-800 to-black border-gray-600'
                }`}
              >
                <div className="text-8xl">
                  {revealedColor === 'red' ? '♥️' : '♠️'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {t('games.card.description')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleColorSelect('red')}
              disabled={isFlipping}
              className={`p-8 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 ${
                selectedColor === 'red'
                  ? 'bg-accent-red shadow-lg shadow-accent-red/50 scale-105'
                  : 'bg-gradient-to-br from-red-600 to-red-800 hover:shadow-lg hover:shadow-red-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-5xl mb-2">♥️</div>
              {t('games.card.red')}
            </button>

            <button
              onClick={() => handleColorSelect('black')}
              disabled={isFlipping}
              className={`p-8 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 ${
                selectedColor === 'black'
                  ? 'bg-gray-700 shadow-lg shadow-gray-500/50 scale-105'
                  : 'bg-gradient-to-br from-gray-800 to-black hover:shadow-lg hover:shadow-gray-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-5xl mb-2">♠️</div>
              {t('games.card.black')}
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
          {isFlipping ? '🎴 Flipping...' : `🎮 ${t('actions.play')} (${betAmount} coins)`}
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
