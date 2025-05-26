import { Card } from "antd";
import { Layout } from "../components/Layout";
import { Link } from "react-router";

const About = () => {
  return (
    <Layout style={{}}>
      <Card
        title="About Me"
        styles={{ title: { color: "lavender" } }}
        style={{
          maxWidth: "600px",
          backgroundColor: "#111",
          color: "lavender",
          margin: "auto",
        }}
      >
        I acquired Dual Bachelors Degrees in Philosophy & Political Science from
        Northern Arizona University in 2013.
        <br />
        <br />
        I sought practical life experience outside Academia, climbing the ladder
        in Restaurants and eventually managing a multi-million dollar-grossing
        location, before deciding to pursue a different career path to stimulate
        my insatiable intellectual curiosity.
        <br />
        <br />
        In 2022, I stepped away from my 8-year tenure at a popular fast-casual
        bar & restaurant chain to begin to start something new. Within a couple
        of weeks, I discovered{" "}
        <Link to="https://www.theodinproject.com/">The Odin Project</Link> and
        by virtue discovered a new passion for learning web development and
        programming, thus began my programming journey.
        <br />
        <br />
        Since then I pursued and completed two bootcamp-style immersive programs
        to expediently assimilate technical skills, and more importantly, the
        soft skills to rapidly learn new technologies. I've capitalized on said
        abilities in various roles since, ranging from K-12 programming
        instructor to my current role, Full Stack Developer.
        <br />
        <br />I have poured myself into self-learnning and exploration and
        continuously pursue all kinds of opportunities outside of my work to
        grow and establish myself in my new blossoming career. I've been known
        to pivot and adapt to meet the demand of my clientele, which has allowed
        me to expand the threshold of my development environments to platforms
        like GCP and Shopify.
      </Card>
    </Layout>
  );
};

export default About;
