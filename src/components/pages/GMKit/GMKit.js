import React, { Component, Fragment } from 'react';

import Header from '../../modules/Header/Header';
import Spacer from '../../modules/Spacer';
import Anchor from '../../modules/Anchor';
import List from '../../modules/List';
import Section from '../../modules/Section/Section';

import MAP_1 from './images/map/map1-min.png';
import MAP_2 from './images/map/map2-min.png';
import MAP_3 from './images/map/map3-min.png';
import MAP_4 from './images/map/map4-min.png';
import MAP_SELECT_1 from './images/map/mapselect1-min.png';
import MAP_SELECT_2 from './images/map/mapselect2-min.png';
import MAP_SPELL_1 from './images/map/spell1-min.png';
import MAP_SPELL_2 from './images/map/spell2-min.png';

import AUDIO_1 from './images/audio/audio1-min.png';
import AUDIO_2 from './images/audio/audio2-min.png';

import INFO_1 from './images/info/info1-min.png';

const IMAGES = {
  MAP: [
    MAP_1,
    MAP_2,
    MAP_3,
    MAP_4,
    MAP_SELECT_1,
    MAP_SELECT_2,
    MAP_SPELL_1,
    MAP_SPELL_2,
  ],
  AUDIO: [
    AUDIO_1,
    AUDIO_2,
  ],
  INFO: [
    INFO_1,
  ],
};

const MAP_REFERENCES = {
  'Battlesmaps subreddit': 'https://www.reddit.com/r/battlemaps/',
  '2 Minute Tabletop': 'https://2minutetabletop.com/',
  'Mike Schley': 'https://mikeschley.com/',
  'Jared Blando': 'https://jaredblando.com/cartography/',
  'Caeora (Blue Sword Games) Patreon': 'https://www.patreon.com/caeora',
  'Venatus Maps Patreon': 'https://www.patreon.com/venatusmaps',
  'Neutral Party Patreon': 'https://www.patreon.com/neutralparty',
};

class GMKit extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <Section>
          GM Kit is an application designed to help GMs who run games in-person with second screen digital enhancement (TV in table, projector, etc...). This app lets GMs add dynamic lighting to their maps, and manage local audio tracks.
          <Spacer />
          <a href="https://github.com/Salachar/gm-kit" rel="noreferrer" target="_blank">GM Kit code repository</a>
          <Spacer />
          Some pros of GM Kit:
          <List items={[
            'There are no accounts or sign-ins required.',
            'No information is stored or tracked anywhere aside from a small local config.json on the user\'s computer.',
            'Any image can be turned into a map with dynamic lighting by adding walls.',
            'Local audio track management and integration (I wouldn\'t say it replaces things like Spotify, but it helps supplement it).',
            'Can be used entirely offline.',
            'Grid and Spell Marker support lets guesswork be taken out of what squares/cells are affected.',
            'Simple (hopefully) to use, get up an running configuring maps within minutes.',
          ]} />
          <Spacer />
          ...and some cons:
          <List items={[
            'There are no enemy or player character tokens or trackers at the moment. The app is currently best suited for those who have non-digital minis and tokens for use on top of the virtual maps.',
            'No files are included with the software. All maps and audio must be supplied by the user.',
          ]} />
          <Spacer />
          ...and some stuff I want to add:
          <List items={[
            'Better audio management (playlists and whatnot).',
            'Continually improve the random info/name generators.',
            'Simple map maker, nothing fancy, but enough to create a simple map with recognizable terrain and auto populated walls and doors.',
          ]} />
        </Section>

        <Section header="Maps: Walls and Dynamic Lighting" images={IMAGES.MAP}>
          The app works by asking for a folder of maps when you first go to load one. This will populate a modal allowing you to see which maps have walls added to them (complete) and which ones don't (image only). Walls can easily be added to the map by drawing them on wherever you want, which are then used for the dynamic lighting on the map.
          <List items={[
            'Walls can be added anywhere for custom dynamic lighting.',
            'Doors can be added, which can be instantly opened or "dragged" open for full or partial light.',
            'One Way Walls can be created that allow all light through in one direction and completely block it in another. This helps with terrain that has height variances. Block light/visibility to the top of a cliff, but allow the top of the cliff to look down over everything.',
            'GM and Player screens can be zoomed independently.',
            'A custom Overlay Grid can be added for maps that don\'t have one or for maps where Spell/Shape markers are wanted, this grid should represent a 5\' grid system, and will be saved when the map is saved.',
            'Spell/Shape Markers can be placed (line/square/circle/cone) to mark spells and see what grid squares are affected. Spell Markers are not saved to the map and will go away between closing and opening the app. This currently requires the use of the overlay grid, as the spells use the grid to determine a 5\' square for sizing.',
          ]} />
          <Spacer />
        </Section>

        <Section header="Audio: Local Track Management and Player" images={IMAGES.AUDIO}>
          By pointing the app to a local folder of audio tracks, they will all become available to play and manage. Tracks can be searched by name or folder, and can be tagged for easier searching. Tracks can hold any number of tags, though the UI may not like it at the moment. Tracks simply loop when ended (unless looping has been turned off). Previously played tracks are saved to help when switching between tracks
          <List items={[
            'Easily view and manage a tree of local audio tracks.',
            'Collapsed sections are saved and will remain collapsed upon app relaunch.',
            'List of previously played tracks is kept to keep audio switching easier during play.',
            'Previously played tracks are saved and loaded on app launch.',
            'Tracks can be tagged for easier searching.',
            'Tracks can be searched for by using the name, tag, or folder name.',
          ]} />
        </Section>

        <Section header="Info: Random Name and Quest Generators" images={IMAGES.INFO}>
          Several small generators to help come up with names and places on the spot. Names are split between races and gender and any number can be generated at a time. Clicking on a result will mark it to remain in the list during the current app session.
        </Section>
      </Fragment>
    );
  }
}

export default GMKit;
