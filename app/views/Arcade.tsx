import "../styles/Arcade.css";
import { Avatar, Card, Grid, Popover, Typography } from "antd";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { MutedOutlined, SoundTwoTone } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const { useBreakpoint } = Grid;

const Arcade = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [open, setOpen] = useState(true);
  const screens = useBreakpoint();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Define the trusted origin for your iframe
  const TRUSTED_ORIGIN = "https://coren-frankel.github.io";

  useEffect(() => {
    if (open) {
      const warning = setTimeout(() => setOpen(false), 5000);
      return () => clearTimeout(warning);
    }
  }, [open]);

  // Enhanced iframe communication for mobile state and audio control
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const isMobileDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Handle messages from the iframe
    const handleIframeMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== TRUSTED_ORIGIN) return;

      // Handle audio state updates from the iframe
      if (event.data.type === "audioStateUpdate") {
        setIsMuted(event.data.muted);
      }
    };

    const notifyIframeOfInitialState = () => {
      if (iframe.contentWindow) {
        // Send initial mobile state
        iframe.contentWindow.postMessage(
          {
            type: "mobileDevice",
            isMobile: isMobileDevice,
            touchEnabled: true,
          },
          TRUSTED_ORIGIN,
        );

        // Send initial audio state
        iframe.contentWindow.postMessage(
          {
            type: "audioControl",
            action: isMuted ? "mute" : "unmute",
            muted: isMuted,
          },
          TRUSTED_ORIGIN,
        );
      }
    };

    // Listen for messages from iframe
    window.addEventListener("message", handleIframeMessage);
    iframe.addEventListener("load", notifyIframeOfInitialState);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
      iframe.removeEventListener("load", notifyIframeOfInitialState);
    };
  }, [isMuted]);

  const isMobile = () =>
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .some((screen) => ["xs", "sm"].includes(screen[0]));

  // Simplified mute toggle - focuses on what actually works with cross-origin iframes
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Primary approach: Send postMessage to iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const message = {
        type: "audioControl",
        action: newMutedState ? "mute" : "unmute",
        muted: newMutedState,
      };

      iframeRef.current.contentWindow.postMessage(message, TRUSTED_ORIGIN);
      // oxlint-disable-next-line no-console
      console.log(
        `📨 Sent ${newMutedState ? "MUTE" : "UNMUTE"} message to iframe`,
      );
    }

    // Fallback: Try to access iframe audio elements (only works if same-origin)
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const audioElements =
          iframeRef.current.contentDocument.querySelectorAll("audio, video");

        if (audioElements.length > 0) {
          audioElements.forEach((element: any) => {
            element.muted = newMutedState;
            element.volume = newMutedState ? 0 : 1;
          });
          // oxlint-disable-next-line no-console
          console.log(
            `🎵 Directly controlled ${audioElements.length} audio elements`,
          );
        } else {
          // oxlint-disable-next-line no-console
          console.log("ℹ️ No audio/video elements found in iframe");
        }
      }
    } catch {
      // oxlint-disable-next-line no-console
      console.error(
        "⚠️ Cannot access iframe content (cross-origin restriction) - Game must handle postMessage",
      );
    }
  };
  return (
    <Layout style={{ padding: "0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          height: "100%",
          width: "100%",
        }}
      >
        <Card
          style={{
            backgroundColor: "lavender",
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            margin: 0,
            borderRadius: 0,
          }}
          styles={{
            body: {
              padding: isMobile() ? "12px" : "16px",
              flex: "0 0 auto",
            },
          }}
          cover={
            <div
              style={{
                position: "relative",
                width: "100%",
                height: `calc(100vh - ${isMobile() ? "200px" : "220px"})`,
                minHeight: isMobile() ? "300px" : "400px",
              }}
            >
              <iframe
                ref={iframeRef}
                title="NinjaSweeper"
                src="https://coren-frankel.github.io/NinjaSweeper/"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "0",
                }}
                allow="fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          }
        >
          <Card.Meta
            title="Welcome to Kern's Arcade"
            avatar={
              <Popover
                open={open}
                content={
                  <div style={{ marginBottom: "8px" }}>
                    Heads up! There are some small sounds effects elicited from
                    within the frame. Check your audio output before you click
                    around or hover over my name on this embedded page.
                  </div>
                }
              >
                <span onMouseEnter={() => setOpen(true)}>
                  <Avatar
                    icon={
                      isMuted ? (
                        <MutedOutlined />
                      ) : (
                        <SoundTwoTone twoToneColor="#dc6532ff" />
                      )
                    }
                    onClick={toggleMute}
                    className="arcade-audio-control"
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </Popover>
            }
            description={
              <div>
                <Typography.Paragraph
                  style={{
                    fontSize: isMobile() ? "14px" : "16px",
                    margin: 0,
                  }}
                >
                  For now, Kern&apos;s Arcade only features this Minesweeper
                  clone that I created with vanilla JavaScript, HTML, & CSS.
                  Check out the code{" "}
                  <Link to="https://github.com/coren-frankel/NinjaSweeper?tab=readme-ov-file#ninjasweeper">
                    here
                  </Link>
                </Typography.Paragraph>
                {isMobile() && (
                  <Typography.Text
                    style={{
                      fontSize: "11px",
                      color: "#666",
                      fontStyle: "italic",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    💡 Mobile tip: Long press on squares to flag mines
                  </Typography.Text>
                )}
              </div>
            }
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Arcade;
