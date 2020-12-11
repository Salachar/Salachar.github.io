import React from "react";

function Anchor(props) {
  const { link, children } = props;
  return (
    <a href={link} rel="noreferrer" target="_blank">{children}</a>
  );
}

export default Anchor;
