import React, { useState, useEffect } from 'react'

interface TrailerModalProps {
  movieId: number | null
  apiKey: string
  baseUrl: string
  onClose: () => void
  onSimilarMovieClick?: (id: number) => void // New prop to allow clicking similar movies
}

interface DetailedMovie {
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  runtime: number
  genres: { name: string }[]
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
    crew: { id: number; name: string; job: string }[]
  }
  similar?: {
    results: { id: number; title: string; poster_path: string | null }[]
  }
}

interface Review {
  id: string
  user: string
  rating: number
  text: string
  date: string
}

const MovieDetailsModal: React.FC<TrailerModalProps> = ({ movieId, apiKey, baseUrl, onClose, onSimilarMovieClick }) => {
  const [movie, setMovie] = useState<DetailedMovie | null>(null)
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false) // Favorites state
  
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReviewText, setNewReviewText] = useState('')
  const [newReviewRating, setNewReviewRating] = useState(5)

  const FALLBACK_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM1NTUiLz48cGF0aCBkPSJNMzAgMjgwIEMgMzAgMjAwIDE3MCAyMDAgMTcwIDI4MCIgZmlsbD0iIzU1NSIvPjwvc3ZnPg=='
  const FALLBACK_POSTER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDI4MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibwlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='

  useEffect(() => {
    if (movieId) {
      loadMovieDetails(movieId)
      loadReviews(movieId)
      checkIfFavorite(movieId)
    } else {
      setMovie(null)
      setTrailerUrl(null)
    }
  }, [movieId])

  const loadMovieDetails = async (id: number) => {
    setLoading(true)
    try {
      // Appended 'similar' to our API call!
      const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits,similar`)
      const data = await response.json()
      
      setMovie(data)

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find((vid: any) => vid.site === 'YouTube' && vid.type === 'Trailer')
                     || data.videos.results.find((vid: any) => vid.site === 'YouTube')

        if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
      }
    } catch (err) {
      console.error("Error fetching details:", err)
    } finally {
      setLoading(false)
    }
  }

  // --- Favorites Logic ---
  const checkIfFavorite = (id: number) => {
    const savedFavs = JSON.parse(localStorage.getItem('movie_favorites') || '[]')
    setIsFavorite(savedFavs.includes(id))
  }

  const toggleFavorite = () => {
    if (!movieId) return
    const savedFavs = JSON.parse(localStorage.getItem('movie_favorites') || '[]')
    
    if (isFavorite) {
      const newFavs = savedFavs.filter((favId: number) => favId !== movieId)
      localStorage.setItem('movie_favorites', JSON.stringify(newFavs))
      setIsFavorite(false)
    } else {
      savedFavs.push(movieId)
      localStorage.setItem('movie_favorites', JSON.stringify(savedFavs))
      setIsFavorite(true)
    }
  }

  // --- Reviews Logic ---
  const loadReviews = (id: number) => {
    const savedReviews = localStorage.getItem(`movie_reviews_${id}`)
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      setReviews([
        { id: '1', user: 'MovieBuff99', rating: 5, text: 'Absolutely incredible! The acting was top-notch.', date: new Date().toLocaleDateString() }
      ])
    }
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReviewText.trim()) return

    const newReview: Review = {
      id: Date.now().toString(),
      user: 'Guest User',
      rating: newReviewRating,
      text: newReviewText,
      date: new Date().toLocaleDateString()
    }

    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem(`movie_reviews_${movieId}`, JSON.stringify(updatedReviews))
    
    setNewReviewText('')
    setNewReviewRating(5)
  }

  if (!movieId) return null

  const director = movie?.credits?.crew.find(person => person.job === 'Director')

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto flex justify-center transition-all duration-300">
      <div className="relative w-full max-w-6xl min-h-screen md:min-h-0 md:my-8 bg-gray-900 md:rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-gray-800 flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-red-600 text-white rounded-full transition-all duration-300 backdrop-blur-md shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {loading || !movie ? (
          <div className="h-96 flex items-center justify-center text-white">Loading details...</div>
        ) : (
          <div className="pb-12">
            <div className="relative w-full h-[25vh] md:h-[30vh]">
              <img 
                src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                className="w-full h-full object-cover opacity-40" 
                alt="Backdrop" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>

            <div className="relative z-10 px-6 md:px-12 -mt-20 md:-mt-32">
              <div className="flex flex-col md:flex-row gap-8">
                
                <div className="w-40 sm:w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    className="w-full rounded-xl shadow-2xl border-2 border-gray-700" 
                    alt="Poster" 
                  />
                </div>

                <div className="flex-1 mt-4 md:mt-16 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{movie.title || 'Unknown Title'}</h1>
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={toggleFavorite}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${isFavorite ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30' : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700'}`}
                    >
                      <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span> 
                      {isFavorite ? 'Saved' : 'Save'}
                    </button>
                  </div>
                  
                  {director && (
                    <p className="text-gray-400 text-lg mb-4">Directed by <span className="text-white font-semibold">{director.name}</span></p>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-300 mb-6">
                    <span className="bg-purple-600/30 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">
                      {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </span>
                    {movie.runtime > 0 && (
                      <span className="bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                        {movie.runtime} min
                      </span>
                    )}
                    <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/30">
                      ⭐ {movie.vote_average?.toFixed(1) || '0.0'} / 10
                    </span>
                  </div>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 text-left">{movie.overview || 'No overview available for this movie.'}</p>

                  {/* Cast Section */}
                  {movie.credits && movie.credits.cast.length > 0 && (
                    <div className="mb-10 text-left">
                      <h3 className="text-2xl font-bold text-white mb-4">Top Cast</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {movie.credits.cast.slice(0, 10).map(actor => (
                          <div key={actor.id} className="flex-shrink-0 w-28 md:w-32 text-center group">
                            <img 
                              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : FALLBACK_AVATAR} 
                              alt={actor.name}
                              className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg mb-2 border border-gray-700 transition-transform duration-300 group-hover:scale-105"
                            />
                            <p className="text-white text-sm font-semibold leading-tight line-clamp-1">{actor.name}</p>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-1">{actor.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {trailerUrl && (
                    <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-black aspect-video mb-12">
                      <iframe src={trailerUrl} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}

                  {/* Similar Movies Section */}
                  {movie.similar && movie.similar.results.length > 0 && (
                    <div className="mb-12 text-left">
                      <h3 className="text-2xl font-bold text-white mb-4">You Might Also Like</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {movie.similar.results.slice(0, 10).map(similarMovie => (
                          <div 
                            key={similarMovie.id} 
                            className="flex-shrink-0 w-32 md:w-40 cursor-pointer group"
                            onClick={() => onSimilarMovieClick && onSimilarMovieClick(similarMovie.id)}
                          >
                            <img 
                              src={similarMovie.poster_path ? `https://image.tmdb.org/t/p/w300${similarMovie.poster_path}` : FALLBACK_POSTER} 
                              alt={similarMovie.title}
                              className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg mb-2 border border-gray-700 transition-transform duration-300 group-hover:scale-105 group-hover:border-purple-500"
                            />
                            <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">{similarMovie.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews Section */}
                  <div className="mt-12 bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700 text-left">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span>💬</span> User Reviews
                    </h2>

                    <form onSubmit={handleReviewSubmit} className="mb-10 bg-gray-900 p-6 rounded-xl border border-gray-700">
                      <div className="mb-4">
                        <label className="block text-gray-400 text-sm mb-2">Your Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              className={`text-2xl transition-transform hover:scale-125 ${newReviewRating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="What did you think of the movie?"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none h-24 mb-4"
                        required
                      ></textarea>
                      <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg">
                        Post Review
                      </button>
                    </form>

                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700/50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-white font-bold mr-2">{review.user}</span>
                              <span className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                            </div>
                            <span className="text-gray-500 text-xs">{review.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetailsModal