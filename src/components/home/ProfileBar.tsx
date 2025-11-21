import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { getXPProgress } from '@/utils/levelSystem';
import { getTimeUntilNextEnergy, formatTime } from '@/utils/energySystem';

export const ProfileBar: React.FC = () => {
  const { t } = useTranslation();
  const { coins, energy, maxEnergy, xp, level, lastEnergyUpdate, updateEnergy } = useUserStore();
  const [timeUntilEnergy, setTimeUntilEnergy] = useState('');

  const xpProgress = getXPProgress(xp, level);

  useEffect(() => {
    const interval = setInterval(() => {
      updateEnergy();
      if (energy < maxEnergy) {
        const time = getTimeUntilNextEnergy(lastEnergyUpdate);
        setTimeUntilEnergy(formatTime(time));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, maxEnergy, lastEnergyUpdate, updateEnergy]);

  return (
    <div className="bg-app-card border-2 border-app-border rounded-2xl p-6 mb-6">
      {/* Top Row - Coins and Energy */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💰</span>
          <div>
            <p className="text-xs text-gray-400">Coins</p>
            <p className="text-2xl font-bold text-accent-gold">{coins.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs text-gray-400">Energy</p>
            <p className="text-2xl font-bold text-accent-green">
              {energy}/{maxEnergy}
            </p>
            {energy < maxEnergy && (
              <p className="text-xs text-gray-400">{timeUntilEnergy}</p>
            )}
          </div>
          <span className="text-3xl">⚡</span>
        </div>
      </div>

      {/* Level and XP Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-white">
            {t('profile.level', { level })}
          </p>
          <p className="text-xs text-gray-400">
            {Math.floor(xpProgress.current)}/{xpProgress.required} XP
          </p>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full bg-app-bg rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-green to-accent-gold transition-all duration-500"
            style={{ width: `${xpProgress.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
