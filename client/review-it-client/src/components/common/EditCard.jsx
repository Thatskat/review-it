import { Link } from "react-router-dom";
import * as styles from "./EditCard.css";

const EditCard = ({ show, link }) => {
  return (
    <Link showData={show} to={link} className={styles.showCard}>
      <img
        src={show.showPoster || show.profilePicture}
        alt={`${show.title || `${show.firstName} ${show.lastName}`} Poster`}
      />
      {show.title || `${show.firstName} ${show.lastName}`}
    </Link>
  );
};

export default EditCard;
