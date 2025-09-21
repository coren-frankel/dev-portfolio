import {
  Card,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  Image,
  Skeleton,
} from "antd";
import { useState } from "react";

const techList = [
  {
    name: "React 19 & TypeScript",
    description:
      "Modern React with latest hooks and TypeScript for type-safe component development.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=react,ts&perline=2&theme=auto",
    altText: "React, TypeScript",
    code: `// Real example from Landing.tsx - Animated text chunks with state management
const [animatingChunks, setAnimatingChunks] = useState<string[]>([]);
const [displayedChunks, setDisplayedChunks] = useState<string[]>([]);

const appendToState = useCallback(
  (newChunks: string[]) => {
    setDisplayedChunks((prev) => [...prev, ...animatingChunks]);
    setAnimatingChunks(newChunks);
    setAnimationKey((prev) => prev + 1);
  },
  [animatingChunks],
);`,
    file: "app/components/Landing.tsx",
  },
  {
    name: "React Spring Parallax",
    description:
      "Advanced parallax scrolling with React Spring for immersive user experiences.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=react&perline=1&theme=auto",
    altText: "React Spring",
    code: `// Real example from Main.tsx - Multi-layer parallax with responsive image placement
<ParallaxLayer offset={2.3} speed={-0.1} style={{ opacity: 0.4 }}>
  <img
    src={bushes}
    width={"10%"}
    className="block"
    style={{ marginLeft: "20%" }}
  />
  <img
    src={tree}
    width={"20%"}
    className="block"
    style={{ marginLeft: "60%" }}
  />
</ParallaxLayer>`,
    file: "app/views/Main.tsx",
  },
  {
    name: "Resend Email Service",
    description:
      "Modern email delivery with HTML templates and dynamic import for serverless optimization.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=nodejs&perline=1&theme=auto",
    altText: "Resend",
    code: `// Real example from contact.tsx - Dynamic email sending with HTML templates
// Import Resend only when needed to avoid global scope issues
const { Resend } = await import("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const emailData = await resend.emails.send({
  from: "Contact Form <contact@corenfrankel.com>",
  to: ["dev@corenfrankel.com"],
  replyTo: email,
  subject: \`Portfolio Contact: \${subject}\`,
  html: \`
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0bd1ff; border-bottom: 2px solid #0bd1ff;">
        New Contact Form Submission
      </h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> \${name}</p>
        <p><strong>Email:</strong> \${email}</p>
        <p><strong>Subject:</strong> \${subject}</p>
      </div>
    </div>
  \`
});`,
    file: "app/routes/contact.tsx",
  },
  {
    name: "Ant Design System",
    description:
      "Enterprise UI components with responsive design and advanced interactions.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=antdesign&perline=1&theme=auto",
    altText: "Ant Design",
    code: `// Real example from ContactForm.tsx - Mobile-optimized form with Turnstile
const cardStyle = {
  maxWidth: isMobile ? "95%" : 600,
  margin: isMobile ? "5px auto" : "10px auto",
  background: "rgba(255, 255, 255, 0.75)",
  backdropFilter: "blur(10px)",
  padding: isMobile ? "16px" : "24px",
};

<Card style={cardStyle}>
  <Turnstile siteKey={siteKey} onSuccess={setTurnstileToken} />
</Card>`,
    file: "app/components/ContactForm.tsx",
  },
  {
    name: "JSON-Driven Architecture",
    description:
      "Modular data structures for maintainable, scalable component systems.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=json&perline=1&theme=auto",
    altText: "JSON",
    code: `// Real example from skillsData.json - Responsive skill configuration
{
  "id": "skills-1",
  "title": "Programming & Query Languages",
  "iconUrl": "https://go-skill-icons.vercel.app/api/icons?i=md,html,css,js,ts",
  "perlineConfig": {
    "mobile": 3,
    "tablet": 4,
    "desktop": 4
  }
}

// Usage in Main.tsx
const getSkillIconUrl = (skill) => {
  const perline = getResponsiveValue(
    skill.perlineConfig.mobile,
    skill.perlineConfig.tablet,
    skill.perlineConfig.desktop,
  );
  return \`\${skill.iconUrl}&perline=\${perline}&theme=auto\`;
};`,
    file: "app/data/skillsData.json",
  },
  {
    name: "Cloudflare Turnstile",
    description:
      "Privacy-focused bot protection integrated with React forms and server validation.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=cloudflare&perline=1&theme=auto",
    altText: "Cloudflare",
    code: `// Real example from contact.tsx - Server-side Turnstile validation
const turnstileValidation = await fetch(
  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: request.headers.get("CF-Connecting-IP"),
    }),
  }
);

const turnstileData: TurnstileServerValidationResponse = 
  await turnstileValidation.json();

if (!turnstileData.success) {
  return { success: false, error: "Bot verification failed" };
}`,
    file: "app/routes/contact.tsx",
  },
  {
    name: "Secure Iframe Communication",
    description:
      "Cross-origin postMessage with origin validation for iframe audio control.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=js&perline=1&theme=auto",
    altText: "JavaScript",
    code: `// Real example from Arcade.tsx - Secure iframe messaging
const TRUSTED_ORIGIN = "https://coren-frankel.github.io";

const handleIframeMessage = (event: MessageEvent) => {
  // Security: Verify origin before processing
  if (event.origin !== TRUSTED_ORIGIN) return;
  
  if (event.data.type === "audioStateUpdate") {
    setIsMuted(event.data.muted);
  }
};

// Send secure messages with specific origin
iframe.contentWindow.postMessage({
  type: "audioControl",
  action: newMutedState ? "mute" : "unmute",
  muted: newMutedState,
}, TRUSTED_ORIGIN);`,
    file: "app/views/Arcade.tsx",
  },
  {
    name: "Advanced Animation System",
    description:
      "Character-by-character text animation with dynamic delay calculations.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=css,js&perline=2&theme=auto",
    altText: "CSS, JavaScript",
    code: `// Real example from TextChunk.tsx - Staggered character animation
{chunk.split("").map((char, idx) => (
  <span
    key={\`char-\${resetKey}-\${chunkIdx}-\${idx}\`}
    className="inline"
    style={{
      animationDelay: \`\${chunkDelay + idx * 0.025}s\`,
    }}
  >
    {char}
  </span>
))}

/* CSS animation */
.inline {
  animation: fade-in 0.01s linear;
  animation-fill-mode: forwards;
  opacity: 0;
}`,
    file: "app/components/TextChunk.tsx",
  },
  {
    name: "Animated Layout System",
    description:
      "Dynamic gradient backgrounds with React Spring and easing coordinates.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=react,css&perline=2&theme=auto",
    altText: "React Spring, CSS",
    code: `// Real example from Layout.tsx - Dynamic gradient animations
const { colorFrom, colorMid, colorTo } = useSpring({
  colorFrom: "#0bd1ff",
  colorMid: "#ffa3ff", 
  colorTo: "#ffd34e",
});

const coordinates = stepsCoordinates(STOPS, "skip-none");
const allStops = interpolate(
  [colorFrom, colorMid, colorTo],
  (from, mid, to) => {
    const blend = createInterpolator({
      range: [0, 0.5, 1],
      output: [from, mid, to],
    });
    return coordinates.map(({ x, y }) => {
      const color = blend(y);
      return \`\${color} \${x * 100}%\`;
    });
  },
);`,
    file: "app/components/Layout.tsx",
  },
  {
    name: "React Router v7 SSR",
    description:
      "Full-stack React with server-side rendering, actions, and file-based routing.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=react&perline=1&theme=auto",
    altText: "React Router",
    code: `// Real example from contact.tsx - Server actions with form handling
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const messageText = formData.get("message") as string;
  
  // Validation
  if (!name || !email || !subject || !messageText) {
    return { 
      success: false, 
      error: "All fields are required" 
    };
  }
  
  // Process form and return response
  return { 
    success: true, 
    message: "Message sent successfully!" 
  };
}`,
    file: "app/routes/contact.tsx",
  },
  {
    name: "Responsive Design System",
    description:
      "Mobile-first responsive design with Ant Design Grid and custom breakpoints.",
    iconUrl:
      "https://go-skill-icons.vercel.app/api/icons?i=css,html&perline=2&theme=auto",
    altText: "CSS, HTML",
    code: `// Real example from Main.tsx - Responsive helper functions
const screens = useBreakpoint();
const isMobile = screens.xs || screens.sm;
const isTablet = screens.md;

const getResponsiveValue = (mobile: any, tablet: any, desktop: any) => {
  if (isMobile) return mobile;
  if (isTablet) return tablet;
  return desktop;
};

// Usage throughout components
style={{ 
  marginLeft: getResponsiveValue("20%", "22%", "25%"),
  width: getResponsiveValue("25%", "28%", "30%")
}}`,
    file: "app/views/Main.tsx",
  },
];

// Additional tools and packages used in the project
const otherTools = [
  {
    category: "📦 Package Management",
    tools: [
      {
        name: "pnpm",
        description: "Fast, disk space efficient package manager",
        icon: "pnpm",
      },
      {
        name: "npm",
        description: "Node package manager for dependencies",
        icon: "npm",
      },
    ],
  },
  {
    category: "🔧 Development Tools",
    tools: [
      {
        name: "Vite",
        description: "Fast build tool and development server",
        icon: "vite",
      },
      {
        name: "TypeScript",
        description: "Strongly typed programming language",
        icon: "ts",
      },
      {
        name: "Oxlint",
        description: "50-100x faster linter than ESLint",
        icon: "rust",
      },
      {
        name: "Prettier",
        description: "Opinionated code formatter",
        icon: "prettier",
      },
    ],
  },
  {
    category: "🔀 Version Control & CI/CD",
    tools: [
      {
        name: "Git",
        description: "Distributed version control system",
        icon: "git",
      },
      {
        name: "GitHub",
        description: "Code hosting and collaboration platform",
        icon: "github",
      },
      { name: "Husky", description: "Git hooks made easy", icon: "git" },
      {
        name: "lint-staged",
        description: "Run linters on staged files",
        icon: "git",
      },
    ],
  },
  {
    category: "📋 Code Quality",
    tools: [
      { name: "Commitlint", description: "Lint commit messages", icon: "git" },
      {
        name: "tsc-files",
        description: "TypeScript compiler for individual files",
        icon: "ts",
      },
      {
        name: "ESLint Config",
        description: "Conventional commit message format",
        icon: "eslint",
      },
    ],
  },
  {
    category: "☁️ Cloud & Deployment",
    tools: [
      {
        name: "Cloudflare Workers",
        description: "Serverless edge computing platform",
        icon: "cloudflare",
      },
      {
        name: "Wrangler",
        description: "Cloudflare Workers CLI tool",
        icon: "cloudflare",
      },
      {
        name: "Cloudflare Turnstile",
        description: "Privacy-preserving bot protection",
        icon: "cloudflare",
      },
    ],
  },
  {
    category: "📧 Email & Communication",
    tools: [
      {
        name: "Resend",
        description: "Modern email API for developers",
        icon: "nodejs",
      },
      {
        name: "React Turnstile",
        description: "React wrapper for Cloudflare Turnstile",
        icon: "react",
      },
    ],
  },
  {
    category: "🎨 UI & Animation",
    tools: [
      {
        name: "Ant Design Icons",
        description: "Rich set of icon components",
        icon: "antdesign",
      },
      {
        name: "React Spring",
        description: "Spring-physics based animation library",
        icon: "react",
      },
      {
        name: "Easing Coordinates",
        description: "Easing function coordinate generation",
        icon: "js",
      },
    ],
  },
  {
    category: "🔧 Utilities",
    tools: [
      {
        name: "isbot",
        description: "Detect bots and crawlers",
        icon: "nodejs",
      },
      {
        name: "emoji-regex",
        description: "Regular expression for matching emoji",
        icon: "regex",
      },
    ],
  },
];

const TechShowcase = () => {
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageLoad = (techName: string) => {
    setImageLoading((prev) => ({ ...prev, [techName]: false }));
  };

  const handleImageLoadStart = (techName: string) => {
    setImageLoading((prev) => ({ ...prev, [techName]: true }));
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Typography.Title level={2} style={{ color: "lavender" }}>
            🚀 Tech Stack & Feature Showcase for This Website
          </Typography.Title>
          <Typography.Paragraph type="warning">
            Note: This page is a work in progress... 🚧
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{
              color: "lavender",
              fontSize: "16px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Dive into the real code that powers this portfolio! From advanced
            animations to secure iframe communications, each example below
            showcases actual implementations from the codebase with their
            corresponding technologies.
          </Typography.Paragraph>
        </div>
        <Divider />
        <Row gutter={[24, 24]}>
          {techList.map((tech) => (
            <Col xs={24} lg={12} xl={8} key={tech.name}>
              <Card
                title={
                  <Space align="center">
                    {tech.iconUrl && (
                      <div
                        style={{
                          minWidth: "60px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {imageLoading[tech.name] && (
                          <Skeleton.Avatar
                            size="small"
                            active
                            style={{ width: "60px", height: "30px" }}
                          />
                        )}
                        <Image
                          src={tech.iconUrl}
                          alt={tech.altText}
                          preview={false}
                          style={{
                            maxHeight: "30px",
                            display: imageLoading[tech.name] ? "none" : "block",
                          }}
                          onLoad={() => handleImageLoad(tech.name)}
                          onLoadStart={() => handleImageLoadStart(tech.name)}
                        />
                      </div>
                    )}
                    <Typography.Text strong style={{ fontSize: "16px" }}>
                      {tech.name}
                    </Typography.Text>
                  </Space>
                }
                style={{
                  minHeight: 420,
                  height: "100%",
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Space direction="vertical" style={{ flex: 1 }}>
                  <Typography.Paragraph
                    style={{ fontSize: "14px", lineHeight: "1.6" }}
                  >
                    {tech.description}
                  </Typography.Paragraph>

                  <div style={{ flex: 1 }}>
                    <Typography.Text
                      strong
                      style={{ fontSize: "13px", color: "#666" }}
                    >
                      📁 {tech.file}
                    </Typography.Text>
                    <Typography.Text
                      code
                      style={{
                        display: "block",
                        whiteSpace: "pre-wrap",
                        background: "#f6f8fa",
                        padding: "12px",
                        borderRadius: 6,
                        fontSize: "12px",
                        lineHeight: "1.4",
                        marginTop: "8px",
                        border: "1px solid #e1e4e8",
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    >
                      {tech.code}
                    </Typography.Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: "40px 0" }} />

        {/* Other Tools & Packages Section */}
        <div style={{ textAlign: "center" }}>
          <Typography.Title level={3} style={{ marginBottom: "24px" }}>
            🛠️ Other Tools & Packages
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: "16px",
              maxWidth: "800px",
              margin: "0 auto 32px",
            }}
          >
            Supporting technologies and tools that power the development
            workflow, from package management to deployment.
          </Typography.Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {otherTools.map((category) => (
            <Col xs={24} md={12} lg={8} key={category.category}>
              <Card
                title={category.category}
                style={{
                  height: "100%",
                  border: "1px solid #e8e8e8",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <Image
                        src={`https://go-skill-icons.vercel.app/api/icons?i=${tool.icon}&perline=1&theme=auto`}
                        alt={tool.name}
                        preview={false}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjEwIiB5PSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPj88L3RleHQ+Cjwvc3ZnPg=="
                      />
                      <div style={{ flex: 1 }}>
                        <Typography.Text
                          strong
                          style={{ fontSize: "14px", display: "block" }}
                        >
                          {tool.name}
                        </Typography.Text>
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: "12px" }}
                        >
                          {tool.description}
                        </Typography.Text>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: "40px 0" }} />

        <div
          style={{
            textAlign: "center",
            background: "#f8f9fa",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <Typography.Title level={3} style={{ marginBottom: "16px" }}>
            🛠️ Development Highlights
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Typography.Text strong>🎨 UI Framework</Typography.Text>
              <Typography.Paragraph
                style={{ fontSize: "14px", margin: "4px 0" }}
              >
                Ant Design + Custom CSS
              </Typography.Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Typography.Text strong>⚡ Build Tool</Typography.Text>
              <Typography.Paragraph
                style={{ fontSize: "14px", margin: "4px 0" }}
              >
                Vite + React Router v7
              </Typography.Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Typography.Text strong>🔧 Linting</Typography.Text>
              <Typography.Paragraph
                style={{ fontSize: "14px", margin: "4px 0" }}
              >
                Oxlint (50-100x faster)
              </Typography.Paragraph>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Typography.Text strong>☁️ Deployment</Typography.Text>
              <Typography.Paragraph
                style={{ fontSize: "14px", margin: "4px 0" }}
              >
                Cloudflare Workers
              </Typography.Paragraph>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  );
};

export default TechShowcase;
