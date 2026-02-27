import { useState } from 'react'
import type { House } from '../App'

interface HouseSelectorProps {
  selectedHouse: House
  onSelectHouse: (house: House) => void
  houseColors: Record<House, { primary: string; secondary: string; hex: string }>
}

const houseData: Record<House, { name: string; sigil: string; words: string }> = {
  stark: {
    name: 'Stark',
    sigil: '🐺',
    words: 'Winter Is Coming',
  },
  targaryen: {
    name: 'Targaryen',
    sigil: '🐉',
    words: 'Fire and Blood',
  },
  lannister: {
    name: 'Lannister',
    sigil: '🦁',
    words: 'Hear Me Roar',
  },
  baratheon: {
    name: 'Baratheon',
    sigil: '🦌',
    words: 'Ours Is The Fury',
  },
}

export function HouseSelector({
  selectedHouse,
  onSelectHouse,
  houseColors,
}: HouseSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const houses: House[] = ['stark', 'targaryen', 'lannister', 'baratheon']

  return (
    <div className="absolute left-4 md:left-8 bottom-24 md:bottom-24 z-30">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden mb-3 px-4 py-2 rounded-sm backdrop-blur-sm transition-all duration-300"
        style={{
          background: `${houseColors[selectedHouse].hex}20`,
          border: `1px solid ${houseColors[selectedHouse].hex}40`,
          color: houseColors[selectedHouse].hex,
          fontFamily: "'Cinzel', serif",
        }}
      >
        <span className="text-lg mr-2">{houseData[selectedHouse].sigil}</span>
        <span className="text-xs tracking-widest uppercase">
          House {houseData[selectedHouse].name}
        </span>
      </button>

      {/* House buttons */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto'
        }`}
      >
        {houses.map((house) => {
          const isSelected = selectedHouse === house
          const data = houseData[house]
          const colors = houseColors[house]

          return (
            <button
              key={house}
              onClick={() => {
                onSelectHouse(house)
                setIsExpanded(false)
              }}
              className="group relative flex items-center gap-3 px-4 py-3 rounded-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 min-w-[180px]"
              style={{
                background: isSelected
                  ? `${colors.hex}30`
                  : 'rgba(10, 10, 10, 0.7)',
                border: `1px solid ${isSelected ? colors.hex : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isSelected
                  ? `0 0 20px ${colors.hex}30, inset 0 0 20px ${colors.hex}10`
                  : 'none',
              }}
            >
              {/* Sigil */}
              <span
                className="text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  filter: isSelected ? 'none' : 'grayscale(0.5)',
                }}
              >
                {data.sigil}
              </span>

              {/* House info */}
              <div className="flex flex-col items-start">
                <span
                  className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{
                    color: isSelected ? colors.hex : '#666',
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  House {data.name}
                </span>
                <span
                  className="text-[10px] tracking-wider opacity-50 transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    color: isSelected ? colors.hex : '#444',
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {data.words}
                </span>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{
                    background: colors.hex,
                    boxShadow: `0 0 10px ${colors.hex}`,
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
