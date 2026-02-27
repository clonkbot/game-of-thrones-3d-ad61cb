import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function IronThrone() {
  const groupRef = useRef<THREE.Group>(null!)
  const glowRef = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  // Generate sword positions for the throne
  const swords = useMemo(() => {
    const positions: Array<{
      position: [number, number, number]
      rotation: [number, number, number]
      scale: number
    }> = []

    // Back swords (fanning out)
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI - Math.PI / 2
      const radius = 1.5 + Math.random() * 0.5
      const height = 2 + Math.random() * 3
      positions.push({
        position: [Math.sin(angle) * radius, height, -1.5 - Math.random() * 0.3],
        rotation: [
          -0.3 + Math.random() * 0.2,
          angle + Math.PI,
          Math.random() * 0.3 - 0.15,
        ],
        scale: 0.8 + Math.random() * 0.4,
      })
    }

    // Side swords
    for (let side of [-1, 1]) {
      for (let i = 0; i < 15; i++) {
        const height = 0.5 + (i / 15) * 2
        positions.push({
          position: [side * (1.2 + Math.random() * 0.3), height, -0.5 + Math.random() * 0.5],
          rotation: [
            Math.random() * 0.3,
            side * (Math.PI / 4 + Math.random() * 0.3),
            side * (0.5 + Math.random() * 0.3),
          ],
          scale: 0.6 + Math.random() * 0.3,
        })
      }
    }

    // Base swords (melted together)
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2
      const radius = 0.8 + Math.random() * 0.4
      positions.push({
        position: [Math.sin(angle) * radius, 0.1, Math.cos(angle) * radius - 0.5],
        rotation: [Math.PI / 2 + Math.random() * 0.3, angle, 0],
        scale: 0.4 + Math.random() * 0.3,
      })
    }

    return positions
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 3, 0]}
        color="#ff6b35"
        intensity={0.3}
        distance={8}
      />

      {/* Throne Base */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 2.2, 0.6, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Steps */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.1 - i * 0.15, 1.5 + i * 0.8]} receiveShadow castShadow>
          <boxGeometry args={[3 + i * 0.5, 0.15, 1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}

      {/* Seat */}
      <mesh position={[0, 1.2, -0.3]} castShadow>
        <boxGeometry args={[1.4, 0.3, 1.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 2.5, -0.9]} castShadow>
        <boxGeometry args={[1.6, 2.5, 0.3]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Armrests */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.85, 1.5, -0.3]} castShadow>
          <boxGeometry args={[0.3, 0.6, 1.2]} />
          <meshStandardMaterial color="#252525" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Swords */}
      {swords.map((sword, i) => (
        <Sword
          key={i}
          position={sword.position}
          rotation={sword.rotation}
          scale={sword.scale}
        />
      ))}
    </group>
  )
}

function Sword({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Blade */}
      <mesh castShadow>
        <boxGeometry args={[0.03, 0.8, 0.01]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.5} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
