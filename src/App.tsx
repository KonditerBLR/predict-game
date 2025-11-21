import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { useUserStore } from './store/userStore';
import { HomeScreen } from './components/home';
import { CardGame, DiceGame, NumberGame } from './components/game';

function App() {
  const { currentGame, setCurrentGame } = useGameStore();
  const { initUser } = useUserStore();

  useEffect(() => {
    // Initialize user data
    initUser();

    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Expand to full height
      tg.ready();
      tg.expand();

      // Set theme colors
      tg.headerColor = '#0a0e1a';
      tg.backgroundColor = '#0a0e1a';

      // Setup back button
      if (currentGame) {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          setCurrentGame(null);
          tg.BackButton.hide();
        });
      } else {
        tg.BackButton.hide();
      }
    }
  }, [initUser, currentGame, setCurrentGame]);

  // Handle back button visibility
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      if (currentGame) {
        tg.BackButton.show();
      } else {
        tg.BackButton.hide();
      }
    }
  }, [currentGame]);

  // Render current game or home screen
  const renderScreen = () => {
    switch (currentGame) {
      case 'card':
        return <CardGame />;
      case 'dice':
        return <DiceGame />;
      case 'number':
        return <NumberGame />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
