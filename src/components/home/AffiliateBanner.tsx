import { useTranslation } from 'react-i18next';
import { Trophy } from 'lucide-react';
import { Card, Button } from '@/components/common';

const AFFILIATE_URL = 'https://battery.casino/?ref=prediction-master';

export const AffiliateBanner: React.FC = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    // Track affiliate click (can be integrated with analytics)
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(AFFILIATE_URL);
    } else {
      window.open(AFFILIATE_URL, '_blank');
    }
  };

  return (
    <Card className="bg-gradient-to-r from-accent-gold/20 to-accent-green/20 border-accent-gold/50 mt-6">
      <div className="text-center">
        <div className="mb-3 flex justify-center">
          <div className="p-3 bg-accent-gold/20 rounded-full">
            <Trophy className="w-12 h-12 text-accent-gold" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {t('affiliate.title')}
        </h3>
        <p className="text-accent-gold font-semibold mb-4">
          {t('affiliate.bonus')}
        </p>
        <Button
          onClick={handleClick}
          variant="success"
          size="lg"
          fullWidth
        >
          {t('affiliate.cta')}
        </Button>
      </div>
    </Card>
  );
};
