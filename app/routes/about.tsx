import type { MetaFunction } from "react-router";
import About from "../views/About";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Coren Frankel" },
    {
      name: "description",
      content: "Learn more about Coren Frankel's background and experience",
    },
  ];
};

export default function AboutPage() {
  return <About />;
}
