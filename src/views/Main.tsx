import { Layout } from '../components/Layout';
import { useRef } from 'react';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';
import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';

import web from '../assets/responsive-design.svg';
import full from '../assets/client-server.svg';
import sql from '../assets/sql.svg';

import branch from '../assets/branch-svgrepo-com.svg';
import bushes from '../assets/bushes-of-leaves-svgrepo-com.svg';
import catcus from '../assets/cactus-svgrepo-com.svg';
import cactus2 from '../assets/cactus-2-svgrepo-com.svg';
import fox from '../assets/fox-svgrepo-com.svg';
import deer from '../assets/deer-svgrepo-com.svg';
import leaf from '../assets/leaf-svgrepo-com.svg';
import leaves2 from '../assets/leaves-2-svgrepo-com.svg';
import leaves3 from '../assets/leaves-3-svgrepo-com.svg';
import leaves4 from '../assets/leaves-4-svgrepo-com.svg';
import leaves5 from '../assets/leaves-5-svgrepo-com.svg';
import mtn from '../assets/snow-mountain-svgrepo-com.svg';
import tree from '../assets/tree-svgrepo-com.svg';
import tree2 from '../assets/tree-2-svgrepo-com.svg';
import { Card, Image, List, Typography } from 'antd';
import { Link } from 'react-router';

function Main() {
  const parallax = useRef<IParallax>(null!);
  return (
    <Layout navKey={1}>
      <Parallax ref={parallax} pages={4}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0.5}
          speed={1}
          factor={2}
          style={{
            backgroundImage: branch,
            backgroundSize: 'contain',
          }}
        />

        <ParallaxLayer offset={1.6} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={catcus} width={'55%'} />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={cactus2} width={'20%'} className="block" style={{ marginLeft: '55%' }} />
          <img src={catcus} width={'10%'} className="block" style={{ marginLeft: '95%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.4 }}>
          <img src={branch} width={'20%'} className="block" style={{ marginLeft: '70%' }} />
          <img src={leaf} width={'20%'} className="block" style={{ marginLeft: '40%' }} />
          <img src={fox} width={'10%'} className="block" style={{ marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={leaves2} width={'10%'} className="block" style={{ marginLeft: '100%' }} />
          <img src={leaves4} width={'10%'} className="block" style={{ marginLeft: '20%' }} />
          <img src={leaves3} width={'20%'} className="block" style={{ marginLeft: '70%' }} />
          <img src={leaves5} width={'25%'} className="block" style={{ marginLeft: '90%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.3} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={bushes} width={'10%'} className="block" style={{ marginLeft: '20%' }} />
          <img src={tree} width={'20%'} className="block" style={{ marginLeft: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={3.2} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={branch} width={'20%'} className="block" style={{ marginLeft: '5%', marginTop: '15%' }} />
          <img src={deer} width={'25%'} className="block" style={{ marginLeft: '10%' }} />
          <img src={tree2} width={'15%'} className="block" style={{ marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={3.3}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <Image src={mtn} preview={false} width={'60%'} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            gap: '40px', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'end', marginBottom: '80px' }}
            title="Programming Languages"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=html,css,js,ts,python,java,md,yaml&perline=4&theme=auto"
                alt="HTML, CSS, JavaScript, TypeScript, Python, Java, Markdown, YAML"
              />
            }
          >
            I'm an aspiring polyglot, proficient with multiple languages and syntaxes like these.
          </Card>
          <Image preview={false} src={web} width={'20%'} />
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'start', marginTop: '80px' }}
            title="Frontend libraries & frameworks"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=react,tailwind,bootstrap,materialui,reactnative,expo&theme=auto"
                alt="React, Tailwind CSS, Bootstrap, Material UI, React Native, Expo"
                />
              }
              >
            I've used various progressive style libraries and frameworks, most notably in the React ecosystem.
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            gap: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'start', marginTop: '80px' }}
            title="Full Stack Development"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=nodejs,deno,remix,npm,pnpm,yarn,flask,maven,spring,graphql&perline=5&theme=auto"
                alt="Node.js, Deno, Remix, npm, pnpm, Yarn, Flask, Maven, Spring, GraphQL"
              />
            }
          >
            I utilize various backend, full-stack technologies, package managers & runtimes like:
          </Card>
          <Image preview={false} src={full} width={'20%'} />
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'end', marginBottom: '80px' }}
            title="Data Persistence Tools"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=postgres,mysql,supabase,redis,mongodb,sqlite,prisma,sqlalchemy&perline=4&theme=auto"
                alt="PostgreSQL, MySQL, Supabase, Redis, MongoDB, SQLite, Prisma, SQLAlchemy"
              />
            }
          >
            Using RDMSs, BaaS, ORMs, SQL & NoSQL I'm comfortable drafting raw DDL, utilizing migration tools, and performing ETL.
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            display: 'flex',
            gap: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'end', marginBottom: '80px' }}
            title="Cloud Providers, DevOps Tools"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=docker,ghactions,digitalocean,vercel,render,ngrok,cloudflare,aws,yaml,gcp&perline=5&theme=auto"
                alt="Docker, Github Actions, Vercel, Render, Ngrok, Cloudflare, AWS EC2, YAML, Google Cloud Platform"
              />
            }
          >
            Development tools that streamline my code to production:
          </Card>
          <Image preview={false} src={sql} width={'20%'} />
          <Card
            style={{ maxWidth: '350px', padding: '10px', alignSelf: 'start', marginBottom: '80px' }}
            title="IDEs, Developer Tools, & OS"
            hoverable
            cover={
              <Image
                style={{ height: '100px' }}
                src="https://go-skill-icons.vercel.app/api/icons?i=vscode,idea,postman,xcode,androidstudio,apple,linux&perline=4&theme=auto"
                alt="VS Code, IntelliJ Idea, Postman, Terminal, Xcode, Android Studio, Apple, Linux"
              />
            }
          >
            As of late, these have been my most used IDEs and OSs
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={-0.1}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: '90%',
            backgroundPosition: 'center',
            backgroundImage: mtn,
          }}
          onClick={() => parallax.current.scrollTo(0)}>
          <Canvas style={{ marginBottom: '-200px' }}>
            <Scene />
          </Canvas>
          <Card style={{ maxWidth: '350px', padding: '10px', alignSelf: 'end', marginRight: '20px' }} title="Open Source Contributor">
            I enjoy becoming a part of the packages that I use in my work, and find more meaning in tools that others use.
            You can find my contributions to various projects including:
            <List>
              <List.Item><Link to="https://react-pdf.org/">React-PDF</Link></List.Item>
              <List.Item><Link to="https://github.com/danomatic/react-pdf-html">react-pdf-html</Link></List.Item>
              <List.Item><Link to="https://flask-cors.readthedocs.io/en/latest/index.html">Flask-CORS</Link></List.Item>
              <List.Item><Link to="https://github.com/marketplace/actions/todo-to-issue">TODO-to-Issue</Link> Github Action</List.Item>
              <List.Item><Link to="https://github.com/LelouchFR/skill-icons">Skill Icons</Link> (which provides tech skill icons uses throughout this page)</List.Item>
            </List>
          </Card>
          <Typography.Title style={{ color: 'cyan' }}>And so much more...</Typography.Title>
          <Typography.Paragraph style={{ color: 'orange' }}>This site is under construction and incomplete. Check back soon.</Typography.Paragraph>
        </ParallaxLayer>
      </Parallax>
    </Layout>
  )
}

export default Main
