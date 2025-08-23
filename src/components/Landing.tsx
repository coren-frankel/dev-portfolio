import "../styles/Landing.css";
import { Input, Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import TextChunk from "./TextChunk";

const Landing = () => {
  const [command, setCommand] = useState("");
  const [name, setName] = useState("Neo");
  const [chunkState, setChunkState] = useState<string[]>([]);
  const [wakeUp, setWakeUp] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);

  // Handle clicking anywhere on the landing page to focus input
  const handlePageClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        setChunkState([...chunkState, "Follow the white rabbit."]);
        const knockKnock = setTimeout(
          () => navigate("/the-matrix-has-you"),
          5000,
        );
        return () => clearTimeout(knockKnock);
      }
      if (event.key === "Escape") {
        setChunkState([...chunkState, `Knock knock, ${name}.`]);
        setTimeout(() => navigate("/the-matrix-has-you"), 3000);
      }
    };

    // Attach the event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chunkState, navigate, name]);

  // Upon 30 seconds of inactivity, load Morpheus' greeting
  useEffect(() => {
    const wakeUp = setTimeout(() => {
      setWakeUp(true);
      setChunkState([`Wake up, ${name}...`, "The Matrix has you..."]);
    }, 30000);
    return () => clearTimeout(wakeUp);
  }, [command, name]);

  // Home page navigation
  const acceptInputCommand = (command: string) => {
    if (/menu/i.test(command)) {
      // Menu command
      setChunkState([...chunkState, `% ${command}`, ...menuItems]);
    } else if (/about|home|arcade/i.test(command)) {
      // Literal matches for pages
      setChunkState([
        ...chunkState,
        `% ${command}`,
        `Redirecting to ${command[0].toUpperCase()}${command.slice(1).toLowerCase()} page...`,
      ]);
      setTimeout(() => navigate(`/${command.toLowerCase()}`), 3000);
    } else if (/game/i.test(command)) {
      // Game command
      setChunkState([
        ...chunkState,
        `% ${command}`,
        "Redirecting to Arcade page...",
      ]);
      setTimeout(() => navigate(`/arcade`), 3000);
    } else if (/more/i.test(command)) {
      // More command
      setChunkState([
        ...chunkState,
        `% ${command}`,
        "Redirecting to About page...",
      ]);
      setTimeout(() => navigate(`/about`), 3000);
    } else if (/white rabbit/i.test(command)) {
      setChunkState([...chunkState, "Follow the White Rabbit..."]);
      setTimeout(() => navigate("/the-matrix-has-you"), 3000);
    } else if (/clear/i.test(command)) {
      setChunkState([]);
    } else if (/help/i.test(command)) {
      setChunkState(defaultGreeting);
      setWakeUp(false);
    } else if (/hello:(.+)/i.test(command)) {
      const match = command.match(/hello:(.+)/i);
      const userName = match
        ? `${match[1].trim()[0].toUpperCase()}${match[1].trim().slice(1).toLowerCase()}`
        : "Neo";
      setName(userName);
      setChunkState([`Hey, ${userName}. Thanks for coming!`]);
      setWakeUp(false);
    } else if ("".match(command.trim())) {
      // do nothing
      return;
    } else {
      setChunkState([...chunkState, `Command: "${command}" not recognized`]);
    }
    setCommand("");
  };

  const defaultGreeting = [
    'Hiya! I\'m Coren, but some call me "Kern".',
    "I'm a Software Developer from Denver, CO.",
    "Welcome to my personal website!",
    "Hint: Type 'menu' & press Enter to see the Menu",
  ];

  const menuItems = [
    "Here's how to navigate:",
    "Type 'home' to go to the home page",
    "Type 'more' to learn more about me",
    "Type 'game' to go to my arcade",
    "Type 'hello: <your_name>' to personalize your experience",
  ];

  return (
    <div className="landing-page" onClick={handlePageClick}>
      <div className="terminal lavender">
        <pre>
          <Typography.Paragraph code className="lavender" id="code">
            {!wakeUp && <TextChunk chunks={defaultGreeting} />}
            <TextChunk chunks={chunkState} delay={0.01} />
            <Input
              ref={inputRef}
              prefix={<PercentageOutlined className="lavender" />}
              style={{
                border: "none",
                backgroundColor: "#110",
                boxShadow: "none",
              }}
              autoFocus
              autoComplete="none"
              aria-autocomplete="none"
              id="command-line"
              className="lavender"
              contentEditable
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onPressEnter={() => acceptInputCommand(command)}
            />
          </Typography.Paragraph>
        </pre>
      </div>
    </div>
  );
};

export default Landing;
