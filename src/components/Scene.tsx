import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";


const characters = '0123456789ABCDEF';

function getRandomColor() {
  let hexcode = '#';
  for (let i = 0; i < 6; i++) {
    hexcode += characters[Math.floor(Math.random() * 16)];
  }
  return hexcode;
}

const Scene = () => {
  const myMesh = useRef<Mesh>(null!);
  const [color, setColor] = useState<string>(getRandomColor());

  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime();
    myMesh.current.rotation.y = clock.getElapsedTime();
    myMesh.current.rotation.z = clock.getElapsedTime() / 2;
    // Bob the mesh up and down
    myMesh.current.position.y = Math.sin(clock.getElapsedTime());

    setColor((prevColor) => {
      const changedIndex = Math.floor(Math.random() * 6) + 1;
      const newColor = prevColor.split('');
      const charIndex = characters.indexOf(newColor[changedIndex]);
      const charsLen = characters.length;
      newColor[changedIndex] = characters[
        Math.floor(Math.random() * 2)
          ? (charIndex === charsLen ? 0 : charIndex + 1)
          : (charIndex === 0 ? charsLen : charIndex - 1)];
      return newColor.join('');
    });
  });
  return (
    <mesh rotation={[10, 10, 10]} ref={myMesh}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1.5} />
      <octahedronGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  );
};

export default Scene;
