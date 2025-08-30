import "../styles/Landing.css";
import { Input, Typography, Button } from "antd";
import { PercentageOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import emojiRegex from "emoji-regex";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import TextChunk from "./TextChunk";

const regex = emojiRegex();
const repos = [
  "LookAchoo",
  "culinary-unit-abbreviation",
  "VolatilitySurf",
  "meal_picker",
  "dev-portfolio",
];

const Landing = () => {
  const [command, setCommand] = useState("");
  const [name, setName] = useState("Neo");
  const [displayedChunks, setDisplayedChunks] = useState<string[]>([]);
  const [animatingChunks, setAnimatingChunks] = useState<string[]>([]);
  const [showGreeting, setShowGreeting] = useState(true);
  const [wakeUp, setWakeUp] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key to force animation restart
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);

  // Handle clicking anywhere on the landing page to focus input
  const handlePageClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Helper functions for state management with animation restart
  const appendToState = useCallback(
    (newChunks: string[]) => {
      // Move currently animating chunks to displayed chunks
      setDisplayedChunks((prev) => [...prev, ...animatingChunks]);
      // Set new chunks as the ones to animate
      setAnimatingChunks(newChunks);
      setAnimationKey((prev) => prev + 1);
    },
    [animatingChunks],
  );

  const rewriteState = (newChunks: string[]) => {
    // Clear everything and start fresh with new chunks
    setDisplayedChunks([]);
    setAnimatingChunks(newChunks);
    setAnimationKey((prev) => prev + 1); // Force animation restart
  };

  const clearState = () => {
    setDisplayedChunks([]);
    setAnimatingChunks([]);
    setAnimationKey((prev) => prev + 1); // Force animation restart
  };

  // Add visible class for fade-in animation
  useEffect(() => {
    document.querySelector(".landing-page")?.classList.add("visible");
    return () =>
      document.querySelector(".landing-page")?.classList.remove("visible");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Control or Command key is pressed and the 'X' key is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "x") {
        event.preventDefault(); // Prevent the default cut operation
        appendToState(["Follow the white rabbit."]);
        const knockKnock = setTimeout(
          () => navigate("/the-matrix-has-you"),
          5000,
        );
        return () => clearTimeout(knockKnock);
      }
      if (event.key === "Escape") {
        if (wakeUp) {
          appendToState([`Knock knock, ${name}.`]);
          setTimeout(() => navigate("/the-matrix-has-you"), 3000);
        } else {
          appendToState([
            `Session terminated. Redirecting to home page... Goodbye${name === "Neo" ? "" : " " + name}.`,
          ]);
          setTimeout(() => navigate("/home"), 3000);
        }
      }
    };

    // Attach the event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [appendToState, navigate, name, wakeUp]);

  // Upon 30 seconds of inactivity, load Morpheus' greeting
  useEffect(() => {
    const awake = setTimeout(() => {
      setWakeUp(true);
      rewriteState([`Wake up, ${name}...`, "The Matrix has you..."]);
    }, 30000);
    return () => clearTimeout(awake);
  }, [command, name]);

  // Home page navigation
  const acceptInputCommand = (command: string) => {
    if (/menu|help/i.test(command)) {
      // Menu command - rewrite display
      setShowGreeting(false);
      setWakeUp(false);
      rewriteState(menuItems);
    } else if (/about|home|arcade/i.test(command)) {
      // Literal matches for pages - append
      appendToState([
        `Redirecting to ${command[0].toUpperCase()}${command.slice(1).toLowerCase()} page...`,
      ]);
      setTimeout(() => navigate(`/${command.toLowerCase()}`), 3000);
    } else if (/game/i.test(command)) {
      // Game command - append
      appendToState(["Redirecting to Arcade page..."]);
      setTimeout(() => navigate(`/arcade`), 3000);
    } else if (/more/i.test(command)) {
      // More command - append
      appendToState(["Redirecting to About page..."]);
      setTimeout(() => navigate(`/about`), 3000);
    } else if (/white rabbit/i.test(command)) {
      // White rabbit - append
      appendToState(["Follow the White Rabbit..."]);
      setTimeout(() => navigate("/the-matrix-has-you"), 3000);
    } else if (/clear/i.test(command)) {
      // Clear command - clear state
      clearState();
      setWakeUp(true);
      setShowGreeting(false);
    } else if (/secret|hidden|shh/i.test(command)) {
      // Secret menu - rewrite display
      rewriteState(secretMenu);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (command.match(regex) || /^[^ace-zACE-Z]+$/i.test(command)) {
      // ASCII response - rewrite display
      rewriteState(asciiResponse);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (/hello:(.+)/i.test(command)) {
      // Personalization - append
      const match = command.match(/hello:(.+)/i);
      const userName = match
        ? `${match[1].trim()[0].toUpperCase()}${match[1].trim().slice(1).toLowerCase()}`
        : "Neo";
      setName(userName);
      appendToState([`Hello, ${userName}. Thanks for coming!`]);
    } else if (/repo/i.test(command)) {
      // Repository command - append
      appendToState(["Here's a random GitHub repository:"]);
      setTimeout(() => {
        window.open(
          `https://github.com/coren-frankel/${repos[Math.floor(Math.random() * repos.length)]}`,
          "_blank",
        );
      }, 3000);
    } else if (/reset/i.test(command)) {
      // Reset command - clear and reset
      setWakeUp(false);
      setShowGreeting(true);
      clearState();
    } else if ("".match(command.trim())) {
      // do nothing
      return;
    } else {
      // Unrecognized command - append
      appendToState([`Command: "${command}" not recognized`]);
    }
    setCommand("");
  };

  const menuItems = [
    "To navigate, type:",
    "'home' to go to the home page",
    "'more' to learn more about me",
    "'game' to go to my arcade",
    "'hello: <your_name>' to personalize your experience",
    "Hint: press the Enter key to execute a command",
  ];

  const secretMenu = [
    "Secret Menu:",
    "'white rabbit' to execute a secret command",
    "'clear' to clear the terminal",
    "'reset' to start the prompts from the beginning",
    "'repo' to see one of my GitHub repositories at random",
    "Send me an emoji for a surprise",
  ];

  const asciiResponse = ["(\\_/)", "( •_•)", "/> 🌺"];

  return (
    <div className="landing-page terminal" onClick={handlePageClick}>
      {/* Help Button */}
      <Button
        type="text"
        icon={<QuestionCircleOutlined />}
        className="help-button"
        onClick={(e) => {
          e.stopPropagation();
          setShowHelp(!showHelp);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "lavender",
          border: "none",
          zIndex: 1000,
        }}
        aria-label="Toggle help information"
      />

      {/* SEO Content - Hidden but accessible to search engines, or visible when help is toggled */}
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
          &apos;game&apos; to explore different sections of my portfolio. Use
          the Return or Enter key to submit commands.
        </Typography.Paragraph>
        <Typography.Title level={2} className="visually-hidden">
          Professional Software Developer Profile
        </Typography.Title>
        <Typography.Paragraph className="visually-hidden">
          Welcome to the portfolio of Coren Frankel, a passionate and dedicated
          software developer based in Denver, Colorado. With expertise spanning
          full-stack web development, modern JavaScript frameworks, and database
          management, I specialize in creating robust, scalable, and
          user-friendly applications that solve real-world problems. While I
          have a strong foundation in these areas, I am also continuously
          expanding my skill set to include new tools and technologies.
        </Typography.Paragraph>
        <Typography.Title level={3} className="visually-hidden">
          Technical Expertise and Specializations
        </Typography.Title>
        <Typography.Paragraph className="visually-hidden">
          My technical toolkit includes proficiency in React, TypeScript,
          Python, and Java. I have extensive experience with database systems
          including MySQL, PostgreSQL, and Redis, enabling me to build
          comprehensive data-driven applications. My frontend development skills
          encompass responsive design, user experience optimization, and modern
          CSS frameworks, while my backend expertise includes API development,
          server management, and cloud deployment strategies. In my current
          role, I am responsible for leading every aspect of the software
          development lifecycle, from initial conceptualization and design to
          deployment and maintenance.
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
          As a collaborative team player, I excel in both independent
          development and team environments. I have experience working with
          cross-functional teams, participating in code reviews, and mentoring
          junior developers. My communication skills allow me to effectively
          translate technical concepts for non-technical stakeholders, ensuring
          project alignment and successful delivery. I&apos;m always eager to
          learn from others and share knowledge within the development
          community. On teams I am regularly a utility player, willing to step
          into any role to help achieve our goals, even if it means tackling
          unfamiliar challenges. I embrace the opportunity to grow and adapt,
          leveraging my diverse skill set to contribute wherever I can.
        </Typography.Paragraph>
        <Typography.Title level={3} className="visually-hidden">
          Innovation and Future-Forward Thinking
        </Typography.Title>
        <Typography.Paragraph className="visually-hidden">
          I&apos;m particularly interested in emerging technologies such as
          progressive web applications and modern development tools that enhance
          productivity and user experience, but I also recognize the importance
          of established technologies and best practices. This portfolio website
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
          I am available for freelance and contract work, bringing my expertise
          in full-stack development to help businesses and individuals achieve
          their digital goals. Whether you need a custom web application,
          website enhancements, or technical consulting, I offer flexible
          solutions tailored to your needs. My approach combines technical
          proficiency with a deep understanding of user experience and business
          objectives, ensuring that every project I undertake delivers real
          value.
        </Typography.Paragraph>
        <Typography.Title level={3} className="visually-hidden">
          Connect and Collaborate
        </Typography.Title>
        <Typography.Paragraph className="visually-hidden">
          I&apos;m always open to discussing new opportunities, collaborative
          projects, or simply connecting with fellow developers and programming
          enthusiasts. Whether you&apos;re looking for a skilled developer to
          join your team, interested in collaborating on an open-source project,
          or want to discuss the latest developments in web technology, I
          welcome the opportunity to connect. Feel free to explore this
          interactive portfolio, check out my GitHub repositories, and reach out
          through any of the available channels. Let&apos;s build something
          amazing together!
        </Typography.Paragraph>
      </div>

      {/* Terminal Interface */}
      <Typography.Paragraph
        code
        className="lavender terminal-content"
        id="code"
      >
        {showGreeting && !wakeUp && (
          <TextChunk resetKey={`greeting-${animationKey}`} />
        )}
        {/* Render already displayed chunks instantly */}
        {displayedChunks.map((chunk, idx) => (
          <span key={`displayed-${idx}`} className="chunk">
            {chunk}
          </span>
        ))}
        {/* Render currently animating chunks with animation */}
        {animatingChunks.length > 0 && (
          <TextChunk
            chunks={animatingChunks}
            delay={0}
            resetKey={`animating-${animationKey}`}
            startImmediately={true}
          />
        )}
        <Input
          ref={inputRef}
          prefix={<PercentageOutlined className="lavender" />}
          style={{
            border: "none",
            backgroundColor: "#110",
            boxShadow: "none",
          }}
          autoFocus
          autoComplete="off"
          aria-autocomplete="none"
          id="command-line"
          className="lavender"
          contentEditable
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onPressEnter={() => acceptInputCommand(command)}
        />
      </Typography.Paragraph>
    </div>
  );
};

export default Landing;
