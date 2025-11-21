# 🎮 Prediction Master - Telegram Mini App

Progressive prediction game with three mini-games designed for Telegram WebApp platform.

## 🎯 Features

### 🎲 Three Mini-Games
1. **Card Color Prediction** (Red/Black) - 2x multiplier - Available from Level 1
2. **Dice Game** (Low/Middle/High) - Up to 3x multiplier - Unlocks at Level 3
3. **Number Range** (1-10 predictions) - 10x multiplier - Unlocks at Level 5

### 💎 Core Mechanics
- **Coins System**: Start with 1,000 coins
- **Energy System**: 5 max energy, -1 per game, regenerates 1 per 30 minutes
- **Level System**: Earn XP from games (+10 XP per game, +5 bonus on win)
- **Progressive Unlocking**: New games unlock at higher levels

### 💰 Monetization
- **Adsgram Integration**: Watch ads for +50 coins or +1 energy
- **Affiliate CTAs**: Battery Casino promotions with $30-40 CPA
- Strategic placement: home banner, post-win modals, low-coin warnings

### 🌍 Multi-Language Support
- English (default)
- Hindi (हिन्दी) - for Indian market
- Indonesian (Bahasa) - for Indonesian market
- Auto-detects language from Telegram user settings

### 🎨 UI/UX
- Dark theme with vibrant accents
- Smooth animations (card flip, confetti)
- Mobile-first responsive design
- Modern gambling aesthetic

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Telegram Integration**: @telegram-apps/sdk-react
- **Database**: Firebase Firestore (optional)
- **i18n**: react-i18next
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration (Optional)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Vercel Configuration

The project includes `vercel.json` with optimized settings:
- Single Page Application routing
- Security headers
- Automatic builds

## 🤖 Telegram Bot Setup

1. Create a new bot with [@BotFather](https://t.me/BotFather)
2. Set up Mini App:
   ```
   /newapp
   Select your bot
   Enter app name: Prediction Master
   Enter app description: Test your prediction skills!
   Upload icon (512x512 PNG)
   Enter Web App URL: https://your-vercel-url.vercel.app
   ```

3. Configure bot menu button:
   ```
   /setmenubutton
   Select your bot
   Enter button text: Play Game 🎮
   Enter Web App URL: https://your-vercel-url.vercel.app
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── game/           # Game components
│   ├── home/           # Home screen components
│   └── common/         # Reusable UI components
├── store/              # Zustand state management
├── utils/              # Utility functions
├── i18n/               # Internationalization
├── types/              # TypeScript definitions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎮 Game Mechanics

### Card Color Game
- **Odds**: 50/50 (Red or Black)
- **Multiplier**: 2x
- **Min Bet**: 10 coins
- **Unlocks**: Level 1 (start)

### Dice Game
- **Low (1-2)**: 33% chance, 3x multiplier
- **Middle (3-4)**: 50% chance, 2x multiplier
- **High (5-6)**: 33% chance, 3x multiplier
- **Min Bet**: 20 coins
- **Unlocks**: Level 3

### Number Range Game
- **Odds**: 10% (guess 1 out of 10)
- **Multiplier**: 10x
- **Min Bet**: 50 coins
- **Unlocks**: Level 5

## 🔒 Security Features

- **Provably Fair RNG**: Uses `crypto.getRandomValues` for secure randomness
- **Anti-Cheat**: Cryptographically secure random generation
- **Client-Side**: All game logic runs securely in the browser
- **Offline-First**: LocalStorage fallback with Zustand persist

## 🎨 Color Scheme

- Background: `#0a0e1a`
- Accent Green: `#00ff87` (wins, positive)
- Accent Red: `#ff3366` (losses, danger)
- Accent Gold: `#ffd700` (rewards, special)

## 📈 Monetization Strategy

### Ad Placement
- Home screen (ad buttons)
- Post-win modal
- Low coins warning
- Level-up modal

### Affiliate Integration
- Battery Casino banner on home
- Post-game promotional modals
- $30-40 CPA tracking

## 📄 License

MIT License

---

Built with ❤️ for the Telegram Mini Apps platform
