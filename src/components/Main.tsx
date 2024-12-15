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
import { Image, Typography } from 'antd';

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
          <Image src={catcus} width={'15%'} style={{ marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <Image src={cactus2} width={'20%'} style={{ display: 'block', marginLeft: '55%' }} />
          <Image src={catcus} width={'10%'} style={{ display: 'block', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <Image src={branch} width={'20%'} style={{ display: 'block', marginLeft: '70%' }} />
          <Image src={leaf} width={'20%'} style={{ display: 'block', marginLeft: '40%' }} />
          <Image src={fox} width={'10%'} style={{ display: 'block', marginLeft: '20%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <Image src={leaves2} width={'10%'} style={{ display: 'block', marginLeft: '10%' }} />
          <Image src={leaves4} width={'10%'} style={{ display: 'block', marginLeft: '20%' }} />
          <Image src={leaves3} width={'20%'} style={{ display: 'block', marginLeft: '70%' }} />
          <Image src={leaves5} width={'25%'} style={{ display: 'block', marginLeft: '30%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <Image src={bushes} width={'10%'} style={{ display: 'block', marginLeft: '20%' }} />
          <Image src={tree} width={'20%'} style={{ display: 'block', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.2} speed={0.4} style={{ opacity: 0.6 }}>
          <Image src={branch} width={'20%'} style={{ display: 'block', marginLeft: '5%' }} />
          <Image src={tree2} width={'15%'} style={{ display: 'block', marginLeft: '75%' }} />
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
          <Image src={mtn} width={'20%'} />
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
          <Image src={web} width={'20%'} />
          <Typography.Paragraph>Proficiency in frontend languages & style frameworks including:</Typography.Paragraph>
          <Image src="https://go-skill-icons.vercel.app/api/icons?i=html,css,js,ts,react,tailwind,bootstrap,materialui,reactnative,expo&theme=auto" alt="HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap, Material UI, React Native, Expo" />
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
          <Image src={full}  width={'20%'} />
          <p>Experience in backend and full-stack frameworks like:</p>
          <Image src="https://go-skill-icons.vercel.app/api/icons?i=node,remix,python,flask,java,spring&theme=auto" alt="Node.js, Remix, Python, Flask, Java, Spring" />
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
