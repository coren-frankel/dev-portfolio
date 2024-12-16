import "../styles/Layout.css";
import { Layout as AntdLayout, Image, Menu } from 'antd';
const { Header, Content, Footer } = AntdLayout;
import { animated, createInterpolator, to as interpolate, useSpring } from '@react-spring/web';
import { stepsCoordinates } from 'easing-coordinates';
import { NavLink } from 'react-router';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

import logoBanner from '../assets/facebook_cover_photo_1.png';
import type { CSSProperties } from "react";

const STOPS = 20;
const angle = 75;

const items = [
  { key: 1, label: (<NavLink className="nav-link" to="/home"><em>Kern</em> At A Glance</NavLink>) },
  { key: 2, label: (<NavLink className="nav-link" to="/about">About</NavLink>) },
  { key: 3, label: (<NavLink className="nav-link" to="/contact">Contact</NavLink>) },
  { key: 4, label: (<NavLink className="nav-link" to="/">???</NavLink>) },
  {
    key: 5, label: (
      <a className="nav-link" href="https://github.com/coren-frankel">
        <GithubOutlined />{" "}
        Github
      </a>
    )
  },
  {
    key: 6,
    label: (
      <a className="nav-link" href="https://linkedin.com/in/coren-frankel">
        <LinkedinOutlined />{" "}
        LinkedIn
      </a>
    )
  },
  {
    key: 7,
    label: (
      <a className="nav-link" href="mailto:dev@corenfrankel.com">
        <MailOutlined />{" "}
        Email
      </a>
    )
  },
];

export const Layout = ({ children, navKey, style }: { children: React.JSX.Element, navKey: number, style?: CSSProperties }) => {
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
    <AntdLayout style={style}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}

      >
        <Image src={logoBanner} preview={false} style={{ maxWidth: '50vw', maxHeight: 65 }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[`${navKey}`]}
          selectedKeys={[`${navKey}`]}
          items={items}
        />

      </Header>
      <Content>
        <animated.div
          id='gradient'
          style={{
            // display: 'flex', alignItems: 'center',
            height: '100vh',
            backgroundImage: allStops.to((...args) => `linear-gradient(${angle}deg, ${args.join(', ')})`),
          }}
        >
          {children}
        </animated.div>
      </Content>
      <Footer style={{ textAlign: 'center', zIndex: 2 }}>
        Coren "Kern" Frankel ©{new Date().getFullYear()}
      </Footer>
    </AntdLayout>
  )
}