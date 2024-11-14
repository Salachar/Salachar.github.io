import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Landing from './components/pages/Landing';
import About from './components/pages/About';
import GMKit from './components/pages/GMKit';
import Projects from './components/pages/Projects';

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="gmkit" element={<GMKit />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
