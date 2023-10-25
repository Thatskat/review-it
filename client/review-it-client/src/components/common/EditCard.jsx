import { Link } from "react-router-dom";
import * as styles from "./EditCard.css";

const EditCard = ({ show, link }) => {
  return (
    <Link showData={show} to={link} className={styles.showCard}>
      <img src={show.showPoster} alt={`${show.title} Poster`} />
      {show.title}
    </Link>
  );
};

export default EditCard;
