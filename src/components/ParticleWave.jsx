import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

const MINT = new THREE.Color('#c5efe3')
const INK = new THREE.Color('#0A0A0A')

function Waves({ size = 70, spacing = 0.55 }) {
  const meshRef = useRef()
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  const grid = useMemo(() => {
    const arr = []
    const half = (size - 1) / 2
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr.push([(i - half) * spacing, (j - half) * spacing])
      }
    }
    return arr
  }, [size, spacing])

  // Assign mint or ink to each instance once, in a checker-ish pattern with some noise.
  useEffect(() => {
    if (!meshRef.current) return
    grid.forEach(([x, z], idx) => {
      const checker = ((Math.floor(x + 100) + Math.floor(z + 100)) % 2 + Math.sin(x * 1.3 + z * 0.7) * 0.5) > 0.3
      tempColor.copy(checker ? MINT : INK)
      meshRef.current.setColorAt(idx, tempColor)
    })
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [grid, tempColor])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!meshRef.current) return

    for (let idx = 0; idx < grid.length; idx++) {
      const [x, z] = grid[idx]
      const y =
        Math.sin(x * 0.35 + t * 0.9) * 0.9 +
        Math.cos(z * 0.3 + t * 0.7) * 0.7 +
        Math.sin((x + z) * 0.2 + t * 0.5) * 0.4
      tempObject.position.set(x, y, z)
      const s = 0.55 + Math.sin(t * 1.4 + x * 0.4 + z * 0.4) * 0.25
      tempObject.scale.setScalar(s)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(idx, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, grid.length]}>
      <sphereGeometry args={[0.055, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.85} toneMapped={false} />
    </instancedMesh>
  )
}

function CameraSway() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.12) * 1.5
    state.camera.position.z = 16 + Math.cos(t * 0.1) * 1
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function ParticleWave() {
  return (
    <Canvas
      camera={{ position: [0, 6, 16], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.25]}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <CameraSway />
      <Waves />
    </Canvas>
  )
}
