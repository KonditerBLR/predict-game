import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileBar } from './ProfileBar';
import { GameMenu } from './GameMenu';
import { AffiliateBanner } from './AffiliateBanner';
import { AdButton } from './AdButton';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-app-bg text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-accent-green via-accent-gold to-accent-red bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <p className="text-gray-400 text-lg">{t('app.subtitle')}</p>
        </div>

        {/* Profile Bar */}
        <ProfileBar />

        {/* Ad Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <AdButton type="coins" />
          <AdButton type="energy" />
        </div>

        {/* Game Menu */}
        <GameMenu />

        {/* Affiliate Banner */}
        <AffiliateBanner />

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Provably Fair Gaming • Secure & Fun</p>
        </div>
      </div>
    </div>
  );
};
