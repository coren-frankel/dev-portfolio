import type { MetaFunction } from "react-router";
import Main from "../views/Main";

export const meta: MetaFunction = () => {
  return [
    { title: "Home - Coren Frankel" },
    {
      name: "description",
      content: "Welcome to Coren Frankel's developer portfolio",
    },
  ];
};

export default function Home() {
  return <Main />;
}
