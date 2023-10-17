import { useEffect } from "react";
import * as styles from "./show.css";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/client";
import { GET_ALL_TV_SHOWS } from "../../graphql/queries";
import Skeleton from "react-loading-skeleton";

import { Link } from "react-router-dom";

const ShowsPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TV_SHOWS);
  useEffect(() => {
    refetch();
  }, []);
  console.log(data);

  return (
    <div className={styles.showsPage}>
      <Helmet>
        <title>shows | review it</title>
      </Helmet>
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
