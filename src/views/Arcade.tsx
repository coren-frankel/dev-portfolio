import { Avatar, Card, Popover, Typography } from "antd";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { MutedOutlined, SoundTwoTone } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const Arcade = () => {
  const [isMuted] = useState(false);
  const [open, setOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const warning = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(warning);
  }, []);

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
    <Layout>
      <Card
        style={{
          backgroundColor: "lavender",
        }}
        cover={
          <iframe
            ref={iframeRef}
            title="NinjaSweeper"
            src="https://coren-frankel.github.io/NinjaSweeper/"
            height="650"
            sandbox="allow-scripts allow-forms"
          />
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
                onClick={toggleMute}
              />
            </Popover>
          }
          description={
            <Typography.Paragraph>
              For now, Kern&apos;s Arcade only features this Minesweeper clone
              that I created with vanilla JavaScript, HTML, & CSS. Check out the
              code{" "}
              <Link to="https://github.com/coren-frankel/NinjaSweeper?tab=readme-ov-file#ninjasweeper">
                here
              </Link>
            </Typography.Paragraph>
          }
        />
      </Card>
    </Layout>
  );
};

export default Arcade;
