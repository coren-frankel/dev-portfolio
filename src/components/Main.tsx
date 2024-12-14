import { Header } from '../components/Header';
import { useRef } from 'react';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';
import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import { animated, createInterpolator, to as interpolate, useSpring } from '@react-spring/web';
import { stepsCoordinates } from 'easing-coordinates';

const STOPS = 20;
const angle = 75;

import web from '../assets/responsive-design.svg';
import full from '../assets/client-server.svg';

import branch from '../assets/branch-svgrepo-com.svg';
import bushes from '../assets/bushes-of-leaves-svgrepo-com.svg';
import catcus from '../assets/cactus-svgrepo-com.svg';
import cactus2 from '../assets/cactus-2-svgrepo-com.svg';
import fox from '../assets/fox-svgrepo-com.svg';
import leaf from '../assets/leaf-svgrepo-com.svg';
import leaves2 from '../assets/leaves-2-svgrepo-com.svg';
import leaves3 from '../assets/leaves-3-svgrepo-com.svg';
import leaves4 from '../assets/leaves-4-svgrepo-com.svg';
import leaves5 from '../assets/leaves-5-svgrepo-com.svg';
import mtn from '../assets/snow-mountain-svgrepo-com.svg';
import tree from '../assets/tree-svgrepo-com.svg';
import tree2 from '../assets/tree-2-svgrepo-com.svg';

function Main() {
  const parallax = useRef<IParallax>(null!);

  const { colorFrom, colorMid, colorTo } = useSpring({
    colorFrom: '#0bd1ff',
    colorMid: '#ffa3ff',
    colorTo: '#ffd34e',
  })

  const coordinates = stepsCoordinates(STOPS, 'skip-none');
  const allStops = interpolate([colorFrom, colorMid, colorTo], (from, mid, to) => {
    const blend = createInterpolator({ range: [0, 0.5, 1], output: [from, mid, to] });
    return coordinates.map(({ x, y }) => {
      const color = blend(y);
      return `${color} ${x * 100}%`
    })
  });
  return (
    <animated.div
      id='gradient'
      style={{
        backgroundImage: allStops.to((...args) => `linear-gradient(${angle}deg, ${args.join(', ')})`),
      }}
    >
      <Header />
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: branch,
            backgroundSize: 'contain',
          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={catcus} style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={cactus2} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={catcus} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={branch} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={leaf} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          <img src={fox} style={{ display: 'block', width: '10%', marginLeft: '20%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={leaves2} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={leaves4} style={{ display: 'block', width: '10%', marginLeft: '20%' }} />
          <img src={leaves3} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={leaves5} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={bushes} style={{ display: 'block', width: '20%', marginLeft: '20%' }} />
          <img src={tree} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.2} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={branch} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={tree2} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <img src={mtn} style={{ width: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h3>UI/UX Developer</h3>
          <img src={web} style={{ width: '20%' }} />
          <p>I am comfortable styling with vanilla CSS as well as various CSS frameworks and styled component libraries.</p>
          <img src="https://go-skill-icons.vercel.app/api/icons?i=html,css,tailwind,bootstrap,materialui&theme=auto" alt="" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h3>Full Stack Development</h3>
          <img src={full} style={{ width: '20%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.1}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: mtn,
          }}
          onClick={() => parallax.current.scrollTo(0)}>
          <h3>And more...</h3>
          <p>Under construction...</p>
          <Canvas>
            <Scene />
          </Canvas>
        </ParallaxLayer>
      </Parallax>
    </animated.div>
  )
}

export default Main
