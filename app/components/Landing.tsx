import "../styles/Landing.css";
import { Input, Typography, Button } from "antd";
import {
  PercentageOutlined,
  QuestionCircleOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import emojiRegex from "emoji-regex";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { EmojiGenerator } from "~/utils/EmojiGenerator";
import TextChunk from "./TextChunk";
import { useMobile } from "../hooks/useMobile";
import { SEO } from "./SEO";

const generator = new EmojiGenerator();
const regex = emojiRegex();
const repos = [
  "LookAchoo",
  "culinary-unit-abbreviation",
  "VolatilitySurf",
  "meal_picker",
  "dev-portfolio",
];
const STANDARD_DELAY = 3000;

const Landing = () => {
  const [command, setCommand] = useState("");
  const [name, setName] = useState("Neo");
  const [isNamed, setIsNamed] = useState(false);
  const [displayedChunks, setDisplayedChunks] = useState<string[]>([]);
  const [animatingChunks, setAnimatingChunks] = useState<string[]>([]);
  const [showGreeting, setShowGreeting] = useState(true);
  const [wakeUp, setWakeUp] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key to force animation restart
  const isMobile = useMobile();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());

  // Utility functions for timeout management
  const addTimeout = (timeoutId: NodeJS.Timeout) => {
    timeoutRefs.current.add(timeoutId);
  };

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current.clear();
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

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
        // Soft escape for those who don't know
        const knockKnock = setTimeout(
          () => navigate("/the-matrix-has-you"),
          10000,
        );
        addTimeout(knockKnock);
        return;
      }
      if (event.key === "Escape") {
        if (wakeUp) {
          appendToState([`Knock knock, ${name}.`]);
          const matrixTimeout = setTimeout(
            () => navigate("/the-matrix-has-you"),
            STANDARD_DELAY,
          );
          addTimeout(matrixTimeout);
        } else {
          appendToState([
            `Session terminated. Redirecting to home page... Goodbye${name === "Neo" ? "" : " " + name}.`,
          ]);
          const escapeTimeout = setTimeout(
            () => navigate("/home"),
            STANDARD_DELAY,
          );
          addTimeout(escapeTimeout);
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
    addTimeout(awake);
    return () => clearTimeout(awake);
  }, [command, name]);

  // Home page navigation
  const acceptInputCommand = (command: string) => {
    // Clear any pending navigation timeouts when a new command is entered
    if (!wakeUp) clearAllTimeouts();

    if (!isNamed) {
      const userName =
        command.trim().length > 1
          ? `${command.trim()[0].toUpperCase()}${command.trim().slice(1).toLowerCase()}`
          : command.trim()[0].toUpperCase();
      setName(userName);
      setIsNamed(true);
      setShowGreeting(false);
      appendToState([
        `Hello, ${userName}. Thanks for coming!`,
        "You can type 'menu' to see some available commands",
      ]);
    } else if (/menu|help/i.test(command)) {
      // Menu command - rewrite display
      setShowGreeting(false);
      setWakeUp(false);
      rewriteState(menuItems);
    } else if (/about|home|arcade|contact/i.test(command)) {
      // Literal matches for pages - append
      appendToState([
        `Redirecting to ${command[0].toUpperCase()}${command.slice(1).toLowerCase()} page...`,
      ]);
      const navTimeout = setTimeout(
        () => navigate(`/${command.toLowerCase()}`),
        STANDARD_DELAY,
      );
      addTimeout(navTimeout);
    } else if (/talk|chat/i.test(command)) {
      // Talk command - append
      appendToState(["Redirecting to Contact page..."]);
      const contactTimeout = setTimeout(
        () => navigate(`/contact`),
        STANDARD_DELAY,
      );
      addTimeout(contactTimeout);
    } else if (/game/i.test(command)) {
      // Game command - append
      appendToState(["Redirecting to Arcade page..."]);
      const gameTimeout = setTimeout(() => navigate(`/arcade`), STANDARD_DELAY);
      addTimeout(gameTimeout);
    } else if (/name/i.test(command)) {
      // Name command - append
      appendToState(["What shall I call you?"]);
      setIsNamed(false);
    } else if (/more/i.test(command)) {
      // More command - append
      appendToState(["Redirecting to About page..."]);
      const aboutTimeout = setTimeout(() => navigate(`/about`), STANDARD_DELAY);
      addTimeout(aboutTimeout);
    } else if (/clear/i.test(command)) {
      // Clear command - clear state
      clearState();
      setWakeUp(true);
      setShowGreeting(false);
    } else if (/secret|hidden|shh|\?+/i.test(command)) {
      // Secret menu - rewrite display
      rewriteState(secretMenu);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (
      command.match(regex) ||
      /^[^ace-nq-zA-CE-NQ-Z]+$/i.test(command)
    ) {
      // ASCII response - rewrite display
      rewriteState(asciiResponse);
      setShowGreeting(false);
      setWakeUp(false);
    } else if (/repo/i.test(command)) {
      // Repository command - append
      appendToState(["Here's a random GitHub repository:"]);
      const repoTimeout = setTimeout(() => {
        window.open(
          `https://github.com/coren-frankel/${repos[Math.floor(Math.random() * repos.length)]}`,
          "_blank",
        );
      }, STANDARD_DELAY);
      addTimeout(repoTimeout);
    } else if (/reset/i.test(command)) {
      // Reset command - clear and reset
      setWakeUp(false);
      setIsNamed(false);
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

  const defaultGreeting = [
    'Hiya! I\'m Coren, but some call me "Kern".',
    "I'm a Software Developer from Denver, CO.",
    "Welcome to my personal website!",
    "What do I call you?",
  ];

  const menuItems = [
    "To navigate, type:",
    "'home' to go to the home page",
    "'more' to learn more about me",
    "'talk' to make contact with me",
    "'game' to go to my arcade",
    "Or type 'name' to set your name",
  ];

  const secretMenu = [
    "You have discovered the Secret Menu:",
    "'clear' to clear the console",
    "'reset' to start the prompts from the beginning",
    "'repo' to see one of my public GitHub repositories (in a new tab)",
    "Or send me an emoji or emoticon for a surprise",
  ];

  const asciiResponse = [
    "(\\_/)",
    "( •_•)",
    `/> ${generator.getRandomEmoji()}`,
  ];

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
      <SEO showHelp={showHelp} />

      {/* Terminal Interface */}
      <Typography.Paragraph
        code
        className="lavender terminal-content"
        id="code"
      >
        {showGreeting && !wakeUp && (
          <TextChunk
            resetKey={`greeting-${animationKey}`}
            chunks={defaultGreeting}
          />
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: isMobile ? "8px" : "0px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <Input
            ref={inputRef}
            prefix={<PercentageOutlined className="lavender" />}
            style={{
              border: "none",
              backgroundColor: "#110",
              boxShadow: "none",
              flex: 1,
              minWidth: isMobile ? "200px" : "auto",
            }}
            autoFocus={!isMobile}
            autoComplete="off"
            aria-autocomplete="none"
            id="command-line"
            className="lavender"
            contentEditable
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            onPressEnter={() => acceptInputCommand(command)}
            placeholder={isMobile ? "Type command here..." : ""}
            onDoubleClick={
              isMobile ? () => acceptInputCommand(command) : undefined
            }
          />
          {isMobile && (
            <Button
              type="primary"
              icon={<EnterOutlined />}
              onClick={() => acceptInputCommand(command)}
              style={{
                backgroundColor: "#001529",
                borderColor: "lavender",
                color: "lavender",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Execute command"
            >
              Send
            </Button>
          )}
        </div>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              onClick={() => acceptInputCommand("menu")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              Menu
            </Button>
            <Button
              size="small"
              onClick={() => acceptInputCommand("home")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              Home
            </Button>
            <Button
              size="small"
              onClick={() => acceptInputCommand("about")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              About
            </Button>
            <Button
              size="small"
              onClick={() => acceptInputCommand("contact")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              Contact
            </Button>
            <Button
              size="small"
              onClick={() => acceptInputCommand("game")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              Arcade
            </Button>
            <Button
              size="small"
              onClick={() => acceptInputCommand("clear")}
              style={{
                backgroundColor: "#001529",
                color: "lavender",
                border: "1px solid lavender",
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </Typography.Paragraph>
    </div>
  );
};

export default Landing;
