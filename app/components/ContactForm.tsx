import { useState, useRef, useEffect } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { Turnstile } from "@marsidev/react-turnstile";
import { Form as RemixForm } from "react-router";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export interface ContactFormProps {
  siteKey: string;
  resetForm: boolean;
}

export const ContactForm = ({ siteKey, resetForm }: ContactFormProps) => {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [messageApi] = message.useMessage();

  useEffect(() => {
    if (resetForm) {
      formRef.current?.reset();
      setTurnstileToken("");
    }
  }, [resetForm]);

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "10px auto",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: 4, marginTop: 0 }}
      >
        <MailOutlined /> Get In Touch
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: 20 }}>
        Have a project in mind or want to collaborate? I&lsquo;d love to hear
        from you!
      </Paragraph>

      <RemixForm method="post" style={{ width: "100%" }} ref={formRef}>
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            Your Name *
          </label>
          <Input
            id="name"
            name="name"
            prefix={<UserOutlined />}
            placeholder="John Doe"
            size="large"
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            prefix={<MailOutlined />}
            placeholder="john@example.com"
            size="large"
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="subject"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            Subject *
          </label>
          <Input
            id="subject"
            name="subject"
            prefix={<MessageOutlined />}
            placeholder="Project collaboration, job opportunity, etc."
            size="large"
            required
            minLength={5}
            maxLength={200}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="message"
            style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}
          >
            Message *
          </label>
          <TextArea
            id="message"
            name="message"
            placeholder="Tell me about your project, idea, or how we can work together..."
            rows={6}
            size="large"
            required
            minLength={20}
            maxLength={5000}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* React Turnstile Widget */}
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              justifyContent: "center",
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
                size: "flexible",
              }}
            />
            {/* Hidden input to submit the token */}
            <input
              type="hidden"
              name="cf-turnstile-response"
              value={turnstileToken}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!turnstileToken}
              size="large"
              block
              style={{
                background: "linear-gradient(45deg, #0bd1ff, #ffa3ff)",
                border: "none",
                height: 48,
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
      </RemixForm>

      <Paragraph style={{ textAlign: "center", marginTop: 16, color: "#666" }}>
        Or reach out directly at{" "}
        <a href="mailto:dev@corenfrankel.com">dev@corenfrankel.com</a>
      </Paragraph>
    </Card>
  );
};
