import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DragonSkullProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
}

export function DragonSkull({ position, rotation, scale = 1 }: DragonSkullProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const eyeGlowRef = useRef<THREE.PointLight>(null!)

  useFrame((state) => {
    if (eyeGlowRef.current) {
      eyeGlowRef.current.intensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Eye glow */}
      <pointLight
        ref={eyeGlowRef}
        position={[0, 0.5, 0.8]}
        color="#ff3300"
        intensity={0.2}
        distance={3}
      />

      {/* Main skull */}
      <mesh castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#e8e0d5"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Snout */}
      <mesh position={[0, -0.1, 1.2]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 1.5]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Upper jaw */}
      <mesh position={[0, 0.1, 1.8]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.8]} />
        <meshStandardMaterial color="#d5cdc0" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Lower jaw */}
      <mesh position={[0, -0.3, 1.5]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.15, 1]} />
        <meshStandardMaterial color="#ccc4b7" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Eye sockets */}
      {[-0.3, 0.3].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.3, 0.5]} castShadow>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          {/* Glowing eyes */}
          <mesh position={[x, 0.3, 0.55]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ff3300" />
          </mesh>
        </group>
      ))}

      {/* Horns */}
      {[-0.5, 0.5].map((x) => (
        <mesh
          key={x}
          position={[x, 0.6, -0.3]}
          rotation={[0.5, x * 0.3, x * 0.2]}
          castShadow
        >
          <coneGeometry args={[0.12, 1, 8]} />
          <meshStandardMaterial color="#d5cdc0" roughness={0.8} metalness={0.1} />
        </mesh>
      ))}

      {/* Spinal ridge */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0, 0.5 - i * 0.1, -0.6 - i * 0.4]}
          rotation={[-0.3, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.08 - i * 0.01, 0.3 - i * 0.03, 4]} />
          <meshStandardMaterial color="#e0d8cb" roughness={0.85} metalness={0.1} />
        </mesh>
      ))}

      {/* Teeth - upper */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`upper-${i}`}
          position={[
            -0.2 + (i % 4) * 0.13,
            -0.05,
            1.4 + Math.floor(i / 4) * 0.3,
          ]}
          rotation={[0.1, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.03, 0.15, 4]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}

      {/* Teeth - lower */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`lower-${i}`}
          position={[
            -0.15 + (i % 3) * 0.15,
            -0.35,
            1.2 + Math.floor(i / 3) * 0.3,
          ]}
          rotation={[Math.PI + 0.1, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.025, 0.12, 4]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}

      {/* Nostril holes */}
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.1, 2.1]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}
