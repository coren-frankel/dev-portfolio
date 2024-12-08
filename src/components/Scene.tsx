import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Scene = () => {
  const myMesh = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime()
    myMesh.current.rotation.y = clock.getElapsedTime()
    myMesh.current.rotation.z = clock.getElapsedTime()
  });
  return (
    <mesh rotation={[10, 10, 20]} ref={myMesh}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 2, 5]} intensity={1.5} />
      <octahedronGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color={"teal"} />
    </mesh>
  )
}

export default Scene