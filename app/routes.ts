import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("/about", "./routes/about.tsx"),
  route("/arcade", "./routes/arcade.tsx"),
  route("/contact", "./routes/contact.tsx"),
  route("/home", "./routes/home.tsx"),
  route("/showcase", "./routes/showcase.tsx"),
  route("/the-matrix-has-you", "./routes/the-matrix-has-you.tsx"),
  route("*", "./components/NotFound.tsx"),
] satisfies RouteConfig;
