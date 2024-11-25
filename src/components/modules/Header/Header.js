import React from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

import styles from './Header.module.css';

const RESUME_LINK = "https://docs.google.com/document/d/1aTujwNc_y6BLQmkewbEnFPGCXxLqKoo3BUKjNjLdmNo";

function Header() {
  const location = useLocation();
  const { pathname } = location;

  const links = {
    'About': '/about',
    'GM Kit': '/gmkit',
    'Projects': '/projects',
  };

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Link to="/" className={styles.landing}>{String.fromCharCode(10151)}</Link>
        {Object.keys(links).map((link) => {
          const path = links[link];
          const classname = classnames(styles.navigation_link, {
            [styles.navigation_link_selected]: pathname === path,
          });
          return <Link key={`path_${path}`} to={path} className={classname}>{link}</Link>;
        })}
      </div>

      <div className={styles.about}>
        <div className={styles.name}>Raymond Davidson</div>
        <div className={styles.title}>Software Developer</div>
        <div className={styles.links}>
          <a className={styles.link} rel="noreferrer" href={RESUME_LINK} target="_blank">Résumé</a>
          <a className={styles.link} rel="noreferrer" href="https://www.linkedin.com/in/raymond-davidson-05808b28" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
