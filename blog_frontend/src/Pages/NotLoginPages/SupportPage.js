// import Navbar from "../components/Navbar";

function Support() {
  return (
    <>
      <div className="container mt-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Support Center</h1>
          <p className="lead">
            We are here to help you with your account, technical issues,
            privacy concerns, and everything in between.
          </p>
        </div>

        {/* Intro */}
        <section className="mb-5">
          <h2>How Can We Help You?</h2>
          <p>
            At Nexus, we believe every user deserves a smooth and secure
            experience. Whether you are facing login problems, profile issues,
            messaging errors, or simply need guidance using the platform,
            our support team is ready to assist you.
          </p>
          <p>
            You can contact us through the support form below, send us an
            email, or use live chat for faster assistance.
          </p>
        </section>

        {/* Support Options */}
        <section className="mb-5">
          <h2>Available Support Options</h2>

          <div className="row">
            <div className="col-md-4 mb-4">
              <h4>📧 Email Support</h4>
              <p>
                Reach out to our support team anytime by email.
                We typically respond within 24 hours.
              </p>
              <p>
                <strong>Email:</strong> support@nexus.com
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4>💬 Live Chat</h4>
              <p>
                Need immediate help? Use our live chat feature to speak with
                one of our support representatives in real time.
              </p>
              <p>
                <strong>Available:</strong> 9:00 AM – 9:00 PM
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4>⚠ Report an Issue</h4>
              <p>
                Found a bug or inappropriate content? Let us know so we can
                investigate and resolve the issue quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-5">
          <h2>Contact Support</h2>
          <p>
            Please provide as much detail as possible so we can assist you
            more effectively.
          </p>

            <div className="box">
                <div className="form">
                    <form>
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                          />
                        </div>
            
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                          />
                        </div>
            
                        <div className="mb-3">
                          <label className="form-label">Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Briefly describe your issue"
                          />
                        </div>
            
                        <div className="mb-3">
                          <label className="form-label">Message</label>
                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Describe your issue in detail"
                          ></textarea>
                        </div>
            
                        <button className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>

        {/* Common Topics */}
        <section className="mb-5">
          <h2>Common Support Topics</h2>
          <ul>
            <li>Unable to log into your account</li>
            <li>Password reset assistance</li>
            <li>Profile picture upload issues</li>
            <li>Account privacy settings</li>
            <li>Reporting abusive users</li>
            <li>Recovering deleted messages</li>
          </ul>
        </section>

        {/* Response */}
        <section className="mb-5">
          <h2>Response Time</h2>
          <p>
            Our team works hard to respond to every support request as quickly
            as possible.
          </p>
          <p>
            Typical response times:
          </p>

          <ul>
            <li>General inquiries: within 24 hours</li>
            <li>Technical issues: within 12 hours</li>
            <li>Urgent security concerns: within 2 hours</li>
          </ul>
        </section>

        {/* Final note */}
        <section className="text-center mb-5">
          <h3>We’re Always Here for You</h3>
          <p>
            Your experience matters to us. No matter the issue, Nexus Support
            is committed to helping you quickly and respectfully.
          </p>
        </section>
      </div>
    </>
  );
}

export default Support;