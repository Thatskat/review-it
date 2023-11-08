import { Helmet } from "react-helmet";
import * as styles from "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <Helmet>
        <title>page not found | review it</title>
      </Helmet>
      <h1>404 - Page not Found</h1>
      <p>Oh No! This page doesn&apos;t exist. Maybe it&apos;s time to return <Link to="/">Home</Link>.</p>
    </div>
  );
};

export default PageNotFound;
