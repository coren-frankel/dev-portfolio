import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Main from "./views/Main.tsx";
import Matrix from "./components/Matrix.tsx";
import About from "./views/About.tsx";
import Arcade from "./views/Arcade.tsx";
import NotFound from "./views/NotFound.tsx";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="home" element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="arcade" element={<Arcade />} />
        <Route path="the-matrix-has-you" element={<Matrix />} />
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
