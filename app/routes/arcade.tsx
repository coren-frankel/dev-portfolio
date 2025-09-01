import type { MetaFunction } from "react-router";
import Arcade from "../views/Arcade";

export const meta: MetaFunction = () => {
  return [
    { title: "Arcade - Coren Frankel" },
    {
      name: "description",
      content: "Interactive games and demos by Coren Frankel",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover",
    },
  ];
};

export default function ArcadePage() {
  return <Arcade />;
}
