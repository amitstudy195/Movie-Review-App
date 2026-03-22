# 🎬 Movie Magic

Movie Magic is a premium, fully responsive React application that allows users to discover, search, and explore movies using the TMDB (The Movie Database) API. It features a modern, cinematic UI with dark mode gradients, dynamic filtering, and an IMDb-style detailed view for every movie.

## ✨ Features

*   **Cinematic UI:** A beautiful, fully responsive grid layout with hover effects, custom scrollbars, and a premium gradient aesthetic built with Tailwind CSS.
*   **Advanced Discovery & Filters:** Filter movies by Genre, Release Year, and Rating. Includes a dedicated search bar to find exactly what you are looking for.
*   **IMDb-Style Details Modal:** Clicking on any movie opens a full-screen detailed view containing:
    *   Movie Poster & Hero Backdrop Image
    *   Runtime, Release Year, and Global Rating
    *   Embedded YouTube Trailer Player
    *   Top 10 Cast Members (with profile pictures)
    *   Similar Movies Recommendations
*   **User Reviews System:** Users can leave star ratings and text reviews. (Data is persisted locally using `localStorage`).
*   **Favorites System:** Save movies to a personalized "Favorites" list with a single click. (Persisted via `localStorage`).
*   **Smart Pagination:** Seamlessly browse through thousands of movies with responsive Next/Previous page controls.

## 🛠️ Tech Stack

*   **Frontend:** React (TypeScript)
*   **Styling:** Tailwind CSS
*   **API:** TMDB (The Movie Database) API
*   **State Management:** React Hooks (`useState`, `useEffect`)
*   **Data Persistence:** Browser `localStorage`

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a free API key from [TMDB](https://www.themoviedb.org/documentation/api).

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/movie-magic.git](https://github.com/yourusername/movie-magic.git)
   cd movie-magic