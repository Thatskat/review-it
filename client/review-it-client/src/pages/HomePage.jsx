import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import * as styles from './HomePage.css';

import homeTest from "../assets/home-test.jpg"

const HomePage = () => {
  return (
    <div >
      <Header />
      <div className={styles.home}>
       <img src={homeTest} />
       <div>
       <h1>Review <br></br>It</h1>
       <p>Unlocking the World of Reviews, One Click at a Time</p>
       </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
