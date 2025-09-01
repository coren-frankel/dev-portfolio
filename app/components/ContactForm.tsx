import { useState, useRef, useEffect } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { Turnstile } from "@marsidev/react-turnstile";
import { Form as RemixForm } from "react-router";
import { useMobile } from "../hooks/useMobile";
import "../styles/ContactForm.css";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export interface ContactFormProps {
  siteKey: string;
  resetForm: boolean;
}

export const ContactForm = ({ siteKey, resetForm }: ContactFormProps) => {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [messageLength, setMessageLength] = useState(0);
  const turnstileRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [messageApi] = message.useMessage();
  const isMobile = useMobile();

  useEffect(() => {
    if (resetForm) {
      formRef.current?.reset();
      setTurnstileToken("");
    }
  }, [resetForm]);

  // Mobile-optimized styles
  const cardStyle = {
    maxWidth: isMobile ? "95%" : 600,
    margin: isMobile ? "5px auto" : "10px auto",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(10px)",
    padding: isMobile ? "16px" : "24px",
  };

  const inputSize = isMobile ? "middle" : "large";
  const buttonHeight = isMobile ? 44 : 48;

  return (
    <Card style={cardStyle} className="contact-form">
      <Title
        level={isMobile ? 2 : 1}
        style={{
          textAlign: "center",
          marginBottom: 4,
          marginTop: 0,
          fontSize: isMobile ? "20px" : "32px",
        }}
      >
        <MailOutlined /> Get In Touch
      </Title>
      <Paragraph
        style={{
          textAlign: "center",
          marginBottom: 20,
          fontSize: isMobile ? "14px" : "16px",
          padding: isMobile ? "0 8px" : "0",
        }}
      >
        Have a project in mind or want to collaborate? I&lsquo;d love to hear
        from you!
      </Paragraph>

      {isMobile && (
        <div
          style={{
            background: "rgba(11, 209, 255, 0.1)",
            border: "1px solid rgba(11, 209, 255, 0.3)",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "16px",
            fontSize: "13px",
            color: "#0bd1ff",
          }}
        >
          📱 <strong>Mobile Tip:</strong> All fields are required. Complete the
          security check below to enable the Send button.
        </div>
      )}

      <RemixForm method="post" style={{ width: "100%" }} ref={formRef}>
        <div style={{ marginBottom: isMobile ? 12 : 16 }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: isMobile ? 6 : 8,
              fontWeight: "bold",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Your Name *
          </label>
          <Input
            id="name"
            name="name"
            prefix={<UserOutlined />}
            placeholder="John Doe"
            size={inputSize}
            required
            minLength={2}
            maxLength={100}
            style={{ fontSize: isMobile ? "16px" : "14px" }} // Prevent iOS zoom
          />
        </div>

        <div style={{ marginBottom: isMobile ? 12 : 16 }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: isMobile ? 6 : 8,
              fontWeight: "bold",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            prefix={<MailOutlined />}
            placeholder="john@example.com"
            size={inputSize}
            required
            style={{ fontSize: isMobile ? "16px" : "14px" }} // Prevent iOS zoom
          />
        </div>

        <div style={{ marginBottom: isMobile ? 12 : 16 }}>
          <label
            htmlFor="subject"
            style={{
              display: "block",
              marginBottom: isMobile ? 6 : 8,
              fontWeight: "bold",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Subject *
          </label>
          <Input
            id="subject"
            name="subject"
            prefix={<MessageOutlined />}
            placeholder={
              isMobile
                ? "Project, job opportunity..."
                : "Project collaboration, job opportunity, etc."
            }
            size={inputSize}
            required
            minLength={5}
            maxLength={200}
            style={{ fontSize: isMobile ? "16px" : "14px" }} // Prevent iOS zoom
          />
        </div>

        <div style={{ marginBottom: isMobile ? 12 : 16 }}>
          <label
            htmlFor="message"
            style={{
              display: "block",
              marginBottom: isMobile ? 6 : 8,
              fontWeight: "bold",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Message *
          </label>
          <TextArea
            id="message"
            name="message"
            placeholder={
              isMobile
                ? "Tell me about your project or idea..."
                : "Tell me about your project, idea, or how we can work together..."
            }
            rows={isMobile ? 4 : 6}
            size={inputSize}
            required
            minLength={20}
            maxLength={5000}
            onChange={(e) => setMessageLength(e.target.value.length)}
            style={{
              fontSize: isMobile ? "16px" : "14px", // Prevent iOS zoom
              resize: isMobile ? "none" : "vertical", // Prevent resize issues on mobile
            }}
          />
          {isMobile && (
            <div
              style={{
                textAlign: "right",
                fontSize: "12px",
                color:
                  messageLength < 20
                    ? "#ff4d4f"
                    : messageLength > 4500
                      ? "#faad14"
                      : "#52c41a",
                marginTop: "4px",
              }}
            >
              {messageLength}/5000 characters{" "}
              {messageLength < 20 && "(minimum 20)"}
            </div>
          )}
        </div>

        <div
          className="contact-form-actions"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? 16 : 10,
            marginBottom: 16,
          }}
        >
          {/* React Turnstile Widget */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-start",
              alignItems: "center",
              order: isMobile ? 2 : 1,
            }}
          >
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => {
                setTurnstileToken("");
                messageApi.error(
                  "Security verification failed. Please try again.",
                );
              }}
              onExpire={() => {
                setTurnstileToken("");
              }}
              options={{
                size: isMobile ? "compact" : "normal",
                theme: "light",
              }}
            />
            {/* Hidden input to submit the token */}
            <input
              type="hidden"
              name="cf-turnstile-response"
              value={turnstileToken}
            />
          </div>

          <div
            style={{
              order: isMobile ? 1 : 2,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!turnstileToken}
              size={inputSize}
              block={isMobile}
              style={{
                background: "linear-gradient(45deg, #0bd1ff, #ffa3ff)",
                border: "none",
                height: buttonHeight,
                fontSize: isMobile ? "16px" : "14px",
                fontWeight: "bold",
                minWidth: isMobile ? "100%" : "140px",
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
      </RemixForm>

      <Paragraph
        style={{
          textAlign: "center",
          marginTop: 16,
          color: "#666",
          fontSize: isMobile ? "12px" : "14px",
          padding: isMobile ? "0 8px" : "0",
        }}
      >
        Or reach out directly at{" "}
        <a
          href="mailto:dev@corenfrankel.com"
          style={{
            color: "#0bd1ff",
            textDecoration: "none",
          }}
        >
          dev@corenfrankel.com
        </a>
      </Paragraph>
    </Card>
  );
};
