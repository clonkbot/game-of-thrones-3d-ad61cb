import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Torches() {
  const positions: Array<[number, number, number]> = [
    [-4, 3, -8],
    [4, 3, -8],
    [-8, 3, -4],
    [8, 3, -4],
    [-8, 3, 4],
    [8, 3, 4],
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <Torch key={i} position={pos} delay={i * 0.3} />
      ))}
    </>
  )
}

function Torch({
  position,
  delay,
}: {
  position: [number, number, number]
  delay: number
}) {
  const lightRef = useRef<THREE.PointLight>(null!)
  const flameRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(t * 8) * 0.3 + Math.sin(t * 12) * 0.2
    }
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(t * 10) * 0.2
      flameRef.current.scale.x = 1 + Math.sin(t * 8 + 1) * 0.15
    }
  })

  return (
    <group position={position}>
      {/* Torch bracket */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Torch head */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.8, 0]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.9} />
      </mesh>

      {/* Inner flame */}
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshBasicMaterial color="#ffdd00" />
      </mesh>

      {/* Point light */}
      <pointLight
        ref={lightRef}
        position={[0, 0.8, 0]}
        color="#ff6b35"
        intensity={1.5}
        distance={8}
        decay={2}
        castShadow
        shadow-mapSize={[256, 256]}
      />
    </group>
  )
}

// Particle system for embers
export function Embers() {
  const count = 50
  const mesh = useRef<THREE.InstancedMesh>(null!)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = Math.random() * 10
      const z = (Math.random() - 0.5) * 20 - 5
      const speed = 0.5 + Math.random() * 1
      temp.push({ x, y, z, speed, offset: Math.random() * Math.PI * 2 })
    }
    return temp
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    particles.forEach((particle, i) => {
      const y = (particle.y + time * particle.speed) % 15
      const x = particle.x + Math.sin(time + particle.offset) * 0.3
      const matrix = new THREE.Matrix4()
      matrix.setPosition(x, y, particle.z)
      matrix.scale(new THREE.Vector3(0.02, 0.02, 0.02))
      mesh.current.setMatrixAt(i, matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ff6b35" transparent opacity={0.6} />
    </instancedMesh>
  )
}
