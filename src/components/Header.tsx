import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center' }}>
      <h1>Coren Frankel</h1>
      <Canvas>
        <Scene />
      </Canvas>
      <h2>Full Stack Software Developer</h2>
    </header>
  )
}
