import { data, Form, Link, redirect, useActionData, type MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy' },
    { name: 'description', content: 'Privacy Policy for XONO platform' },
  ];
};

export default function PrivacyPolicy() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Privacy Policy</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Roboto', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #1e1e2f;
              color: #e4e4eb;
              line-height: 1.6;
            }
            header {
              background-color: #6a0dad;
              color: #fff;
              padding: 15px 0;
              text-align: center;
            }
            header h1 {
              margin: 0;
              font-size: 28px;
            }
            .container {
              max-width: 800px;
              margin: 20px auto;
              background: #2a2a3c;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }
            h2 {
              color: #bb86fc;
              margin-top: 20px;
            }
            p {
              margin: 10px 0;
            }
            a {
              color: #bb86fc;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #bbb;
            }
          `}
        </style>
      </head>
      <body>
        <header>
          <h1>Privacy Policy</h1>
        </header>
        <div className="container">
          <p>Last updated: January 19, 2025</p>

          <h2>Introduction</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our services, including in connection with OAuth authentication and
            Google APIs.
          </p>

          <h2>Where You Can Find This Policy</h2>
          <p>
            This Privacy Policy is linked on our app homepage and prominently
            displayed within our app interface to ensure that users can easily
            access this information. It is hosted on our verified domain at{' '}
            <a href="https://xono.ai/privacy-policy">xono.ai/privacy-policy</a>,
            ensuring alignment with our app homepage.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We keep this policy current and will notify users of any changes in
            how we use Google user data. Users will be informed of these updates
            through appropriate communication channels.
          </p>

          <h2>Hosting and Domain Verification</h2>
          <p>
            This Privacy Policy is hosted on a verified domain that we own,
            ensuring its authenticity and accessibility.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect personal information, such as your name, email
            address, and usage data, when you interact with our platform. If you
            use Google OAuth to log in, we may also collect your Google account
            email and profile information as authorized by you.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Authenticate and authorize your access to our platform using Google OAuth;</li>
            <li>Provide and improve our services;</li>
            <li>Communicate with you about updates or changes to our services;</li>
            <li>Ensure the security of our platform and prevent unauthorized access.</li>
          </ul>

          <h2>How We Access, Use, Store, or Share Google User Data</h2>
          <p>
            Our app accesses your basic Google account information (such as
            email address and profile) strictly for authentication and account
            creation purposes. We do not store sensitive Google user data unless
            explicitly authorized, and we do not share this data with any third
            parties except as required to deliver our services.
          </p>

          <h2>Data Retention and Deletion</h2>
          <p>
            We store your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy unless a longer
            retention period is required or permitted by law. When the retention
            period expires, we delete or securely destroy the data. Users may
            request data deletion by contacting us.
          </p>

          <h2>Data Protection and Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data against unauthorized access, alteration,
            disclosure, or destruction. For example, we use encryption to
            safeguard sensitive data and regularly review our security
            practices.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. You can revoke the app's access to your
            Google account data via your Google account settings. Please contact
            us at <a href="mailto:support@xono.ai">support@xono.ai</a> for
            assistance.
          </p>

          <h2>Prohibited Data Uses</h2>
          <p>
            We do not use Google user data for purposes other than providing or
            improving our app's functionality. We do not sell user data or share
            it with third parties for targeted advertising, data brokering, or
            any other prohibited activities.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or the use of
            your data, please contact us at{' '}
            <a href="mailto:support@xono.ai">support@xono.ai</a>.
          </p>
        </div>
        <footer>&copy; 2025 Xono.ai. All rights reserved.</footer>
      </body>
    </html>
  );
}
