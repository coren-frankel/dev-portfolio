import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import Main from './components/Main.tsx';
import Matrix from './components/Matrix.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="home" element={<Main />} />
        <Route path="thematrixhasyou" element={<Matrix />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
