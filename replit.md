# The Resource Hub

## Overview

The Resource Hub is a premium digital storefront built as a single-page React application. It provides a feature-rich e-commerce experience for digital assets with an integrated AI assistant (Shree Gen), admin dashboard, wallet system, referral program, and gaming zone. The application uses a modern dark theme with glassmorphism UI effects and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 19** with TypeScript for type safety
- **Vite 7** as the build tool and dev server (runs on port 5000)
- **Framer Motion** for animations and transitions
- **Tailwind CSS** loaded via CDN for styling
- **Lucide React** for iconography

### Application Structure
The app follows a feature-based architecture with code splitting:

- `/components` - Shared UI components organized by purpose:
  - `/layout` - Navbar, Sidebar, Footer
  - `/product` - ProductCard, ProductGrid
  - `/ui` - Reusable components (loaders, modals, search)

- `/features` - Self-contained feature modules:
  - `/admin` - Admin dashboard with sub-views (users, orders, payments, inventory)
  - `/ai` - Shree Gen AI assistant interface
  - `/gaming` - Gaming zone with user stats
  - `/orders` - Order management
  - `/primium` - Premium subscription tiers (note: intentionally misspelled folder)
  - `/refferal` - Referral system (note: intentionally misspelled folder)
  - `/shortlink` - URL shortening with rewards store
  - `/store` - Product browsing and details
  - `/wallet` - Virtual wallet management
  - `/support` - Chat support interface
  - `/api` - API documentation page

- `/services` - Backend integrations and utilities
- `/types` - TypeScript type definitions
- `/utils` - Helper functions

### State Management
- React's built-in useState and useCallback hooks
- Session-based admin authentication via sessionStorage
- Real-time data subscriptions through Firebase Firestore

### Routing
- No router library - navigation handled via state in App.tsx
- Lazy loading with React.lazy() for feature pages
- Suspense boundaries with ComponentLoader fallback

### Data Layer
- **Firebase Firestore** for database operations
- **Firebase Auth** for authentication
- Generic `dbService` provides CRUD operations with real-time subscriptions
- User profiles, orders, and transactions sync across sessions

## External Dependencies

### Firebase Services
- **Firestore** - Document database for users, orders, products, transactions
- **Authentication** - User identity management
- Project ID: `the-resource-hub-92ec9`
- Requires `VITE_FIREBASE_API_KEY` environment variable

### AI Services
- **Google Generative AI** (@google/generative-ai) - Powers Shree Gen AI assistant
- Supports multiple models: gemini-1.5-flash, gemini-2.0-flash-thinking
- Requires `VITE_GEMINI_API_KEY` environment variable
- Fallback to aggregator services (OpenRouter, Groq, Mistral, DeepSeek)

### CDN Dependencies
- Tailwind CSS loaded from cdn.tailwindcss.com
- Google Fonts (Inter) for typography

### Build Output
- Production builds output to `/dist` directory
- Static deployment configured for hosting