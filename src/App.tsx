import { useState, useEffect } from 'react'
import Header from './components/Header'
import TrendingSection from './components/TrendingSection'
import MoviesGrid from './components/MoviesGrid'
import MovieDetailsModal from './components/MovieDetailsModal'
import FilterBar from './components/FilterBar'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  overview: string
  genre_ids: number[]
  popularity: number
}

function App() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<{[key: number]: string}>({})
  const [trailerMovieId, setTrailerMovieId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Filters and Search State
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedRating, setSelectedRating] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // --- New Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const API_KEY = "ba7a7ab492ae117b59a47ab641ceee73"
  const BASE_URL = "https://api.themoviedb.org/3"

  useEffect(() => {
    const initializeApp = async () => {
      await loadGenres()
      await loadTrendingMovies()
    }
    initializeApp()
  }, [])

  // Reset to page 1 whenever a filter or search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedGenre, selectedYear, selectedRating, searchQuery])

  // Refetch movies when filters, search, OR page changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadMovies()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [selectedGenre, selectedYear, selectedRating, searchQuery, currentPage])

  const loadGenres = async () => {
    try {
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      const data = await response.json()
      const genresMap = data.genres.reduce((acc: {[key: number]: string}, genre: {id: number, name: string}) => {
        acc[genre.id] = genre.name
        return acc
      }, {})
      setGenres(genresMap)
    } catch (error) {
      console.error("Error loading genres", error)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      const data = await response.json()
      setTrendingMovies(data.results.slice(0, 20))
    } catch (error) {
      console.error("Error loading trending movies:", error)
    }
  }

  const loadMovies = async () => {
    setLoading(true)
    try {
      let url = ''

      // Use the currentPage state in the API URL
      if (searchQuery.trim() !== '') {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
      } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}`
        if (selectedGenre) url += `&with_genres=${selectedGenre}`
        if (selectedYear) url += `&primary_release_year=${selectedYear}`
        if (selectedRating) url += `&vote_average.gte=${selectedRating}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results || [])
      
      // TMDB caps pagination at 500 pages max to prevent server overload
      setTotalPages(Math.min(data.total_pages || 1, 500)) 
    } catch (error) {
      console.error("Error loading movies", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearAll = () => {
    setSelectedGenre('')
    setSelectedYear('')
    setSelectedRating('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const openTrailer = (movieId: number) => setTrailerMovieId(movieId)
  const closeTrailer = () => setTrailerMovieId(null)

  let gridTitle = "Discover Movies"
  if (searchQuery) {
    gridTitle = `Search Results for "${searchQuery}"`
  } else if (selectedGenre || selectedYear || selectedRating) {
    gridTitle = "Filtered Movies"
  }

  return (
   

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Header no longer needs the onClearAll prop */}
      <Header />
      
      {!searchQuery && (
        <TrendingSection
          movies={trendingMovies}
          genres={genres}
          onMovieClick={openTrailer}
        />
      )}
      
      <FilterBar 
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        // --- Pass the clear function here instead ---
        onClearAll={handleClearAll}
      />


      <MoviesGrid
      title={gridTitle}
        movies={movies}
        genres={genres}
        loading={loading}
        onMovieClick={openTrailer}
        // --- Pass pagination props ---
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <MovieDetailsModal
        movieId={trailerMovieId}
        apiKey={API_KEY}
        baseUrl={BASE_URL}
        onClose={closeTrailer}
        onSimilarMovieClick={openTrailer} 
      />
    </div>
  )
}

export default App