import { Link } from "react-router-dom";
import * as styles from './DashBoardCard.css'

const index = ({ url, type, description }) => {
  return (
    <div className={styles.card}>
      <h2>
        <Link to={url} title={type}>{type}</Link>
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default index;
