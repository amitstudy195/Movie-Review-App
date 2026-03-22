import React from 'react'

interface FilterBarProps {
  genres: { [key: number]: string }
  selectedGenre: string
  setSelectedGenre: (val: string) => void
  selectedYear: string
  setSelectedYear: (val: string) => void
  selectedRating: string
  setSelectedRating: (val: string) => void
  searchQuery: string
  setSearchQuery: (val: string) => void
  onClearAll: () => void // <-- Added the new prop here
}

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
  searchQuery,
  setSearchQuery,
  onClearAll
}) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i)

  // Check if any filter or search is active to enable/disable the button
  const hasActiveFilters = !!(searchQuery || selectedGenre || selectedYear || selectedRating)

  return (
    <div className="px-6 py-4 bg-gradient-to-b from-black to-gray-900 flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-gray-800">
      
      {/* Left Side: Search Bar */}
      <div className="w-full lg:w-auto flex-1 min-w-[250px] max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-purple-500/30 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-2.5 outline-none transition-all shadow-lg shadow-purple-500/10 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right Side: Filters & Clear Button */}
      <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 flex-1 w-full lg:w-auto">
        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          disabled={!!searchQuery}
          className="bg-gray-800 border border-purple-500/30 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 outline-none disabled:opacity-50"
        >
          <option value="">All Genres</option>
          {Object.entries(genres).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={!!searchQuery}
          className="bg-gray-800 border border-purple-500/30 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 outline-none disabled:opacity-50"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        {/* Rating Filter */}
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          disabled={!!searchQuery}
          className="bg-gray-800 border border-purple-500/30 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 outline-none disabled:opacity-50"
        >
          <option value="">Any Rating</option>
          <option value="8">8+ ⭐</option>
          <option value="7">7+ ⭐</option>
          <option value="6">6+ ⭐</option>
          <option value="5">5+ ⭐</option>
        </select>

        {/* New Clear All Button Location */}
        <button
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className="ml-0 sm:ml-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}

export default FilterBar