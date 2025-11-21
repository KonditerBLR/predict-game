import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Coins, Zap, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const { betAmount, setBetAmount, setCurrentGame } = useGameStore();

  const betAmounts = [10, 25, 50, 100, 250];

  // Confetti effect for wins
  const triggerConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#00ff87', '#ffd700', '#00d4ff', '#ff3366'],
      });
    }, 50);
  };

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

      // Trigger confetti on win
      if (gameResult.won) {
        setTimeout(() => triggerConfetti(), 300);
      }

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

  const handleBack = () => {
    setCurrentGame(null);
  };

  const canPlay = selectedColor && hasEnergy() && canAffordBet(betAmount) && !isFlipping;

  return (
    <div className="min-h-screen bg-app-bg text-white p-6 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back</span>
      </button>

      <div className="max-w-2xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-green to-accent-gold bg-clip-text text-transparent">
            {t('games.card.name')}
          </h1>
          <p className="text-gray-400">{t('games.card.description')}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-accent-gold">
              <Coins className="w-4 h-4" /> {coins}
            </span>
            <span className="flex items-center gap-1 text-accent-green">
              <Zap className="w-4 h-4" /> {energy}/5
            </span>
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
                className={`py-2 px-3 rounded-lg font-semibold transition-all duration-300 ${
                  betAmount === amount
                    ? 'bg-gradient-green text-app-bg shadow-button scale-105'
                    : 'bg-app-bg text-white hover:bg-app-border hover:scale-105'
                } disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {amount}
              </button>
            ))}
          </div>
        </Card>

        {/* 3D Playing Card Display */}
        <div className="mb-8 flex justify-center" style={{ perspective: '1000px' }}>
          <div
            className={`relative w-48 h-72 transition-all duration-600 ${
              isFlipping ? 'animate-flip-3d' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Back (default state) */}
            {!revealedColor && (
              <div className="absolute inset-0 bg-gradient-card-back rounded-xl shadow-playing-card flex items-center justify-center border-4 border-white/20">
                <div className="text-white text-4xl font-bold">?</div>
              </div>
            )}

            {/* Card Front (revealed) */}
            {revealedColor && (
              <div
                className={`absolute inset-0 bg-white rounded-xl shadow-playing-card flex items-center justify-center border-4 ${
                  revealedColor === 'red'
                    ? 'border-red-400'
                    : 'border-gray-600'
                }`}
              >
                <div className={`text-9xl ${revealedColor === 'red' ? 'text-red-600' : 'text-gray-800'}`}>
                  {revealedColor === 'red' ? '♥' : '♠'}
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
              className={`p-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-card hover:shadow-card-hover ${
                selectedColor === 'red'
                  ? 'bg-gradient-red shadow-red-button-hover scale-105'
                  : 'bg-gradient-to-br from-red-600 to-red-800'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              <div className="text-5xl mb-2">♥</div>
              {t('games.card.red')}
            </button>

            <button
              onClick={() => handleColorSelect('black')}
              disabled={isFlipping}
              className={`p-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-card hover:shadow-card-hover ${
                selectedColor === 'black'
                  ? 'bg-gray-700 shadow-card-hover scale-105'
                  : 'bg-gradient-to-br from-gray-800 to-black'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              <div className="text-5xl mb-2">♠</div>
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
          <span className="flex items-center justify-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            {isFlipping ? 'Flipping...' : `${t('actions.play')} (${betAmount} coins)`}
          </span>
        </Button>

        {/* Status Messages */}
        {!hasEnergy() && (
          <p className="text-center text-accent-red mt-4 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> {t('status.notEnoughEnergy')}
          </p>
        )}
        {!canAffordBet(betAmount) && hasEnergy() && (
          <p className="text-center text-accent-red mt-4 flex items-center justify-center gap-2">
            <Coins className="w-4 h-4" /> {t('status.notEnoughCoins')}
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
