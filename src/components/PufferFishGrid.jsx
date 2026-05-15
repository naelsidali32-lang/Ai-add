import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}toon_puffer_fish.glb`
useGLTF.preload(MODEL_URL)

// Virtual depth of the cursor in world units. SMALL = each fish reacts very
// individually: a fish right under the cursor stays facing forward, far fish
// saturate toward ±90°. Larger values flatten the response across the grid.
const LOOK_DEPTH = 3.5
const LERP_RATE = 24

function GridPuffer({ position, mouseRef, prepared, cameraZ }) {
  const groupRef = useRef()
  const clone = useMemo(() => prepared.clone(true), [prepared])
  const rotY = useRef(0)
  const rotX = useRef(0)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const aspect = state.size.width / state.size.height
    const fovRad = (state.camera.fov * Math.PI) / 180
    const halfH = Math.tan(fovRad / 2) * cameraZ
    const halfW = halfH * aspect
    const targetX = mouseRef.current.x * halfW
    const targetY = mouseRef.current.y * halfH

    const dx = targetX - position[0]
    const dy = targetY - position[1]
    const dz = LOOK_DEPTH

    const targetRotY = Math.atan2(dx, dz)
    const targetRotX = -Math.atan2(dy, Math.sqrt(dx * dx + dz * dz))

    const k = 1 - Math.exp(-delta * LERP_RATE)
    rotY.current += (targetRotY - rotY.current) * k
    rotX.current += (targetRotX - rotX.current) * k

    groupRef.current.rotation.y = rotY.current
    groupRef.current.rotation.x = rotX.current
  })

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clone} />
    </group>
  )
}

function GridScene({ cols, rows, spacingX, spacingY, scale, holeCols, holeRows, mouseRef, cameraZ }) {
  const { scene } = useGLTF(MODEL_URL)

  const prepared = useMemo(() => {
    const cloned = scene.clone(true)
    const isCross = (name = '') => /EYE-black/i.test(name)

    const toBasic = (m, isCrossMat) => {
      const sourceMap = m.map || m.emissiveMap || null
      let baseColor
      if (isCrossMat) {
        baseColor = new THREE.Color(0x000000)
      } else if (sourceMap) {
        baseColor = new THREE.Color(0xffffff)
      } else if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.05) {
        baseColor = m.emissive.clone()
      } else if (m.color) {
        const c = m.color.clone()
        const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b
        if (lum < 0.05) c.setRGB(1, 1, 1)
        baseColor = c
      } else {
        baseColor = new THREE.Color(0xffffff)
      }

      return new THREE.MeshBasicMaterial({
        color: baseColor,
        map: isCrossMat ? null : sourceMap,
        transparent: !!m.transparent,
        opacity: m.opacity ?? 1,
        alphaMap: m.alphaMap || null,
        side: m.side ?? THREE.FrontSide,
        toneMapped: false,
        fog: false,
      })
    }

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        const cross = isCross(child.name) || mats.some((m) => isCross(m.name))
        const replaced = mats.map((m) => toBasic(m, cross))
        child.material = Array.isArray(child.material) ? replaced : replaced[0]
      }
    })

    // Wrap so we can center + scale via the wrapper without mutating per-frame
    const wrapper = new THREE.Group()
    wrapper.add(cloned)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const normScale = scale / maxDim
    cloned.position.set(-center.x, -center.y, -center.z)
    wrapper.scale.setScalar(normScale)
    return wrapper
  }, [scene, scale])

  const positions = useMemo(() => {
    const arr = []
    const cx = (cols - 1) / 2
    const cy = (rows - 1) / 2
    const hCols = Math.max(0, holeCols)
    const hRows = Math.max(0, holeRows)
    const colHalf = (hCols - 1) / 2
    const rowHalf = (hRows - 1) / 2

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const inHoleC = Math.abs(c - cx) <= colHalf
        const inHoleR = Math.abs(r - cy) <= rowHalf
        if (hCols > 0 && hRows > 0 && inHoleC && inHoleR) continue
        const x = (c - cx) * spacingX
        const y = -(r - cy) * spacingY
        arr.push([x, y, 0])
      }
    }
    return arr
  }, [cols, rows, spacingX, spacingY, holeCols, holeRows])

  return (
    <>
      {positions.map((pos, i) => (
        <GridPuffer key={i} position={pos} mouseRef={mouseRef} prepared={prepared} cameraZ={cameraZ} />
      ))}
    </>
  )
}

export default function PufferFishGrid({
  cols = 13,
  rows = 7,
  spacingX = 1.55,
  spacingY = 1.55,
  scale = 1.0,
  holeCols = 1,
  holeRows = 1,
  cameraZ = 22,
  fov = 45,
}) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) onMove(e.touches[0])
    }, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, cameraZ], fov }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={2.6} color="#FFFFFF" />
      <hemisphereLight skyColor="#FFF5D0" groundColor="#FFB347" intensity={1.6} />
      <directionalLight position={[3, 5, 4]} intensity={3.2} color="#FFFFFF" />
      <directionalLight position={[-3, 2, -2]} intensity={1.8} color="#FFE6A8" />

      <Suspense fallback={null}>
        <GridScene
          cols={cols}
          rows={rows}
          spacingX={spacingX}
          spacingY={spacingY}
          scale={scale}
          holeCols={holeCols}
          holeRows={holeRows}
          mouseRef={mouseRef}
          cameraZ={cameraZ}
        />
      </Suspense>
    </Canvas>
    </div>
  )
}
