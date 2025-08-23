import "../styles/Main.css";
import { Layout } from "../components/Layout";
import { useRef } from "react";
import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";
import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";

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
import { Avatar, Card, Grid, Image, List, Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { Link } from "react-router";

const { useBreakpoint } = Grid;

function Main() {
  const parallax = useRef<IParallax>(null!);
  const screens = useBreakpoint();
  const sm = () =>
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .some((screen) => screen[0] === "sm");
  return (
    <Layout>
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
          <img src={catcus} width={sm() ? "55%" : "40%"} />
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
            width={sm() ? "20%" : "15%"}
            className="block"
            style={{ marginLeft: "5%", marginTop: "5%" }}
          />
          <div className="block" style={{ marginLeft: sm() ? "25%" : "20%" }}>
            <div
              className="box sb"
              style={{
                fontSize: sm() ? "16px" : "14px",
                padding: sm() ? "20px" : "15px",
              }}
            >
              Eyo!
            </div>
            <img src={deer} width={sm() ? "30%" : "25%"} />
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

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            gap: sm() ? "40px" : "20px",
            flexDirection: sm() ? "row" : "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: sm() ? "40px" : "20px 10px",
          }}
        >
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=md,html,css,js,ts,python,java,graphql&perline=${sm() ? 4 : 3}&theme=auto`}
                alt="Markdown, HTML, CSS, JavaScript, TypeScript, Python, Java, GraphQL"
              />
            }
          >
            <Card.Meta
              title="Programming & Query Languages"
              description="I'm an aspiring polyglot, proficient in these languages and syntaxes, among others"
            />
          </Card>
          <Image
            preview={false}
            src={web}
            width={sm() ? "20%" : "60%"}
            style={{ maxWidth: sm() ? "none" : "200px" }}
          />
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=tailwind,bootstrap,materialui,react,reactnative,expo,threejs&perline=${sm() ? 4 : 3}&theme=auto`}
                alt="Tailwind CSS, Bootstrap, Material UI, React, React Native, Expo, Three.js"
              />
            }
          >
            <Card.Meta
              title="Frontend libraries & frameworks"
              description="I've used various progressive style libraries and frameworks, most notably in the React ecosystem"
            />
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            gap: sm() ? "40px" : "20px",
            flexDirection: sm() ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            padding: sm() ? "40px" : "20px 10px",
          }}
        >
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=nodejs,deno,remix,npm,pnpm,flask,maven,spring,express&perline=${sm() ? 5 : 3}&theme=auto`}
                alt="Node.js, Deno, Remix, npm, pnpm, Flask, Maven, Spring, Express"
              />
            }
          >
            <Card.Meta
              title="Backend & Full Stack Development"
              description="I utilize various backend, full-stack technologies, package managers & runtimes"
            />
          </Card>
          <Image
            preview={false}
            src={full}
            width={sm() ? "20%" : "60%"}
            style={{ maxWidth: sm() ? "none" : "200px" }}
          />
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=postgres,mysql,supabase,redis,mongodb,sqlite,prisma,sqlalchemy,mongoose,bigquery&perline=${sm() ? 5 : 3}&theme=auto`}
                alt="PostgreSQL, MySQL, Supabase, Redis, MongoDB, SQLite, Prisma, SQLAlchemy, Mongoose, BigQuery"
              />
            }
          >
            <Card.Meta
              title="Data Persistence Tools"
              description="Using RDMSs, BaaS, ORMs, SQL & NoSQL I'm comfortable drafting raw DDL, utilizing migration tools, and performing ETL"
            />
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            display: "flex",
            gap: sm() ? "40px" : "20px",
            flexDirection: sm() ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            padding: sm() ? "40px" : "20px 10px",
          }}
        >
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=docker,ghactions,digitalocean,vercel,render,ngrok,cloudflare,aws,gcp,sentry,snyk&perline=${sm() ? 6 : 4}&theme=auto`}
                alt="Docker, Github Actions, Vercel, Render, Ngrok, Cloudflare, AWS EC2, Google Cloud Platform, Sentry, Snyk"
              />
            }
          >
            <Card.Meta
              title="Cloud Providers, DevOps Tools"
              description="Development tools that streamline my code to production"
            />
          </Card>
          <Image
            preview={false}
            src={sql}
            width={sm() ? "20%" : "60%"}
            style={{ maxWidth: sm() ? "none" : "200px" }}
          />
          <Card
            style={{
              maxWidth: sm() ? "400px" : "350px",
              padding: sm() ? "10px" : "5px",
              width: "100%",
              backgroundColor: "hsl(270, 100%, 94%)",
            }}
            hoverable
            cover={
              <Image
                style={{ height: sm() ? "100px" : "80px" }}
                src={`https://go-skill-icons.vercel.app/api/icons?i=vscode,idea,postman,terminal,xcode,android,androidstudio,apple,linux,ubuntu,eclipse&perline=${sm() ? 6 : 4}&theme=auto`}
                alt="VS Code, IntelliJ Idea, Postman, Terminal, Xcode, Android, Android Studio, Apple, Linux, Ubuntu, Eclipse"
              />
            }
          >
            <Card.Meta
              title="GUIs, IDEs, Developer Tools, & OS"
              description="As of late, these are my most used Interactive Development Environments and Operating Systems"
            />
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={-0.1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundImage: mtn,
            padding: sm() ? "20px" : "10px",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
          <Canvas
            style={{
              marginBottom: sm() ? "-200px" : "-100px",
              height: sm() ? "auto" : "200px",
            }}
          >
            <Scene />
          </Canvas>
          <Card
            style={{
              maxWidth: sm() ? "500px" : "350px",
              alignSelf: sm() ? "end" : "center",
              right: sm() ? 20 : 0,
              width: sm() ? "auto" : "100%",
              margin: sm() ? "0" : "0 10px",
            }}
          >
            <Card.Meta
              title="Open Source Contributor"
              avatar={
                <Avatar
                  icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                  size="large"
                />
              }
              description={
                <List
                  size="small"
                  header={
                    <Typography.Paragraph
                      style={{ fontSize: sm() ? "14px" : "12px" }}
                    >
                      Find my contributions to various projects on Github,
                      including (but not limited to):
                    </Typography.Paragraph>
                  }
                >
                  <List.Item style={{ fontSize: sm() ? "14px" : "12px" }}>
                    <Link to="https://react-pdf.org/" target="_blank">
                      react-pdf
                    </Link>{" "}
                    - React renderer for creating PDF files on the browser and
                    server
                  </List.Item>
                  <List.Item style={{ fontSize: sm() ? "14px" : "12px" }}>
                    <Link
                      to="https://github.com/danomatic/react-pdf-html"
                      target="_blank"
                    >
                      react-pdf-html
                    </Link>{" "}
                    - HTML component for react-pdf
                  </List.Item>
                  <List.Item style={{ fontSize: sm() ? "14px" : "12px" }}>
                    <Link
                      to="https://flask-cors.readthedocs.io/en/latest/index.html"
                      target="_blank"
                    >
                      Flask-CORS
                    </Link>{" "}
                    - A Flask extension for handling Cross Origin Resource
                    Sharing (CORS)
                  </List.Item>
                  <List.Item style={{ fontSize: sm() ? "14px" : "12px" }}>
                    <Link
                      to="https://github.com/marketplace/actions/todo-to-issue"
                      target="_blank"
                    >
                      TODO-to-Issue
                    </Link>{" "}
                    Github Action to create, update and close issues based on
                    committed TODO comments
                  </List.Item>
                  <List.Item style={{ fontSize: sm() ? "14px" : "12px" }}>
                    <Link
                      to="https://github.com/LelouchFR/skill-icons"
                      target="_blank"
                    >
                      Skill Icons
                    </Link>{" "}
                    - technology skills icon API (provides icons throughout this
                    page)
                  </List.Item>
                </List>
              }
            />
          </Card>
          <Typography.Title
            style={{
              color: "cyan",
              fontSize: sm() ? "2rem" : "1.5rem",
              textAlign: "center",
              margin: sm() ? "16px 0" : "12px 0 8px 0",
            }}
          >
            And so much more...
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: "orange",
              fontSize: sm() ? "16px" : "14px",
              textAlign: "center",
              margin: sm() ? "0" : "0 10px",
            }}
          >
            This site is under construction and incomplete. Check back soon.
          </Typography.Paragraph>
        </ParallaxLayer>
      </Parallax>
    </Layout>
  );
}

export default Main;
