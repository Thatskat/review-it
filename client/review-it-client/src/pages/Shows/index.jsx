import { useEffect } from "react";
import * as styles from "./show.css";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/client";
import { GET_ALL_TV_SHOWS } from "../../graphql/queries";
import Skeleton from "react-loading-skeleton";

import TvShowCard from "../../components/feature/TvShowCard";

const ShowsPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TV_SHOWS);
  useEffect(() => {
    refetch();
  }, []);
  

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
      {data ? data.getAllTvShows.map((show) => <TvShowCard key={show.id} showData={show} />) : <p>no data</p>}
        </div>
      </div>
    </div>
  );
};

export default ShowsPage;
