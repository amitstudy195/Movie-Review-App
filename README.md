# Movie Review App - React Version

This is a React version of the Movie Review app, converted from a vanilla JavaScript/HTML/CSS application to a modern React application using Vite.

## Features

- 🎬 Browse trending movies with a beautiful carousel
- 🔍 Search for movies by title
- 🎭 Filter movies by genre, year, and sort options
- ⭐ View movie ratings and details
- 🎥 Watch movie trailers in a modal popup
- 📱 Responsive design with Tailwind CSS

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **TMDB API** - Movie data source

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd movie-review-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5174`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Search bar and filters
│   ├── TrendingSection.tsx # Trending movies carousel
│   ├── MoviesGrid.tsx      # Movie cards grid
│   └── TrailerModal.tsx    # Trailer popup modal
├── App.tsx                 # Main application component
├── App.css                 # Custom styles and animations
├── index.css               # Global styles with Tailwind
└── main.tsx               # Application entry point
```

## API Configuration

The app uses The Movie Database (TMDB) API. The API key is configured in the `App.tsx` file:

```typescript
const API_KEY = "ba7a7ab492ae117b59a47ab641ceee73"
```

## Key Features Implemented

### State Management
- React hooks (`useState`, `useEffect`) for state management
- Centralized state in the main App component
- Props drilling for component communication

### Components
- **Header**: Handles search input and filter controls
- **TrendingSection**: Displays trending movies in a scrollable carousel
- **MoviesGrid**: Shows movie cards in a responsive grid
- **TrailerModal**: Modal for playing movie trailers

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS animations and transitions
- Glassmorphism effects and gradients
- Responsive design for mobile and desktop

### API Integration
- Fetch trending movies
- Search movies by query
- Filter by genre, year, and sort options
- Load movie trailers from YouTube

## Conversion Notes

This React version maintains all the functionality of the original vanilla JavaScript app while providing:

- Better code organization with components
- Type safety with TypeScript
- Improved maintainability
- Modern React patterns and hooks
- Better performance with React's virtual DOM

## Original Features Preserved

- ✅ Movie search functionality
- ✅ Genre, year, and sort filtering
- ✅ Trending movies carousel
- ✅ Movie trailer modal
- ✅ Responsive design
- ✅ Beautiful UI with animations
- ✅ TMDB API integration

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons and styling inspired by Netflix design
- Built with React and Vite