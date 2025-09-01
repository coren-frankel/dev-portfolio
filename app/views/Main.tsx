import "../styles/Main.css";
import { Layout } from "../components/Layout";
import { SkillSection } from "../components/SkillSection";
import { useRef, useState } from "react";
import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";
import skillsData from "../data/skillsData.json";
import projectPRs from "../data/projectPRs.json";

import web from "../assets/responsive-design.svg";
import full from "../assets/client-server.svg";
import sql from "../assets/sql.svg";

import branch from "../assets/branch-svgrepo-com.svg";
import bushes from "../assets/bushes-of-leaves-svgrepo-com.svg";
import catcus from "../assets/cactus-svgrepo-com.svg";
import cactus2 from "../assets/cactus-2-svgrepo-com.svg";
import fox from "../assets/fox-svgrepo-com.svg";
import deer from "../assets/deer-svgrepo-com.svg";
import leaf from "../assets/leaf-svgrepo-com.svg";
import leaves2 from "../assets/leaves-2-svgrepo-com.svg";
import leaves3 from "../assets/leaves-3-svgrepo-com.svg";
import leaves4 from "../assets/leaves-4-svgrepo-com.svg";
import leaves5 from "../assets/leaves-5-svgrepo-com.svg";
import mtn from "../assets/snow-mountain-svgrepo-com.svg";
import tree from "../assets/tree-svgrepo-com.svg";
import tree2 from "../assets/tree-2-svgrepo-com.svg";
import {
  Avatar,
  Card,
  Grid,
  Image,
  List,
  Typography,
  Space,
  FloatButton,
  Tooltip,
} from "antd";
import {
  HeartTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { useBreakpoint } = Grid;

function Main() {
  const parallax = useRef<IParallax>(null!);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const screens = useBreakpoint();
  const isMobile = screens.xs || screens.sm;
  const isTablet = screens.md;

  // Image assets mapping
  const imageAssets = {
    web,
    full,
    sql,
  };

  // Enhanced responsive helper
  const getResponsiveValue = (mobile: any, tablet: any, desktop: any) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Helper function to generate skill icon URLs with responsive perline
  const getSkillIconUrl = (skill: (typeof skillsData.skills)[0]) => {
    const perline = getResponsiveValue(
      skill.perlineConfig.mobile,
      skill.perlineConfig.tablet,
      skill.perlineConfig.desktop,
    );
    return `${skill.iconUrl}&perline=${perline}&theme=auto`;
  };

  // Handle image loading states for optimistic UI
  const handleImageLoad = (imageKey: string) => {
    setImageLoading((prev) => ({ ...prev, [imageKey]: false }));
  };

  const handleImageLoadStart = (imageKey: string) => {
    setImageLoading((prev) => ({ ...prev, [imageKey]: true }));
  };

  // Navigation functions with smoother mobile experience
  const navigateToSection = (section: number) => {
    parallax.current.scrollTo(section);
  };
  return (
    <Layout>
      <>
        <Parallax ref={parallax} pages={4}>
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: "#805E73" }}
          />
          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: "#87BCDE" }}
          />

          <ParallaxLayer
            offset={0.5}
            speed={1}
            factor={2}
            style={{
              backgroundImage: branch,
              backgroundSize: "contain",
            }}
          />

          <ParallaxLayer
            offset={1.6}
            speed={-0.3}
            style={{ pointerEvents: "none" }}
          >
            <img src={catcus} width={getResponsiveValue("40%", "50%", "55%")} />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={cactus2}
              width={"20%"}
              className="block"
              style={{ marginLeft: "55%" }}
            />
            <img
              src={catcus}
              width={"10%"}
              className="block"
              style={{ marginLeft: "95%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.4 }}>
            <img
              src={branch}
              width={"20%"}
              className="block"
              style={{ marginLeft: "70%" }}
            />
            <img
              src={leaf}
              width={"20%"}
              className="block"
              style={{ marginLeft: "40%" }}
            />
            <img
              src={fox}
              width={"10%"}
              className="block"
              style={{ marginLeft: "40%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={leaves2}
              width={"10%"}
              className="block"
              style={{ marginLeft: "100%" }}
            />
            <img
              src={leaves4}
              width={"10%"}
              className="block"
              style={{ marginLeft: "20%" }}
            />
            <img
              src={leaves3}
              width={"20%"}
              className="block"
              style={{ marginLeft: "70%" }}
            />
            <img
              src={leaves5}
              width={"25%"}
              className="block"
              style={{ marginLeft: "90%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.3} speed={-0.1} style={{ opacity: 0.4 }}>
            <img
              src={bushes}
              width={"10%"}
              className="block"
              style={{ marginLeft: "20%" }}
            />
            <img
              src={tree}
              width={"20%"}
              className="block"
              style={{ marginLeft: "60%" }}
            />
            <img
              src={tree2}
              width={"15%"}
              className="block"
              style={{ marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={3.2} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={branch}
              width={getResponsiveValue("15%", "18%", "20%")}
              className="block"
              style={{ marginLeft: "5%", marginTop: "5%" }}
            />
            <div
              className="block"
              style={{ marginLeft: getResponsiveValue("20%", "22%", "25%") }}
            >
              <div
                className="box sb"
                style={{
                  fontSize: getResponsiveValue("14px", "15px", "16px"),
                  padding: getResponsiveValue("15px", "18px", "20px"),
                }}
              >
                Eyo!
              </div>
              <img src={deer} width={getResponsiveValue("25%", "28%", "30%")} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={3.3}
            speed={-0.4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Image src={mtn} preview={false} width={"60%"} />
          </ParallaxLayer>

          {/* Render Skill Sections */}
          {skillsData.parallaxSections.map((section, index) => (
            <SkillSection
              key={index}
              section={section}
              skillsData={skillsData}
              imageAssets={imageAssets}
              imageLoading={imageLoading}
              handleImageLoad={handleImageLoad}
              handleImageLoadStart={handleImageLoadStart}
              getResponsiveValue={getResponsiveValue}
              getSkillIconUrl={getSkillIconUrl}
              navigateToSection={navigateToSection}
            />
          ))}

          <ParallaxLayer
            offset={3}
            speed={-0.1}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundPosition: "center",
              backgroundImage: `url(${mtn})`,
              padding: getResponsiveValue("10px", "15px", "20px"),
            }}
            onClick={() => navigateToSection(0)}
          >
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <Card
                style={{
                  maxWidth: getResponsiveValue("100%", "500px", "500px"),
                  alignSelf: getResponsiveValue("center", "center", "end"),
                  width: getResponsiveValue("100%", "auto", "auto"),
                  margin: getResponsiveValue("0 10px", "0 15px", "0"),
                }}
                loading={imageLoading["open-source"]}
              >
                <Card.Meta
                  title={
                    <Space>
                      <Avatar
                        icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                        size="large"
                      />
                      <Typography.Title level={3} style={{ margin: 0 }}>
                        Open Source
                      </Typography.Title>
                    </Space>
                  }
                  description={
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Typography.Paragraph
                        style={{
                          fontSize: getResponsiveValue("12px", "13px", "14px"),
                          margin: 0,
                          wordBreak: "break-all",
                        }}
                      >
                        No contribution is too small! I&apos;ve had PRs merged
                        into various community projects on Github, including
                        (but not limited to):
                      </Typography.Paragraph>

                      <List
                        size="large"
                        dataSource={projectPRs.projects}
                        renderItem={(item) => (
                          <List.Item
                            style={{
                              fontSize: getResponsiveValue(
                                "12px",
                                "13px",
                                "14px",
                              ),
                              padding: "8px 0",
                            }}
                          >
                            <Space
                              direction={isMobile ? "vertical" : "horizontal"}
                              align="start"
                            >
                              <Link to={item.link} target="_blank">
                                <Typography.Text
                                  strong
                                  style={{ color: "#1890ff" }}
                                >
                                  {item.title}
                                </Typography.Text>
                              </Link>
                              <Typography.Text
                                style={{
                                  fontSize: getResponsiveValue(
                                    "11px",
                                    "12px",
                                    "13px",
                                  ),
                                }}
                              >
                                - {item.description}
                              </Typography.Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </Space>
                  }
                />
              </Card>

              <Space direction="vertical" align="center" size={16}>
                <Typography.Title
                  level={2}
                  style={{
                    color: "cyan",
                    fontSize: getResponsiveValue("1.5rem", "1.75rem", "2rem"),
                    textAlign: "center",
                    margin: getResponsiveValue(
                      "12px 0 8px 0",
                      "14px 0 10px 0",
                      "16px 0",
                    ),
                  }}
                >
                  And other stuff too...
                </Typography.Title>

                <Typography.Paragraph
                  style={{
                    color: "orange",
                    fontSize: getResponsiveValue("14px", "15px", "16px"),
                    textAlign: "center",
                    margin: getResponsiveValue("0 10px", "0 15px", "0"),
                    maxWidth: "600px",
                  }}
                >
                  But I don&apos;t have a lot I can show you right now. Be sure
                  to explore my links, find the secrets of the Console! Check
                  back again soon.
                </Typography.Paragraph>
              </Space>
            </Space>
          </ParallaxLayer>
        </Parallax>
        {/* Floating Navigation Buttons */}
        <FloatButton.Group
          shape="circle"
          style={{ right: getResponsiveValue(16, 20, 24) }}
        >
          <Tooltip title="Go to Top" placement="left">
            <FloatButton
              icon={<ArrowUpOutlined />}
              onClick={() => navigateToSection(0)}
            />
          </Tooltip>
          <Tooltip title="Go to Bottom" placement="left">
            <FloatButton
              icon={<ArrowDownOutlined />}
              onClick={() => navigateToSection(3)}
            />
          </Tooltip>
        </FloatButton.Group>
      </>
    </Layout>
  );
}

export default Main;
