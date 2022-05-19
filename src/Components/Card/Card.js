import React from "react";
import style from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const {
    id,
    name,
    status,
    species,
    image,
    location,
    addToFav,
    removeFromFav,
    like,
    page,
  } = props;

  const [active, setActive] = useState(like);
  const activeHandle = () => {
    setActive(!active);

    if (!active) {
      addToFav(id);
    } else {
      removeFromFav(id);
    }
  };

  let dotClass;

  if (status === "Alive") {
    dotClass = <span className={style.green}></span>;
  } else if (status === "Dead") {
    dotClass = <span className={style.red}></span>;
  } else {
    dotClass = <span className={style.grey}></span>;
  }

  return (
    <div className={style.cardWrapper}>
      <button className={style.like} onClick={activeHandle}>
        {active ? (
          <FontAwesomeIcon icon={faHeart} color="#DC143C" />
        ) : (
          <FontAwesomeIcon icon={faHeart} color="#808080" />
        )}
      </button>
      <Link to={`${page}${id}`}>
        <img src={image} alt="character img" />
        <div className={style.content}>
          <h3 className={style.name}>{name}</h3>
          <p>
            {dotClass} {status} - {species}
          </p>
          <p>
            <span>Last known location:</span> {location.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
