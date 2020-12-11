import React, { Component } from "react";

import styles from './Section.module.css';

class Section extends Component {
  populateImages () {
    const { images = [] } = this.props;
    if (!images || !images.length) return null;

    return (
      <div className={styles.images}>
        {images.map((src) => {
          return (
            <div
              key={`section_image_${src}`}
              className={styles.image}
              style={{backgroundImage: `url("${src}")`}}
            />
          );
        })}
      </div>
    );
  }

  render() {
    const { header, children } = this.props;

    return (
      <div className={styles.section}>
        {header && (
          <div className={styles.header}>
            <div className={styles.header_text}>{header}</div>
          </div>
        )}
        <div className={styles.body}>
          <div className={styles.description}>
            {children}
          </div>
          {this.populateImages()}
        </div>
      </div>
    );
  }
}

export default Section;
