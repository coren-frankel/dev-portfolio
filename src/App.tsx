import { animated, createInterpolator, to as interpolate, useSpring } from '@react-spring/web';
import './App.css'
import { Header } from './components/Header';
import { stepsCoordinates } from 'easing-coordinates';
import { useRef } from 'react';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';
import react from './assets/react.svg';

const STOPS = 20;
const angle = 75;

function App() {
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
  })
  const parallax = useRef<IParallax>(null!)
  return (
    <animated.div
      className='container'
      style={{
        backgroundImage: allStops.to((...args) => `linear-gradient(${angle}deg, ${args.join(', ')})`),
      }}
    >
      <Header />
      <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
  
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: react,
              backgroundSize: 'cover',
            }}
          />
  
          <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={react} style={{ width: '15%', marginLeft: '70%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={react} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={react} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={react} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={react} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={react} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={react} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
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
            <img src={react} style={{ width: '60%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: '80%',
              backgroundPosition: 'center',
              backgroundImage: react,
            }}
          />
  
          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={react} style={{ width: '20%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={react} style={{ width: '40%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => parallax.current.scrollTo(0)}>
            <img src={react} style={{ width: '40%' }} />
          </ParallaxLayer>
        </Parallax>
      </div>
      <p>More coming soon...</p>
      <p>Reach me directly at <a href="mailto:dev@corenfrankel.com">dev@corenfrankel.com</a></p>
    </animated.div>
  )
}

export default App
