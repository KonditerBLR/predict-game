import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Coins, Zap, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { playNumberGame } from '@/utils/gameLogic';
import { GameResult } from '@/types';
import { Button, Card } from '@/components/common';
import { ResultModal } from './ResultModal';

export const NumberGame: React.FC = () => {
  const { t } = useTranslation();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const { coins, energy, hasEnergy, canAffordBet, consumeEnergy, processGameResult } = useUserStore();
  const { betAmount, setBetAmount, setCurrentGame } = useGameStore();

  const betAmounts = [50, 100, 200, 500];
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  // Confetti effect for wins
  const triggerConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 5,
        angle: randomInRange(55, 125),
        spread: randomInRange(60, 80),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#00ff87', '#ffd700', '#00d4ff', '#ff3366'],
      });
    }, 40);
  };

  const handleNumberSelect = (num: number) => {
    if (!isPlaying) {
      setSelectedNumber(num);
    }
  };

  const handleBack = () => {
    setCurrentGame(null);
  };

  const handlePlay = async () => {
    if (selectedNumber === null || !hasEnergy() || !canAffordBet(betAmount)) {
      return;
    }

    if (!consumeEnergy()) {
      return;
    }

    setIsPlaying(true);

    // Simulate processing delay
    setTimeout(() => {
      const gameResult = playNumberGame(selectedNumber, betAmount);
      setResult(gameResult);

      // Process result
      processGameResult(gameResult, betAmount);

      // Trigger confetti on win (big win!)
      if (gameResult.won) {
        setTimeout(() => triggerConfetti(), 300);
      }

      setTimeout(() => {
        setIsPlaying(false);
        setShowResultModal(true);
      }, 500);
    }, 1000);
  };

  const handlePlayAgain = () => {
    setShowResultModal(false);
    setSelectedNumber(null);
    setResult(null);
  };

  const canPlay = selectedNumber !== null && hasEnergy() && canAffordBet(betAmount) && !isPlaying;

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
            {t('games.number.name')}
          </h1>
          <p className="text-gray-400">{t('games.number.description')}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-accent-gold">
              <Coins className="w-4 h-4" /> {coins}
            </span>
            <span className="flex items-center gap-1 text-accent-green">
              <Zap className="w-4 h-4" /> {energy}/5
            </span>
            <span className="text-accent-red">{t('games.number.multiplier')}</span>
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

        {/* Number Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Pick a number from 1 to 10
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberSelect(num)}
                disabled={isPlaying}
                className={`aspect-square rounded-xl font-bold text-2xl transition-all transform hover:scale-110 active:scale-95 ${
                  selectedNumber === num
                    ? 'bg-accent-gold text-app-bg shadow-lg shadow-accent-gold/50 scale-110'
                    : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">10% chance to win</p>
            <p className="text-2xl font-bold text-accent-gold">
              Win: {betAmount * 10} coins! 💰
            </p>
          </div>
        </Card>

        {/* Play Button */}
        <Button
          onClick={handlePlay}
          disabled={!canPlay}
          variant="success"
          size="lg"
          fullWidth
          className="text-xl py-6"
        >
          <span className="flex items-center justify-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            {isPlaying ? 'Playing...' : `${t('actions.play')} (${betAmount} coins)`}
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
