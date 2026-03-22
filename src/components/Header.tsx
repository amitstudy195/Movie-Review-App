import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-6 px-4 sm:px-8 shadow-lg shadow-purple-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-6 w-full">
        
        {/* Left Horizontal Line */}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-400/80 rounded-full"></div>
        
        {/* Centered Logo and Title */}
        <div className="flex items-center gap-3 px-2 sm:px-4 group cursor-default">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <span className="text-2xl sm:text-3xl">🎬</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent uppercase drop-shadow-sm">
            Movie Magic Review
          </h1>
        </div>

        {/* Right Horizontal Line */}
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-500/30 to-purple-400/80 rounded-full"></div>
        
      </div>
    </header>
  )
}

export default Header