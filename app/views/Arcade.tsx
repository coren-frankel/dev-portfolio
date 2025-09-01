import "../styles/Arcade.css";
import { Avatar, Card, Grid, Popover, Typography } from "antd";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { MutedOutlined, SoundTwoTone } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const { useBreakpoint } = Grid;

const Arcade = () => {
  const [isMuted] = useState(false);
  const [open, setOpen] = useState(true);
  const screens = useBreakpoint();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const warning = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(warning);
  }, []);

  // Simple mobile detection for iframe communication
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const isMobileDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const notifyIframeOfMobileState = () => {
      if (iframe.contentWindow && isMobileDevice) {
        // Simple message to inform the game about mobile state
        iframe.contentWindow.postMessage(
          {
            type: "mobileDevice",
            isMobile: true,
            touchEnabled: true,
          },
          "*",
        );
      }
    };

    iframe.addEventListener("load", notifyIframeOfMobileState);

    return () => {
      iframe.removeEventListener("load", notifyIframeOfMobileState);
    };
  }, []);

  const isMobile = () =>
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .some((screen) => ["xs", "sm"].includes(screen[0]));

  // TODO: Implement mute toggle for iframe audio output
  // const toggleMute = () => {
  // setIsMuted((prevIsMuted) => !prevIsMuted);
  // // Send a message to the iframe to toggle mute/unmute
  // if (iframeRef.current) {
  //   const message = {
  //     action: isMuted ? 'unmute' : 'mute',
  //   };
  //   iframeRef.current.contentWindow?.postMessage(message, '*');
  // }
  // };
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
                  "Heads up! Check your audio output before you click around or hover over my name. There are small sounds elicited from within the frame."
                }
              >
                <Avatar
                  icon={
                    isMuted ? (
                      <MutedOutlined />
                    ) : (
                      <SoundTwoTone twoToneColor="#FF550a" />
                    )
                  }
                  // onClick={toggleMute}
                />
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
