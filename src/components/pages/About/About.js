import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from '../../modules/Header/Header';
import Spacer from '../../modules/Spacer';
import Section from '../../modules/Section/Section';

function About() {
  return (
    <Fragment>
      <Header />

      <Section>
        I'm a Full Stack-ish developer with a preference and passion for Front-End. I especially enjoy canvas related things and tinkering with Electron for desktop apps.
        <Spacer />
        A good example being my <Link to="/gmkit">GM Kit</Link> project which I like to work on sometimes in my spare time. It doesn't use any real frameworks or libraries aside
        from Electron itself. I did it mostly as a challenge just to see what it's like, and as you would rightly assume, I now mostly regret it and am in the process of
        migrating it to React and Redux.
      </Section>
    </Fragment>
  );
}

export default About;
