import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { isGameUnlocked } from '@/utils/levelSystem';
import { GameType } from '@/types';
import { Card } from '@/components/common';

export const GameMenu: React.FC = () => {
  const { t } = useTranslation();
  const { level } = useUserStore();
  const { gameConfigs, setCurrentGame } = useGameStore();

  const handleGameSelect = (gameId: GameType, unlockLevel: number) => {
    if (isGameUnlocked(unlockLevel, level)) {
      setCurrentGame(gameId);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        🎮 {t('actions.play')}
      </h2>

      <div className="grid gap-4">
        {gameConfigs.map((game) => {
          const unlocked = isGameUnlocked(game.unlockLevel, level);

          return (
            <Card
              key={game.id}
              onClick={() => handleGameSelect(game.id, game.unlockLevel)}
              className={`relative overflow-hidden ${
                unlocked
                  ? 'cursor-pointer hover:border-accent-green hover:scale-102 transition-all'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Locked Overlay */}
              {!unlocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <p className="text-sm font-semibold text-white">
                      {t('status.locked')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Level {game.unlockLevel}
                    </p>
                  </div>
                </div>
              )}

              {/* Game Card Content */}
              <div className="flex items-center gap-4">
                <div className="text-6xl">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {game.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full font-semibold">
                      {game.multiplier}x
                    </span>
                    <span className="text-gray-400">
                      Min bet: {game.minBet} 💰
                    </span>
                  </div>
                </div>
                <div className="text-accent-green text-2xl">
                  {unlocked ? '▶' : ''}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
