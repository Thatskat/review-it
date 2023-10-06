import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import * as styles from './HomePage.css';

import homeTest from "../assets/home-test.jpg"

const HomePage = () => {
  return (
    <div >
      <Header />
      <div className={styles.home}>
     <h1>Review It</h1>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
