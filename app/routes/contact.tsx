import type { ActionFunctionArgs, MetaFunction } from "react-router";
import { useActionData, useLoaderData, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

import { message, Spin } from "antd";
import { ContactForm } from "../components/ContactForm";
import { Layout } from "../components/Layout";
import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

// Define action data types
type ActionData =
  | { success: true; message: string }
  | { success: false; error: string }
  | undefined;

// Define loader data types
type LoaderData = {
  turnstileSiteKey: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Coren Frankel" },
    {
      name: "description",
      content: "Get in touch with Coren Frankel for project collaborations",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",
    },
  ];
};

// Server-side loader to provide environment variables to client
export function loader() {
  return Response.json({
    turnstileSiteKey:
      process.env.TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
  });
}

// Server-side form action
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const messageText = formData.get("message") as string;
  const turnstileToken = formData.get("cf-turnstile-response") as string;

  // Validate required fields
  if (!name || !email || !subject || !messageText) {
    return Response.json(
      {
        error: "Missing required fields",
        success: false,
      },
      { status: 400 },
    );
  }

  // Verify Turnstile token
  try {
    const verifyEndpoint =
      "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(turnstileToken)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const data = (await res.json()) as TurnstileServerValidationResponse;

    if (!data.success) {
      return Response.json(
        {
          error: "Invalid security verification",
          success: false,
        },
        { status: 400 },
      );
    }
  } catch {
    return Response.json(
      {
        error: "Security verification failed",
        success: false,
      },
      { status: 500 },
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      {
        error: "Invalid email format",
        success: false,
      },
      { status: 400 },
    );
  }

  // Validate lengths
  if (name.length < 2 || name.length > 100) {
    return Response.json(
      {
        error: "Name must be between 2 and 100 characters",
        success: false,
      },
      { status: 400 },
    );
  }

  if (subject.length < 5 || subject.length > 200) {
    return Response.json(
      {
        error: "Subject must be between 5 and 200 characters",
        success: false,
      },
      { status: 400 },
    );
  }

  if (messageText.length < 20 || messageText.length > 5000) {
    return Response.json(
      {
        error: "Message must be between 20 and 5000 characters",
        success: false,
      },
      { status: 400 },
    );
  }

  // Send email via Resend
  try {
    // Import Resend only when needed to avoid global scope issues
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailData = await resend.emails.send({
      from: "Contact Form <contact@corenfrankel.com>",
      to: ["dev@corenfrankel.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0bd1ff; border-bottom: 2px solid #0bd1ff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #0bd1ff; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${messageText.replaceAll("\n", "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e8f4f8; border-radius: 5px; font-size: 12px; color: #666;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Timestamp: ${Date.now()}</p>
          </div>
        </div>
      `,
    });

    if (emailData.error) {
      return Response.json(
        {
          error: "Failed to send email",
          success: false,
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch {
    return Response.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}

export default function Contact() {
  const actionData = useActionData<ActionData>();
  const { turnstileSiteKey } = useLoaderData<LoaderData>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure component only renders on client to avoid Turnstile SSR issues
  useEffect(() => {
    setIsClient(true);
    // Detect mobile for potential UX adjustments
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show messages based on action results

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (actionData?.success && "message" in actionData) {
      messageApi.success(actionData.message);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => navigate("/home"), 3000);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (actionData && "error" in actionData) {
      messageApi.error(actionData.error);
    }
  }, [actionData, messageApi, navigate]);

  return (
    <>
      {contextHolder}
      <Layout style={{ padding: isMobile ? "0" : "0" }}>
        {isClient ? (
          <ContactForm
            siteKey={turnstileSiteKey}
            resetForm={actionData?.success || false}
          />
        ) : (
          <div
            style={{ textAlign: "center", padding: isMobile ? "20px" : "50px" }}
          >
            <Spin size="large" />
            <p
              style={{
                marginTop: "20px",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              Loading contact form...
            </p>
          </div>
        )}
      </Layout>
    </>
  );
}
