import * as styles from "./HomePage.css";
import { Helmet } from "react-helmet";

import primaryBlob from "../assets/blobs/primary-blob.svg";
import secondaryBlob from "../assets/blobs/secondary-blob.svg";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>home | review it</title>
      </Helmet>
      <div className={styles.home}>
        <div>
          <img src={primaryBlob} />
          <img src={secondaryBlob}/>
          <div>
            <p>review blah blah blah</p>
          </div>
        </div>
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
