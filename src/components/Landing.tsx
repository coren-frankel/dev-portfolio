import "../styles/Landing.css";
import { Input, Typography } from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TextChunk from "./TextChunk";

const Landing = () => {
  const [command, setCommand] = useState("");
  const [chunkState, setChunkState] = useState<string[]>([]);
  const [wakeUp, setWakeUp] = useState(false);
  const navigate = useNavigate();

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
        setChunkState([...chunkState, "Follow the White Rabbit..."]);
        setTimeout(() => navigate("/the-matrix-has-you"), 3000);
      }
    };

    // Attach the event listener when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chunkState, navigate]);

  // Upon 30 seconds of inactivity, load Morpheus' greeting
  useEffect(() => {
    const wakeUp = setTimeout(() => {
      setWakeUp(true);
      setChunkState(["Wake up, Neo...", "The Matrix has you..."]);
    }, 30000);
    return () => clearTimeout(wakeUp);
  }, [command]);

  // Home page navigation
  const acceptInputCommand = useCallback(
    (command: string) => {
      if (/about|contact|home|arcade/i.test(command)) {
        setChunkState([...chunkState, `% ${command}`]);
        setChunkState([
          ...chunkState,
          `Redirecting to ${command[0].toUpperCase()}${command.slice(1).toLowerCase()} page...`,
        ]);
        setTimeout(() => navigate(`/${command.toLowerCase()}`), 1500);
      } else if (/white rabbit/i.test(command)) {
        setChunkState([...chunkState, "Follow the White Rabbit..."]);
        setTimeout(() => navigate("/the-matrix-has-you"), 3000);
      } else if (/clear/i.test(command)) {
        setChunkState([]);
      } else if (/help/i.test(command)) {
        setChunkState([]);
        setWakeUp(false);
      } else {
        setChunkState([...chunkState, `Command: "${command}" not recognized`]);
      }
      setCommand("");
    },
    [chunkState, navigate],
  );

  return (
    <div className="landing-page">
      <div className="terminal lavender">
        <pre>
          <Typography.Paragraph code className="lavender" id="code">
            {!wakeUp && <TextChunk />}
            <TextChunk chunks={chunkState} delay={0.01} />
            <Input
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
