import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, ContactShadows, Bounds, Environment } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}toon_puffer_fish.glb`

useGLTF.preload(MODEL_URL)

function PufferModel({ rotationX, rotationY, facing, lookAtRef }) {
  const ref = useRef()
  const { scene } = useGLTF(MODEL_URL)
  const currentRotationX = useRef(rotationX ?? 0)
  const currentRotationY = useRef(
    typeof rotationY === 'number' ? rotationY :
    facing === 'left' ? -Math.PI / 2 :
    facing === 'right' ? Math.PI / 2 : 0
  )

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

      const basic = new THREE.MeshBasicMaterial({
        color: baseColor,
        map: isCrossMat ? null : sourceMap,
        transparent: !!m.transparent,
        opacity: m.opacity ?? 1,
        alphaMap: m.alphaMap || null,
        side: m.side ?? THREE.FrontSide,
        toneMapped: false,
        fog: false,
      })
      basic.name = m.name
      return basic
    }

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        const cross = isCross(child.name) || mats.some((m) => isCross(m.name))
        const replaced = mats.map((m) => toBasic(m, cross))
        child.material = Array.isArray(child.material) ? replaced : replaced[0]
      }
    })
    return cloned
  }, [scene])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!ref.current) return
    ref.current.position.y = Math.sin(t * 0.9) * 0.15

    const target = lookAtRef && lookAtRef.current
    if (target) {
      currentRotationY.current += (target.y - currentRotationY.current) * 0.10
      currentRotationX.current += (target.x - currentRotationX.current) * 0.12
      ref.current.rotation.y = currentRotationY.current
      ref.current.rotation.x = currentRotationX.current
      ref.current.rotation.z = Math.cos(t * 0.5) * 0.04
      return
    }

    const hasX = typeof rotationX === 'number'
    const hasY = typeof rotationY === 'number'

    if (hasX || hasY) {
      if (hasY) {
        const k = 0.10
        currentRotationY.current += (rotationY - currentRotationY.current) * k
        ref.current.rotation.y = currentRotationY.current
      } else {
        ref.current.rotation.y = 0
      }
      if (hasX) {
        const k = 0.12
        currentRotationX.current += (rotationX - currentRotationX.current) * k
        ref.current.rotation.x = currentRotationX.current
      } else {
        ref.current.rotation.x = Math.sin(t * 0.6) * 0.05
      }
      ref.current.rotation.z = Math.cos(t * 0.5) * 0.04
    } else if (facing === 'left' || facing === 'right') {
      const targetY = facing === 'right' ? Math.PI / 2 : -Math.PI / 2
      const k = 0.10
      currentRotationY.current += (targetY - currentRotationY.current) * k
      ref.current.rotation.y = currentRotationY.current
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.06
      ref.current.rotation.z = Math.cos(t * 0.5) * 0.04
    } else {
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.45 + 0.4
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.08
      ref.current.rotation.z = Math.cos(t * 0.5) * 0.06
    }
  })

  return (
    <group ref={ref}>
      <Center>
        <primitive object={prepared} />
      </Center>
    </group>
  )
}

export default function PufferFish({ rotationX, rotationY, facing, lookAtRef }) {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.6,
      }}
      camera={{ position: [0, 0.2, 6], fov: 35 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={2.6} color="#FFFFFF" />
      <hemisphereLight skyColor="#FFF5D0" groundColor="#FFB347" intensity={2.0} />
      <directionalLight position={[3, 5, 4]} intensity={4.5} color="#FFFFFF" />
      <directionalLight position={[-3, 2, -2]} intensity={2.8} color="#FFE6A8" />
      <directionalLight position={[0, -3, 2]} intensity={1.6} color="#FFC36B" />
      <directionalLight position={[0, 4, -4]} intensity={2.2} color="#FFFFFF" />

      <Suspense fallback={null}>
        <Environment preset="sunset" environmentIntensity={3.2} />
        <Bounds fit clip observe margin={1.05}>
          <PufferModel rotationX={rotationX} rotationY={rotationY} facing={facing} lookAtRef={lookAtRef} />
        </Bounds>
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.32}
          scale={6}
          blur={2.4}
          far={3}
          color="#7a5a00"
        />
      </Suspense>
    </Canvas>
  )
}
