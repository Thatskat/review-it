import * as styles from "./EditCard.css";

const DeleteCard = ({ show, handleDelete }) => {
  return (
    <div className={styles.showCard}>
      <img src={show.showPoster} alt={`${show.title} Poster`} />
      {show.title}
      <button onClick={() => handleDelete(show.id)}>delete</button>
    </div>
  );
};

export default DeleteCard;
