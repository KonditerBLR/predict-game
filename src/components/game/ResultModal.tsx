import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from '@/components/common';
import { GameResult } from '@/types';
import { useGameStore } from '@/store/gameStore';

interface ResultModalProps {
  isOpen: boolean;
  result: GameResult;
  onClose: () => void;
  betAmount: number;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  result,
  onClose,
  betAmount,
}) => {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && result.won) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen, result.won]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="text-center py-6">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              >
                {['🎉', '✨', '💰', '🎊', '⭐'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        {/* Result Icon */}
        <div className="text-8xl mb-4 animate-bounce-in">
          {result.won ? '🎉' : '😔'}
        </div>

        {/* Result Title */}
        <h2
          className={`text-4xl font-bold mb-4 ${
            result.won ? 'text-accent-green' : 'text-accent-red'
          }`}
        >
          {result.won ? t('result.win') : t('result.lose')}
        </h2>

        {/* Result Details */}
        <div className="space-y-3 mb-6">
          <div className="bg-app-bg rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Your Prediction</p>
            <p className="text-2xl font-bold text-white">{result.prediction}</p>
          </div>

          <div className="bg-app-bg rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Actual Result</p>
            <p className="text-2xl font-bold text-accent-gold">{result.actual}</p>
          </div>

          <div className="bg-app-bg rounded-lg p-4">
            <p className={`text-3xl font-bold ${result.won ? 'text-accent-green' : 'text-accent-red'}`}>
              {result.won ? `+${result.winAmount}` : `-${betAmount}`} 💰
            </p>
            <p className="text-sm text-accent-gold mt-1">
              {t('result.xpGained', { xp: result.xpGained })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onClose} variant="primary" size="lg" fullWidth>
            {t('actions.playAgain')}
          </Button>
          <Button
            onClick={() => {
              onClose();
              useGameStore.getState().setCurrentGame(null);
            }}
            variant="secondary"
            size="md"
            fullWidth
          >
            {t('actions.backToHome')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
