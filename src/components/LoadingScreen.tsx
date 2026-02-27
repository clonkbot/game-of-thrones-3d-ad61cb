import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setFadeOut(true), 200)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated border frame */}
      <div className="absolute inset-4 md:inset-8 border border-amber-900/30 pointer-events-none">
        <div
          className="absolute top-0 left-0 h-px bg-gradient-to-r from-amber-600 to-transparent"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
        />
        <div
          className="absolute bottom-0 right-0 h-px bg-gradient-to-l from-amber-600 to-transparent"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
        />
        <div
          className="absolute top-0 left-0 w-px bg-gradient-to-b from-amber-600 to-transparent"
          style={{ height: `${progress}%`, transition: 'height 0.3s ease-out' }}
        />
        <div
          className="absolute bottom-0 right-0 w-px bg-gradient-to-t from-amber-600 to-transparent"
          style={{ height: `${progress}%`, transition: 'height 0.3s ease-out' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-4">
        {/* Dragon sigil */}
        <div className="text-5xl md:text-7xl mb-6 md:mb-8 animate-pulse">🐉</div>

        {/* Title */}
        <h1
          className="text-2xl md:text-4xl tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8 text-center"
          style={{
            color: '#c9a227',
            fontFamily: "'Cinzel Decorative', serif",
            textShadow: '0 0 40px rgba(201, 162, 39, 0.3)',
          }}
        >
          Game of Thrones
        </h1>

        {/* Loading bar */}
        <div className="w-48 md:w-64 h-px bg-amber-900/30 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-700 to-amber-500"
            style={{
              width: `${Math.min(progress, 100)}%`,
              transition: 'width 0.3s ease-out',
              boxShadow: '0 0 10px rgba(201, 162, 39, 0.5)',
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="mt-4 md:mt-6 text-xs tracking-[0.3em] uppercase"
          style={{
            color: '#666',
            fontFamily: "'Cinzel', serif",
          }}
        >
          {progress < 100 ? 'Forging the throne...' : 'Enter'}
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 md:top-10 left-6 md:left-10 w-6 md:w-8 h-6 md:h-8 border-t border-l border-amber-700/50" />
      <div className="absolute top-6 md:top-10 right-6 md:right-10 w-6 md:w-8 h-6 md:h-8 border-t border-r border-amber-700/50" />
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 w-6 md:w-8 h-6 md:h-8 border-b border-l border-amber-700/50" />
      <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 w-6 md:w-8 h-6 md:h-8 border-b border-r border-amber-700/50" />
    </div>
  )
}
