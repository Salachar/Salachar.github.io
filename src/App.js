import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Landing from './components/pages/Landing';
import About from './components/pages/About';
import GMKit from './components/pages/GMKit';
import Projects from './components/pages/Projects';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/gmkit">
          <GMKit />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
