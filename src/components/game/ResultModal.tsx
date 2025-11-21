import { useTranslation } from 'react-i18next';
import { Trophy, XCircle, TrendingUp, Coins } from 'lucide-react';
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div
        className={`text-center py-6 relative ${
          result.won ? 'shadow-glow-green' : 'shadow-glow-red'
        }`}
      >
        {/* Result Icon with glow effect */}
        <div className={`mb-4 animate-bounce-in ${result.won ? 'text-accent-green' : 'text-accent-red'}`}>
          {result.won ? (
            <Trophy className="w-24 h-24 mx-auto" strokeWidth={2} />
          ) : (
            <XCircle className="w-24 h-24 mx-auto" strokeWidth={2} />
          )}
        </div>

        {/* Result Title */}
        <h2
          className={`text-4xl font-bold mb-4 animate-slide-up ${
            result.won ? 'text-accent-green' : 'text-accent-red'
          }`}
        >
          {result.won ? t('result.win') : t('result.lose')}
        </h2>

        {/* Result Details */}
        <div className="space-y-3 mb-6 animate-slide-up">
          <div className="bg-app-bg rounded-lg p-4 shadow-card transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Your Prediction</p>
            <p className="text-2xl font-bold text-white">{result.prediction}</p>
          </div>

          <div className="bg-app-bg rounded-lg p-4 shadow-card transition-all duration-300">
            <p className="text-gray-400 text-sm mb-1">Actual Result</p>
            <p className="text-2xl font-bold text-accent-gold">{result.actual}</p>
          </div>

          <div className="bg-app-bg rounded-lg p-4 shadow-card transition-all duration-300">
            <div className="flex items-center justify-center gap-2">
              <Coins className={`w-8 h-8 ${result.won ? 'text-accent-green' : 'text-accent-red'}`} />
              <p className={`text-3xl font-bold ${result.won ? 'text-accent-green' : 'text-accent-red'}`}>
                {result.won ? `+${result.winAmount}` : `-${betAmount}`}
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-accent-gold" />
              <p className="text-sm text-accent-gold">
                {t('result.xpGained', { xp: result.xpGained })}
              </p>
            </div>
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
