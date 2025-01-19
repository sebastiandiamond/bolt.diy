import { data, Form, Link, redirect, useActionData, type MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Terms of Service' },
    { name: 'description', content: 'Terms of Service for XONO platform' },
  ];
};

export default function TermsOfService() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms of Service</title>
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
          <h1>Terms of Service</h1>
        </header>
        <div className="container">
          <p>Last updated: January 19, 2025</p>

          <h2>Introduction</h2>
          <p>
            Welcome to our platform. By accessing or using our services, you
            agree to be bound by these Terms of Service. If you do not agree,
            please discontinue use of our services.
          </p>

          <h2>Use of Generated Code</h2>
          <p>
            Our platform provides tools for generating code and other outputs.
            We are not responsible for the correctness, functionality, or
            consequences of any code or content generated using our platform.
            Users are solely responsible for reviewing, testing, and ensuring
            the appropriate use of any code generated.
          </p>

          <h2>Data Collection and Google OAuth</h2>
          <p>
            We use Google OAuth for authentication purposes. During the
            authentication process, we collect your basic Google account
            information, such as your email address and profile information.
            This information is used strictly for authentication and providing
            access to our services, as outlined in our{' '}
            <a href="privacy_policy.html">Privacy Policy</a>.
          </p>

          <h2>Open-Source Licensing</h2>
          <p>
            Our platform incorporates an open-source forked version of{' '}
            <strong>Bolt.diy</strong>, which is distributed under the MIT
            license. You can review the original license and terms of Bolt.diy
            on its respective repository. We comply with all requirements of the
            MIT license in using this software.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be held liable
            for any direct, indirect, incidental, or consequential damages
            resulting from the use of our platform, including but not limited to
            issues arising from generated code or third-party integrations.
          </p>

          <h2>Modifications to the Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            We will notify users of significant changes by posting an update on
            this page. Continued use of our services after such changes
            constitutes your acceptance of the updated Terms.
          </p>

          <h2>Data Retention and Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data. Retention of data is limited to what is necessary for the
            operation of our platform and compliance with applicable laws. For
            more details, please review our{' '}
            <a href="privacy_policy.html">Privacy Policy</a>.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms of
            Service, please contact us at{' '}
            <a href="mailto:support@xono.ai">support@xono.ai</a>.
          </p>
        </div>
        <footer>&copy; 2025 Xono.ai. All rights reserved.</footer>
      </body>
    </html>
  );
}
