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
    <mesh rotation={[10, 10, 10]} ref={myMesh}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1.5} />
      <boxGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color={"gold"} />
    </mesh>
  )
}

export default Scene