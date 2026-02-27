import { useMemo } from 'react'
import * as THREE from 'three'

interface ThroneRoomProps {
  houseColor: string
}

export function ThroneRoom({ houseColor }: ThroneRoomProps) {
  // Generate pillar positions
  const pillars = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 6; i++) {
      positions.push([-8, 0, -8 + i * 4])
      positions.push([8, 0, -8 + i * 4])
    }
    return positions
  }, [])

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.5}
          roughness={0.8}
        />
      </mesh>

      {/* Floor pattern - center carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 3]} receiveShadow>
        <planeGeometry args={[4, 20]} />
        <meshStandardMaterial
          color={houseColor}
          metalness={0.3}
          roughness={0.7}
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 10, -12]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-15, 10, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      <mesh position={[15, 10, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 15, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#020202" roughness={0.95} />
      </mesh>

      {/* Pillars */}
      {pillars.map((pos, i) => (
        <Pillar key={i} position={pos} />
      ))}

      {/* Banner behind throne */}
      <Banner position={[0, 8, -10]} color={houseColor} />

      {/* Side banners */}
      <Banner position={[-8, 8, -8]} color={houseColor} scale={0.7} />
      <Banner position={[8, 8, -8]} color={houseColor} scale={0.7} />

      {/* Arched windows (dark, atmospheric light) */}
      {[-6, 0, 6].map((x) => (
        <group key={x} position={[x, 10, -11.9]}>
          <mesh>
            <circleGeometry args={[1.5, 32, 0, Math.PI]} />
            <meshBasicMaterial color="#0a0a1a" />
          </mesh>
          <mesh position={[0, -1.5, 0]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial color="#0a0a1a" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Pillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Column */}
      <mesh position={[0, 7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 12, 16]} />
        <meshStandardMaterial color="#151515" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Capital */}
      <mesh position={[0, 13.5, 0]} castShadow>
        <cylinderGeometry args={[1.4, 0.8, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Banner({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      {/* Banner fabric */}
      <mesh castShadow>
        <planeGeometry args={[3, 8]} />
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Banner pole */}
      <mesh position={[0, 4.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 4, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Decorative ends */}
      {[-1.8, 1.8].map((x) => (
        <mesh key={x} position={[x, 4.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Banner point */}
      <mesh position={[0, -4.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[1.5, 1.5, 4]} />
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}
