import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  ...(await flatRoutes()),
  route("*", "./components/NotFound.tsx"),
] satisfies RouteConfig;
