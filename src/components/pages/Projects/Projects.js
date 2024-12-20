import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from '../../modules/Header/Header';
import Spacer from '../../modules/Spacer';
import Anchor from '../../modules/Anchor';
import Section from '../../modules/Section/Section';

function Projects() {
  return (
    <Fragment>
      <Header />

      <Section header="GM Kit">
        As an avid D&D player and GM, I like to bring the tech I use into the games I run. This has absolutely nothing to do with maps being
        a gigantic pain to print out and assemble. No influenced by printer ink being stupid expensive, or full page map sections taking
        forver to print... I might be getting off-topic here.
        <Spacer />
        The apps main purpose is for digitally displaying maps (with dynamic lighting) for in-person games. I use a projector as a second
        screen and project the maps down onto the table. It also works really well with the TV placed flat on the table method.
        <Spacer />
        Any image can be used and allows the user to add/draw walls onto it for dynamic lighting. Over time other small useful
        features have been added, like local audio track management and random name/info generators. It doesn't handle character or monster tokens.
        The assumption being there will still be physical minis of some sort used with the app.
        <Spacer />
        More info here: <Link to="/gmkit">GM Kit</Link>
      </Section>

      <Section header="Gravity Well Demo">
        Interesting little gravity well demo I made a long time ago when first tinkering with the HTML Canvas.
        <ul>
          <li>Gravity Wells can be placed and set to push or pull asteroids.</li>
          <li>Gravity Wells can be configured by right clicking on the center of the well.</li>
          <li>Planets can be placed and can be destroyed by asteroids, creating asteroid like chunks as it gets destroyed.</li>
          <li>Asteroids are created at the mouse position with an initial direction/velocity matching the movement of the mouse.</li>
        </ul>
        <Spacer />
        View it here: <Anchor link="https://raydav.com/gravity-well/">Gravity Well</Anchor>
      </Section>

      <Section header="Minesweeper">
        A simple minesweeper game made from scratch as part of a quick challenge with friends. Currently it's just set to super easy because watching the spaces clear is satifying. I'm sure something is missing
        that prevents it from being a real "minesweeper" game, but it's close enough.
        <Spacer />
        View it here: <Anchor link="https://raydav.com/minesweeper/">Minesweeper</Anchor>
      </Section>

      <Section header="Plex Poster Widget">
        A simple project I put together to help me make consistent media posters. Could easily be done in Photoshop (or
        similar image software), but I like making little web widgets like this.
        <Spacer />
        View it here: <Anchor link="https://raydav.com/poster-widget/">Poster Widget</Anchor>
      </Section>
    </Fragment>
  );
}

export default Projects;
