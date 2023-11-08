import { Helmet } from "react-helmet";
import * as styles from "./PrivacyPolicy.css";

const Contact = () => {
  return (
    <div className={styles.privacyPolicy}>
      <Helmet>
        <title>contact us | review it</title>
      </Helmet>
      <h1>Contact Us</h1>
      <p>
        Thank you for choosing Review Ii, the ultimate platform for sharing and
        discovering tv shows. Your feedback and inquiries are important to us,
        and we are here to assist you in any way we can. Please don&apos;t
        hesitate to get in touch.
      </p>
      <h2>Customer Support</h2>
      <p>
        If you have any questions, encounter technical issues, or need
        assistance with using the Review It application, our dedicated customer
        support team is available to help. You can reach us by email or phone.
      </p>
      <ul>
        <li>support@reviewit.com.au</li>
        <li>phone number</li>
      </ul>
      <h2>Feedback & Suggestions</h2>
      <p>
        We value your input and welcome your suggestions for improving the
        Review IT application. Your ideas are crucial to making our platform
        even better. Please share your thoughts with us at{" "}
        <a>feedback@reviewit.com.au</a>.
      </p>
    </div>
  );
};

export default Contact;
