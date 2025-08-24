import "../styles/Landing.css";
import { Input, Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import emojiRegex from "emoji-regex";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import TextChunk from "./TextChunk";

const regex = emojiRegex();
const repos = [
  "LookAchoo",
  "culinary-unit-abbreviation",
  "VolatilitySurf",
  "meal_picker",
];

const Landing = () => {
  const [command, setCommand] = useState("");
  const [name, setName] = useState("Neo");
  const [chunkState, setChunkState] = useState<string[]>([]);
  const [showGreeting, setShowGreeting] = useState(true);
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
        if (wakeUp) {
          setChunkState([...chunkState, `Knock knock, ${name}.`]);
          setTimeout(() => navigate("/the-matrix-has-you"), 3000);
        } else {
          setChunkState([
            ...chunkState,
            `Session terminated. Redirecting to home page... Goodbye ${name === "Neo" ? "" : name}.`,
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
  }, [chunkState, navigate, name, wakeUp]);

  // Upon 30 seconds of inactivity, load Morpheus' greeting
  useEffect(() => {
    const awake = setTimeout(() => {
      setWakeUp(true);
      setChunkState([`Wake up, ${name}...`, "The Matrix has you..."]);
    }, 30000);
    return () => clearTimeout(awake);
  }, [command, name]);

  // Home page navigation
  const acceptInputCommand = (command: string) => {
    if (/menu/i.test(command)) {
      // Menu command
      setChunkState([...chunkState, ...menuItems]);
    } else if (/about|home|arcade/i.test(command)) {
      // Literal matches for pages
      setChunkState([
        ...chunkState,
        `Redirecting to ${command[0].toUpperCase()}${command.slice(1).toLowerCase()} page...`,
      ]);
      setTimeout(() => navigate(`/${command.toLowerCase()}`), 3000);
    } else if (/game/i.test(command)) {
      // Game command
      setChunkState([...chunkState, "Redirecting to Arcade page..."]);
      setTimeout(() => navigate(`/arcade`), 3000);
    } else if (/more/i.test(command)) {
      // More command
      setChunkState([...chunkState, "Redirecting to About page..."]);
      setTimeout(() => navigate(`/about`), 3000);
    } else if (/white rabbit/i.test(command)) {
      setChunkState([...chunkState, "Follow the White Rabbit..."]);
      setTimeout(() => navigate("/the-matrix-has-you"), 3000);
    } else if (/clear/i.test(command)) {
      setChunkState([]);
      setWakeUp(true);
      setShowGreeting(false);
    } else if (/help/i.test(command)) {
      setWakeUp(false);
      setShowGreeting(true);
    } else if (/secret|hidden|shh/i.test(command)) {
      setChunkState(secretMenu);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (command.match(regex) || /^[^ace-zACE-Z]+$/i.test(command)) {
      setChunkState([...asciiResponse]);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (/hello:(.+)/i.test(command)) {
      const match = command.match(/hello:(.+)/i);
      const userName = match
        ? `${match[1].trim()[0].toUpperCase()}${match[1].trim().slice(1).toLowerCase()}`
        : "Neo";
      setName(userName);
      setChunkState([`Hello, ${userName}. Thanks for coming!`]);
    } else if (/repo/i.test(command)) {
      setChunkState([...chunkState, "Here's a random GitHub repository:"]);
      setTimeout(() => {
        window.open(
          `https://github.com/coren-frankel/${repos[Math.floor(Math.random() * repos.length)]}`,
          "_blank",
        );
      }, 3000);
    } else if (/reset/i.test(command)) {
      setWakeUp(false);
      setShowGreeting(true);
      setChunkState([]);
    } else if ("".match(command.trim())) {
      // do nothing
      return;
    } else {
      setChunkState([...chunkState, `Command: "${command}" not recognized`]);
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
    <div className="landing-page" onClick={handlePageClick}>
      <div className="terminal lavender">
        <Typography.Paragraph code className="lavender" id="code">
          {showGreeting && !wakeUp && <TextChunk />}
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
      </div>
    </div>
  );
};

export default Landing;
