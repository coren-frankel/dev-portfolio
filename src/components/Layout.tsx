import "../styles/Layout.css";
import { Layout as AntdLayout, Button, Drawer, Grid, Image, Menu } from "antd";
const { Header, Content, Footer } = AntdLayout;
import {
  animated,
  createInterpolator,
  to as interpolate,
  useSpring,
} from "@react-spring/web";
import { stepsCoordinates } from "easing-coordinates";
import { NavLink, useLocation } from "react-router";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import logoBanner from "../assets/header-logo.png";
import { useEffect, useState, type CSSProperties } from "react";

const STOPS = 20;
const angle = 75;

const items = [
  {
    key: 1,
    path: "/home",
    label: (
      <NavLink className="nav-link" to="/home">
        Home
      </NavLink>
    ),
  },
  {
    key: 2,
    path: "/about",
    label: (
      <NavLink className="nav-link" to="/about">
        About
      </NavLink>
    ),
  },
  {
    key: 3,
    path: "/arcade",
    label: (
      <NavLink className="nav-link" to="/arcade">
        Arcade
      </NavLink>
    ),
  },
  {
    key: 4,
    path: "/",
    label: (
      <NavLink className="nav-link" to="/">
        ???
      </NavLink>
    ),
  },
  {
    key: 5,
    label: (
      <a className="nav-link" href="https://github.com/coren-frankel">
        <GithubOutlined /> Github
      </a>
    ),
  },
  {
    key: 6,
    label: (
      <a className="nav-link" href="https://linkedin.com/in/coren-frankel">
        <LinkedinOutlined /> LinkedIn
      </a>
    ),
  },
  {
    key: 7,
    label: (
      <a className="nav-link" href="mailto:dev@corenfrankel.com">
        <MailOutlined /> Email
      </a>
    ),
  },
];

const { useBreakpoint } = Grid;

export const Layout = ({
  children,
  style,
}: {
  children: React.JSX.Element;
  style?: CSSProperties;
}) => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const showDrawer = () => {
    setVisible(!visible);
  };

  const { pathname: location } = useLocation();
  useEffect(() => {
    // console.log("location changed", location);
    // setVisible(false);
  }, [location]);

  const { colorFrom, colorMid, colorTo } = useSpring({
    colorFrom: "#0bd1ff",
    colorMid: "#ffa3ff",
    colorTo: "#ffd34e",
  });

  const coordinates = stepsCoordinates(STOPS, "skip-none");
  const allStops = interpolate(
    [colorFrom, colorMid, colorTo],
    (from, mid, to) => {
      const blend = createInterpolator({
        range: [0, 0.5, 1],
        output: [from, mid, to],
      });
      return coordinates.map(({ x, y }) => {
        const color = blend(y);
        return `${color} ${x * 100}%`;
      });
    },
  );
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: Object.entries(screens)
            .filter((screen) => !!screen[1])
            .some((screen) => screen[0] === "md")
            ? "0 50px"
            : "0 16px",
        }}
      >
        <Image
          src={logoBanner}
          preview={false}
          style={{
            maxHeight: Object.entries(screens)
              .filter((screen) => !!screen[1])
              .some((screen) => screen[0] === "md")
              ? 65
              : 50,
            height: "auto",
          }}
        />
        {Object.entries(screens)
          .filter((screen) => !!screen[1])
          .some((screen) => screen[0] === "md") ? (
          <Menu
            theme="dark"
            mode="horizontal"
            items={items.filter((i) => i.path !== location)}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : (
          <>
            <Button
              type="text"
              onClick={showDrawer}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px",
                height: "40px",
              }}
            >
              <MenuOutlined style={{ color: "#fff", fontSize: "18px" }} />
            </Button>
            <Drawer
              placement="right"
              onClose={showDrawer}
              open={visible}
              width={280}
              styles={{
                body: { padding: 0 },
              }}
            >
              <Menu
                theme="dark"
                mode="inline"
                items={items.filter((i) => i.path !== location)}
                style={{ border: "none" }}
                onClick={() => setVisible(false)}
              />
            </Drawer>
          </>
        )}
      </Header>
      <Content style={{ flex: 1 }}>
        <animated.div
          id="gradient"
          style={{
            ...style,
            minHeight: "100%",
            backgroundImage: allStops.to(
              (...args) => `linear-gradient(${angle}deg, ${args.join(", ")})`,
            ),
          }}
        >
          {children}
        </animated.div>
      </Content>
      <Footer style={{ textAlign: "center", zIndex: 2 }}>
        Coren &quot;Kern&quot; Frankel ©{new Date().getFullYear()}
      </Footer>
    </AntdLayout>
  );
};
