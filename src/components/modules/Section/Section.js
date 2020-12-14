import React, { Component, Fragment } from "react";

import styles from './Section.module.css';

class Section extends Component {
  constructor() {
    super();

    this.state = {
      image: null,
    };

    this.setPopupImage = this.setPopupImage.bind(this);
  }

  setPopupImage(image) {
    this.setState({ image });
  }

  populateImages () {
    const { images = [] } = this.props;
    if (!images || !images.length) return null;

    return (
      <div className={styles.images}>
        {images.map((src) => {
          return (
            <img
              alt={src}
              key={`section_image_${src}`}
              className={styles.image}
              src={src}
              onClick={() => { this.setPopupImage(src); }}
            />
          );
        })}
      </div>
    );
  }

  render() {
    const { header, children } = this.props;
    const { image } = this.state;

    return (
      <Fragment>
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
        {image && (
          <div className={styles.popup_image_wrapper}>
            <img
              alt={image}
              className={styles.popup_image}
              src={image}
              onClick={() => { this.setPopupImage(null); }}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

export default Section;
