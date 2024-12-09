import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
      <h1>Coren Frankel</h1>
      <Canvas>
        <Scene />
      </Canvas>
      <h3>Full-Stack Software Developer</h3>
    </header>
  )
}
