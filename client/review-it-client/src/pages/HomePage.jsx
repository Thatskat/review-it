import * as styles from "./HomePage.css";
import { Helmet } from "react-helmet";

import asterisk from "../assets/asterisk.svg";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>home | review it</title>
      </Helmet>
      <div className={styles.home}>
        <div className={styles.swatch}><img src={asterisk}/></div>
        <div>
          <h1>
            Review <br></br>It
          </h1>
          <p>Unlocking the World of Reviews, One Click at a Time</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
