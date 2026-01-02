# The Resource Hub - Premium Digital Store

## Overview
A high-performance storefront for premium digital assets built with React, TypeScript, and Vite. Features include product browsing, AI-powered assistant (Shree Gen), admin dashboard, wallet, referral system, and gaming features.

## Project Structure
- `/components` - Reusable UI components (layout, product, ui)
- `/features` - Feature-based modules (admin, ai, gaming, orders, premium, referral, shortlink, store, wallet)
- `/services` - API services (AI integration)
- `/types` - TypeScript type definitions
- `/utils` - Utility functions

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS (via CDN)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Generative AI

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to build for production
- Build output goes to `/dist`

## Environment Variables
- `VITE_GEMINI_API_KEY` - Google Gemini API key for AI features (optional)

## Recent Changes
- January 2, 2026: Initial Replit setup
  - Configured Vite dev server on port 5000
  - Fixed import paths for misspelled directories (refferal, primium)
  - Updated AI service to use @google/generative-ai package
  - Added TypeScript configuration
  - Configured static deployment
