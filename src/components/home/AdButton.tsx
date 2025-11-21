import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tv, Coins, Zap, PartyPopper } from 'lucide-react';
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

  const RewardIcon = type === 'coins' ? Coins : Zap;
  const rewardAmount = type === 'coins' ? '+50' : '+1';
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
        <span className="flex items-center justify-center gap-2">
          <Tv className="w-5 h-5" />
          {isLoading ? t('ads.loading') : buttonText}
        </span>
      </Button>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center py-8">
          <div className="mb-4 animate-bounce-in flex justify-center">
            <PartyPopper className="w-16 h-16 text-accent-gold" />
          </div>
          <h3 className="text-2xl font-bold text-accent-green mb-4">
            Success!
          </h3>
          <div className="flex items-center justify-center gap-2 text-xl">
            <p className="text-white">You received</p>
            <RewardIcon className={`w-6 h-6 ${type === 'coins' ? 'text-accent-gold' : 'text-accent-green'}`} />
            <p className={`font-bold ${type === 'coins' ? 'text-accent-gold' : 'text-accent-green'}`}>
              {rewardAmount}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
