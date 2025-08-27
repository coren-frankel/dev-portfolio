import type { MetaFunction } from "react-router";
import Landing from "../components/Landing";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "Coren Frankel: Software Developer | TypeScript, Python, React, SQL",
    },
    {
      name: "description",
      content:
        "Coren Frankel's portfolio showcasing expertise in full-stack software development, React, TypeScript, and many other modern web technologies.",
    },
    {
      name: "keywords",
      content:
        "Coren Frankel, Software Developer, Full-Stack Developer, React, TypeScript, JavaScript, Python, MySQL, PostgreSQL, Redis, Portfolio, Web Development",
    },
    { name: "author", content: "Coren Frankel" },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content:
        "Coren Frankel: Software Developer | TypeScript, Python, React, SQL",
    },
    {
      property: "og:description",
      content:
        "Explore Coren Frankel's portfolio featuring projects and skills in full-stack development, React, and TypeScript.",
    },
    { property: "og:image", content: "/cover_photo.png" },
    { property: "og:url", content: "https://corenfrankel.dev" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Coren Frankel: Software Developer | TypeScript, Python, React, SQL",
    },
    {
      name: "twitter:description",
      content:
        "Discover Coren Frankel's portfolio showcasing full-stack development expertise.",
    },
    { name: "twitter:image", content: "/cover_photo.png" },
  ];
};

export default function Index() {
  return <Landing />;
}
