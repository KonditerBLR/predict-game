import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import { Button, Modal } from '@/components/common';

interface AdButtonProps {
  type: 'coins' | 'energy';
}

export const AdButton: React.FC<AdButtonProps> = ({ type }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addCoinsFromAd, addEnergyFromAd } = useUserStore();

  const handleWatchAd = async () => {
    setIsLoading(true);

    // Simulate ad watching (Adsgram integration would go here)
    // For now, we'll simulate a 2-second ad
    setTimeout(() => {
      if (type === 'coins') {
        addCoinsFromAd();
      } else {
        addEnergyFromAd();
      }

      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 2000);
  };

  const reward = type === 'coins' ? '+50 💰' : '+1 ⚡';
  const buttonText = type === 'coins' ? t('ads.watchForCoins') : t('ads.watchForEnergy');

  return (
    <>
      <Button
        onClick={handleWatchAd}
        variant="secondary"
        size="md"
        fullWidth
        disabled={isLoading}
        className="border-accent-green/50 hover:border-accent-green"
      >
        {isLoading ? t('ads.loading') : `📺 ${buttonText}`}
      </Button>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
          <h3 className="text-2xl font-bold text-accent-green mb-2">
            Success!
          </h3>
          <p className="text-xl text-white">
            You received {reward}
          </p>
        </div>
      </Modal>
    </>
  );
};
