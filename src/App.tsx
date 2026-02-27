import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls, Environment, Stars, Float, Text3D, Center } from '@react-three/drei'
import { IronThrone } from './components/IronThrone'
import { ThroneRoom } from './components/ThroneRoom'
import { DragonSkull } from './components/DragonSkull'
import { Torches } from './components/Torches'
import { HouseSelector } from './components/HouseSelector'
import { LoadingScreen } from './components/LoadingScreen'

export type House = 'stark' | 'targaryen' | 'lannister' | 'baratheon'

const houseColors: Record<House, { primary: string; secondary: string; hex: string }> = {
  stark: { primary: '#94a3b8', secondary: '#1e293b', hex: '#94a3b8' },
  targaryen: { primary: '#dc2626', secondary: '#1c1917', hex: '#dc2626' },
  lannister: { primary: '#eab308', secondary: '#78350f', hex: '#eab308' },
  baratheon: { primary: '#f59e0b', secondary: '#1c1917', hex: '#f59e0b' },
}

const houseMottos: Record<House, string> = {
  stark: 'Winter Is Coming',
  targaryen: 'Fire and Blood',
  lannister: 'Hear Me Roar',
  baratheon: 'Ours Is The Fury',
}

function App() {
  const [selectedHouse, setSelectedHouse] = useState<House>('targaryen')
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Atmospheric overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.9)',
        }}
      />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 3, 12], fov: 50 }}
        onCreated={() => setTimeout(() => setIsLoading(false), 1500)}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#0a0a0a', 5, 35]} />

          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight
            position={[0, 8, 0]}
            intensity={0.5}
            color={houseColors[selectedHouse].hex}
            castShadow
          />
          <spotLight
            position={[0, 15, 5]}
            angle={0.3}
            penumbra={0.8}
            intensity={1}
            color="#ff6b35"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Scene */}
          <ThroneRoom houseColor={houseColors[selectedHouse].primary} />
          <IronThrone />
          <DragonSkull position={[-6, 0, -2]} rotation={[0, 0.5, 0]} scale={1.2} />
          <DragonSkull position={[6, 0, -2]} rotation={[0, -0.5, 0]} scale={1} />
          <Torches />

          {/* Floating House Text */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Center position={[0, 6, -5]}>
              <Text3D
                font="/fonts/helvetiker_bold.typeface.json"
                size={0.6}
                height={0.1}
                curveSegments={12}
              >
                {houseMottos[selectedHouse]}
                <meshStandardMaterial
                  color={houseColors[selectedHouse].hex}
                  metalness={0.8}
                  roughness={0.2}
                  emissive={houseColors[selectedHouse].hex}
                  emissiveIntensity={0.3}
                />
              </Text3D>
            </Center>
          </Float>

          {/* Atmosphere */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />

          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 2, 0]}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        {/* Title */}
        <div className="flex flex-col items-center pt-6 md:pt-10">
          <h1
            className="font-display text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] md:tracking-[0.5em] uppercase"
            style={{
              color: houseColors[selectedHouse].hex,
              textShadow: `0 0 40px ${houseColors[selectedHouse].hex}40, 0 0 80px ${houseColors[selectedHouse].hex}20`,
              fontFamily: "'Cinzel Decorative', serif",
            }}
          >
            Game of Thrones
          </h1>
          <div
            className="w-32 md:w-48 h-px mt-3 md:mt-4"
            style={{
              background: `linear-gradient(90deg, transparent, ${houseColors[selectedHouse].hex}, transparent)`,
            }}
          />
          <p
            className="mt-2 md:mt-3 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60"
            style={{
              color: houseColors[selectedHouse].hex,
              fontFamily: "'Cinzel', serif",
            }}
          >
            The Iron Throne Awaits
          </p>
        </div>
      </div>

      {/* House Selector */}
      <HouseSelector
        selectedHouse={selectedHouse}
        onSelectHouse={setSelectedHouse}
        houseColors={houseColors}
      />

      {/* Instructions */}
      <div className="absolute bottom-20 md:bottom-16 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <p
          className="text-[10px] md:text-xs tracking-widest uppercase opacity-40 text-center px-4"
          style={{
            color: '#a0a0a0',
            fontFamily: "'Cinzel', serif",
          }}
        >
          Drag to rotate • Scroll to zoom • Select your house
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <p
          className="text-[10px] md:text-xs tracking-wider opacity-30 text-center"
          style={{
            color: '#666',
            fontFamily: "'Cinzel', serif",
          }}
        >
          Requested by @trustnoneisakey · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App
