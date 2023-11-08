import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import * as styles from "./PrivacyPolicy.css"

const TermsConditions = () => {
  return (
    <div className={styles.privacyPolicy}>
      <Helmet>
        <title>terms & conditions | review it</title>
      </Helmet>
      <h1>Our Terms & Conditions</h1>
      <p className="bold">Last Updated: 8th of November 2023</p>
      <p>
        These terms and conditions (&quot;Terms&quot;) constitute a legally
        binding agreement between you (&quot;User&quot; or &quot;You&quot;) and
        Review IT Inc. (&quot;Review It,&quot; &quot;We,&quot; or
        &quot;Us&quot;). By using the Review It application
        (&quot;Application&quot;), you agree to comply with and be bound by
        these Terms. If you do not agree to these Terms, please do not use the
        Application.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By using the Application, you acknowledge that you have read,
        understood, and agreed to these Terms and our Privacy Policy, available{" "}
        <Link to="/privacy-policy">Here</Link>. These Terms may be updated from
        time to time, and it is your responsibility to review them periodically.
      </p>
      <h2>2. User Eligibility</h2>
      <p>
        You must be at least 18 years old or the legal age in your jurisdiction
        to use the Application. By using the Application, you represent and
        warrant that you are eligible to do so.
      </p>
      <h2>3. User Registration</h2>
      <p>
        You may be required to create a user account to access certain features
        of the Application. You agree to provide accurate and up-to-date
        information during the registration process. You are responsible for
        maintaining the confidentiality of your account credentials and for any
        activities that occur under your account. You agree to immediately
        notify us of any unauthorized use of your account.
      </p>
      <h2>4. User Content</h2>
      <p>
        The Application allows you to submit, post, or share content, including
        reviews and comments. By submitting content, you grant Review IT a
        non-exclusive, royalty-free, worldwide license to use, reproduce,
        modify, distribute, and display the content in connection with the
        Application. You are solely responsible for the content you submit and
        must not violate any third-party rights or laws. We reserve the right to
        remove or moderate content at our discretion.
      </p>
      <h2>5. Prohibited Conduct</h2>
      <div>
        <p>You agree not to engage in any of the following activities:</p>
        <ul>
          <li>Violating any applicable laws or regulations.</li>
          <li>
            Using the Application for illegal, fraudulent, or harmful purposes.
          </li>
          <li>Uploading or transmitting malware or harmful code.</li>
          <li>
            Engaging in any activity that disrupts or interferes with the proper
            functioning of the Application.
          </li>
          <li>Impersonating other users or entities.</li>
          <li>
            Violating the intellectual property rights of Review IT or third
            parties.
          </li>
        </ul>
      </div>
      <h2>6. Termination</h2>
      <p>
        Review It reserves the right to terminate or suspend your access to the
        Application at our sole discretion, with or without notice, for any
        reason, including a breach of these Terms.
      </p>
      <h2>7. Privacy</h2>
      <p>
        We collect and use your personal information in accordance with our
        Privacy Policy. Please review the Privacy Policy for more information on
        how we handle your data.
      </p>
      <h2>8. Disclaimers</h2>
      <p>The Application is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of content on the Application.</p>
      <h2>9. Limitation of Liability</h2>
      <p>Review IT shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
      <h2>10. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of Australia.</p>
      <h2>11. Contact Information</h2>
      <p>If you have any questions or concerns about these Terms, please contact us at contact@reviewit.com.au.</p>
    </div>
  );
};

export default TermsConditions;
