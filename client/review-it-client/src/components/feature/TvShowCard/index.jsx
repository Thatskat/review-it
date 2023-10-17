import { Link } from "react-router-dom";
import * as styles from "./TvShowCard.css"

const TvShowCard = ({ showData }) => {
  return (
    <Link
      to={`/show/${showData.id}`}
      className={styles.card}
      title={showData.title}
    >
      <img src={showData.showPoster} alt={showData.title} />
    </Link>
  );
};

export default TvShowCard;
