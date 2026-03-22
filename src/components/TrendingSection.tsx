import React, { useRef } from 'react'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  genre_ids: number[]
  popularity: number
}

interface TrendingSectionProps {
  movies: Movie[]
  genres: {[key: number]: string}
  onMovieClick: (movieId: number) => void
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ movies, genres, onMovieClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (carouselRef.current) {
      const scrollAmount = 300
      if (direction === 'prev') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDI4MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibwlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='

  return (
    <section className="py-8 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-lg">🔥</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Trending Now
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => scrollCarousel('prev')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/25 border border-blue-400/30"
          >
            ◀️
          </button>
          <button
            onClick={() => scrollCarousel('next')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/25 border border-blue-400/30"
          >
            ▶️
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.slice(0, 20).map((movie, index) => {
          const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : FALLBACK_IMAGE

          const movieGenres = movie.genre_ids
            .slice(0, 2)
            .map(id => genres[id])
            .filter(Boolean)
            .join(', ')

          return (
            <div
              key={movie.id}
              className="flex-shrink-0 w-48 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 group"
              onClick={() => onMovieClick(movie.id)}
            >
              <div className="relative mb-3 overflow-hidden rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 group-hover:shadow-purple-400/40 group-hover:border-purple-400/50 transition-all duration-300">
                <img
                  src={posterPath}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = FALLBACK_IMAGE
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-300">
                  #{index + 1}
                </div>
                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="px-1">
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">{movie.title}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">{new Date(movie.release_date).getFullYear()}</span>
                  <span className="text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded-full font-semibold">{movieGenres}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrendingSection