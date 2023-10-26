import * as styles from "./EditCard.css";

const DeleteCard = ({ show, handleDelete }) => {
  return (
    <div className={styles.showCard}>
      <img src={show.showPoster || show.profilePicture} alt={`${show.title} Poster`} />
      {show.title}
      <button onClick={() => handleDelete(show._id || show.id)}>delete</button>
    </div>
  );
};

export default DeleteCard;
