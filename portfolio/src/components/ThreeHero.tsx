import { Canvas } from '@react-three/fiber'
import { Environment, Float, Html, OrbitControls, PresentationControls } from '@react-three/drei'
import { Suspense } from 'react'

function SpinningTorus() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.35, 220, 32]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.2} roughness={0.2} />
      </mesh>
    </Float>
  )
}

export default function ThreeHero() {
  return (
    <Canvas shadows camera={{ position: [2.2, 1.6, 3.2], fov: 50 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} castShadow />
      <Suspense fallback={<Html center className="text-white/40">Loading...</Html>}>
        <PresentationControls global polar={[-0.2, 0.2]} azimuth={[-0.6, 0.6]}>
          <SpinningTorus />
        </PresentationControls>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} makeDefault />
    </Canvas>
  )
}
