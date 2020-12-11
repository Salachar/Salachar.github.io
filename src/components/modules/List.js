import React from "react";

function List(props) {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => {
        return <li key={`item_${item}`}>{item}</li>
      })}
    </ul>
  );
}

export default List;
