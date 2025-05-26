import { Card } from "antd";
import { Layout } from "../components/Layout";
import { Link } from "react-router";

const About = () => {
  return (
    <Layout style={{ display: "flex" }}>
      <Card
        title="About Me"
        styles={{ title: { color: "lavender", fontSize: 24 } }}
        style={{
          maxWidth: "600px",
          backgroundColor: "#111",
          color: "lavender",
          margin: "auto",
        }}
      >
        I'm called Coren. Full Stack Software Developer based in Denver,
        Colorado. I acquired dual bachelors degrees in Philosophy & Political
        Science in 2013. For the following 8 years I ascended rank in various
        roles in the hospitality industy, taking pride in my ability to lead
        through action and deftly solve multi-tenanted problems. I have always
        been a tinkerer, and have always had a passion for learning new things,
        so it was only a matter of time before I found my way to programming.
        <br />
        <br />
        In 2022, I stepped away from my role as General Manager of a popular
        fast-casual bar & restaurant chain to begin a new chapter, confident
        that my education and work ethic would serve me anywhere. Within a
        couple of weeks of rest followed by research, I began to progress
        through{" "}
        <Link to="https://www.theodinproject.com/">The Odin Project</Link>'s Web
        Development curriculumn and quickly committed to making a career
        transition into software engineering and web development.
        <br />
        <br />
        After excelling in two <em>bootcamp</em>-style immersive programs, and
        moonlighting as a Python & JavaScript instructor for K-12 students in
        between, I was able to land my first role as a Full Stack Developer in
        early 2023. Since then I have had the pleasure of leading development on
        a series of projects and codebases using Node & React with TypeScript,
        and have proven effective with multiple languages and technology stacks.
        In my short time as a developer I have leveraged my experience to embed
        myself in various communities, providing multiple opportunities to
        mentor and support other developers and to contribute meaningfully to
        Open Source Software projects.
        <br />
        <br />
        I read horror novels and primary philosophy texts for fun. I enjoy
        hiking, pontificating, and cracking wise with my Wife. We are adoptive
        parents to a whiny but lovable cat named Leapday William. I like all
        kinds of music and have a humble record collection that I occasionally
        add to. I pick a guitar or ukelele from time to time. I usually have a
        single-player game on rotation on my PS5, and it's rarely the newest or
        hotest thing.
        <br />
      </Card>
    </Layout>
  );
};

export default About;
