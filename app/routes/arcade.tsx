import type { MetaFunction } from "react-router";
import Arcade from "../views/Arcade";

export const meta: MetaFunction = () => {
  return [
    { title: "Arcade - Coren Frankel" },
    {
      name: "description",
      content: "Interactive games and demos by Coren Frankel",
    },
  ];
};

export default function ArcadePage() {
  return <Arcade />;
}
