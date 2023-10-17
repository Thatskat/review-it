import * as styles from "./show.css";
import { Link } from "react-router-dom";

const ShowsPage = () => {
  return (
    <div className={styles.showsPage}>
      <div className="headerSection">
        <div>
          {" "}
          <button>Order by popularity</button>
        </div>
        <div>
          <h1>Tv Shows</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
            earum?
          </p>
        </div>
      </div>
      <div className={styles.shows}>
        <div className={styles.showsGrid}>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
          <Link to="/" className={styles.card} title="Buffy the Vampire Slayer">
            <img
              src="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX500_.jpg"
              alt="Buffy the Vampire Slayer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowsPage;
