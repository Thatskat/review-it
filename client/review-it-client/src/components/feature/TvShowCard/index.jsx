import { Link } from "react-router-dom";

const TvShowCard = () => {
  return (
    <Link
      to={`/show/${data?.getAllTvShows[0].id}`}
      className={styles.card}
      title="Buffy the Vampire Slayer"
    >
      <img
        src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
        alt="Buffy the Vampire Slayer"
      />
    </Link>
  );
};

export default TvShowCard;
