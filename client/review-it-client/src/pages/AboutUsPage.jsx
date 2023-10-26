import { Helmet } from "react-helmet";
import * as styles from "./AboutUsPage.css";


const AboutUsPage = () => {
  return (
    <div className={styles.aboutUs}>
      <Helmet>
        <title>about us | review it</title>
      </Helmet>

      <div>
        <img src={testBlob} alt="brand blob"/>
        <img src={secondaryBlob} alt="secondary blob" className={styles.blob}/>
        <h2>Let&apos;s take a closer look</h2>
        <div>
          <div>1</div>
          Review It is not just a platform; it&apos;s a community of passionate
          TV show enthusiasts who come together to discuss, critique, and
          appreciate their favorite shows. Here, you&apos;ll find people who
          share your love for the latest hits, hidden gems, and cult classics.
        </div>
      </div>
      <div>
        <h1>
          About<br></br> Us
        </h1>
        <p>
          <span className={styles.highlightedText}>
            Ladies and gentlemen, in today&apos;s fast-paced digital age, social
            media has revolutionized the way we consume and interact with
            entertainment.
          </span>
        </p>
        <p>
          Among the various forms of content sharing and discussion, one
          exciting niche has emerged - the realm of social media TV show
          reviews, epitomized by the platform Review It.
        </p>
        <p>
          In this age of infinite choices in the realm of television and
          streaming, we crave guidance in our pursuit of quality content.
          That&apos;s where Review It comes into the picture. This digital
          initiative combines the convenience of social media with our
          collective love for TV shows, creating a virtual space that&apos;s
          both insightful and engaging.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
