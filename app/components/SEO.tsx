import { Typography } from "antd";

export const SEO = ({ showHelp }: { showHelp: boolean }) => {
  return (
    <div className={showHelp ? "seo-content visible" : "seo-content"}>
      <Typography.Title
        level={1}
        type="success"
        className={showHelp ? "" : "visually-hidden"}
      >
        Welcome to My Developer Portfolio
      </Typography.Title>
      <Typography.Title
        level={2}
        type="warning"
        className={showHelp ? "" : "visually-hidden"}
      >
        Interactive Command Line Interface
      </Typography.Title>
      <Typography.Paragraph
        className={showHelp ? "visible-text" : "visually-hidden"}
      >
        Explore my portfolio through this interactive CLI simulation. Type
        commands to navigate and learn more about my projects, skills, and
        experience.
      </Typography.Paragraph>
      <Typography.Title
        level={2}
        type="danger"
        className={showHelp ? "" : "visually-hidden"}
      >
        Quick Navigation
      </Typography.Title>
      <Typography.Paragraph
        className={showHelp ? "visible-text" : "visually-hidden"}
      >
        Type commands like &apos;home&apos;, &apos;about&apos;, or
        &apos;game&apos; to explore different sections of my portfolio. Use the
        Return or Enter key to submit commands.
      </Typography.Paragraph>
      <Typography.Title level={2} className="visually-hidden">
        Professional Software Developer Profile
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        Welcome to the portfolio of Coren Frankel, a passionate and dedicated
        software developer based in Denver, Colorado. With expertise spanning
        full-stack web development, modern JavaScript frameworks, and database
        management, I specialize in creating robust, scalable, and user-friendly
        applications that solve real-world problems. While I have a strong
        foundation in these areas, I am also continuously expanding my skill set
        to include new tools and technologies.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Technical Expertise and Specializations
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        My technical toolkit includes proficiency in React, TypeScript, Python,
        and Java. I have extensive experience with database systems including
        MySQL, PostgreSQL, and Redis, enabling me to build comprehensive
        data-driven applications. My frontend development skills encompass
        responsive design, user experience optimization, and modern CSS
        frameworks, while my backend expertise includes API development, server
        management, and cloud deployment strategies. In my current role, I am
        responsible for leading every aspect of the software development
        lifecycle, from initial conceptualization and design to deployment and
        maintenance.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Development Philosophy and Approach
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        I believe in writing clean, maintainable code that prioritizes both
        performance and accessibility. My development approach emphasizes
        test-driven development, continuous integration, and agile
        methodologies. I&apos;m passionate about staying current with shifting
        paradigms and best practices, regularly contributing to open-source
        projects and engaging with the developer community through various
        platforms and local meetups.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Collaboration and Professional Growth
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        As a collaborative team player, I excel in both independent development
        and team environments. I have experience working with cross-functional
        teams, participating in code reviews, and mentoring junior developers.
        My communication skills allow me to effectively translate technical
        concepts for non-technical stakeholders, ensuring project alignment and
        successful delivery. I&apos;m always eager to learn from others and
        share knowledge within the development community. On teams I am
        regularly a utility player, willing to step into any role to help
        achieve our goals, even if it means tackling unfamiliar challenges. I
        embrace the opportunity to grow and adapt, leveraging my diverse skill
        set to contribute wherever I can.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Innovation and Future-Forward Thinking
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        I&apos;m particularly interested in emerging technologies such as
        progressive web applications and modern development tools that enhance
        productivity and user experience, but I also recognize the importance of
        established technologies and best practices. This portfolio website
        itself demonstrates my commitment to innovation, featuring an
        interactive command-line interface that provides a unique and engaging
        way for visitors to explore my work and background. I continuously
        explore new frameworks, tools, and methodologies to stay at the
        forefront of software development trends.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Freelance Opportunities
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        I am available for freelance and contract work, bringing my expertise in
        full-stack development to help businesses and individuals achieve their
        digital goals. Whether you need a custom web application, website
        enhancements, or technical consulting, I offer flexible solutions
        tailored to your needs. My approach combines technical proficiency with
        a deep understanding of user experience and business objectives,
        ensuring that every project I undertake delivers real value.
      </Typography.Paragraph>
      <Typography.Title level={3} className="visually-hidden">
        Connect and Collaborate
      </Typography.Title>
      <Typography.Paragraph className="visually-hidden">
        I&apos;m always open to discussing new opportunities, collaborative
        projects, or simply connecting with fellow developers and programming
        enthusiasts. Whether you&apos;re looking for a skilled developer to join
        your team, interested in collaborating on an open-source project, or
        want to discuss the latest developments in web technology, I welcome the
        opportunity to connect. Feel free to explore this interactive portfolio,
        check out my GitHub repositories, and reach out through any of the
        available channels. Let&apos;s build something amazing together!
      </Typography.Paragraph>
    </div>
  );
};
