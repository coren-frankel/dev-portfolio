import type { MetaFunction } from "react-router";
import Matrix from "../components/Matrix";

export const meta: MetaFunction = () => {
  return [
    { title: "The Matrix Has You - Coren Frankel" },
    { name: "description", content: "Enter the Matrix..." },
  ];
};

export default function MatrixPage() {
  return <Matrix />;
}
