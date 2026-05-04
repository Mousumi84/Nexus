function Help() {
  return (
    <>
      <div className="container mt-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Help Center</h1>
          <p className="lead">
            Welcome to the Nexus Help Center. Find answers to common questions
            and learn how to make the most of your Nexus experience.
          </p>
        </div>

        {/* Intro */}
        <section className="mb-5">
          <h2>We're Here to Help</h2>
          <p>
            Whether you are new to Nexus or have been using the platform for a
            long time, our goal is to make your experience simple, secure, and
            enjoyable.
          </p>
          <p>
            Below you will find answers to the most common questions users ask.
            If you need additional assistance, you can always contact our
            support team through the Support page.
          </p>
        </section>

        {/* FAQ 1 */}
        <section className="mb-5">
          <h3>1. How to Create an Account</h3>
          <p>
            Creating a Nexus account takes only a few minutes:
          </p>
          <ul>
            <li>Click the <strong>Signup</strong> button on the main page.</li>
            <li>Enter your email address, name, username and Password.</li>
            <li>Create a secure password.</li>
            <li>Upload an optional profile picture.</li>
            <li>Click <strong>Signup</strong>.</li>
          </ul> 
          <p>
            Once registration is complete, you can begin connecting with people
            and exploring the platform.
          </p>
        </section>

        {/* FAQ 2 */}
        <section className="mb-5">
          <h3>2. Forgot Your Password?</h3>
          <p>
            If you cannot remember your password, you can reset it easily.
          </p>
          <ul>
            <li>Go to the Login page.</li>
            <li>Click <strong>Forgot Password</strong>.</li>
            <li>Enter your registered email address.</li>
            <li>Check your inbox for the reset link.</li>
            <li>Create a new password and log in again.</li>
          </ul>
          <p>
            For security reasons, password reset links expire after a limited
            time, so please use the link as soon as possible.
          </p>
        </section>

        {/* FAQ 3 */}
        <section className="mb-5">
          <h3>3. How to Upload a Profile Photo</h3>
          <p>
            A profile photo helps other users recognize you more easily.
          </p>
          <ul>
            <li>Go to your profile page.</li>
            <li>Click the current profile image area.</li>
            <li>Select a photo from your device.</li>
            <li>Adjust the image if needed.</li>
            <li>Click <strong>Save Changes</strong>.</li>
          </ul>
          <p>
            Supported image formats include JPG, PNG, and WEBP.
          </p>
        </section>

        {/* FAQ 4 */}
        <section className="mb-5">
          <h3>4. Managing Privacy Settings</h3>
          <p>
            Nexus gives you full control over your privacy. You can customize:
          </p>
          <ul>
            <li>Who can see your profile</li>
            <li>Who can send messages</li>
            <li>Who can view your posts</li>
            <li>Who can search for your account</li>
          </ul>
          <p>
            To change your privacy settings:
          </p>
          <ul>
            <li>Go to <strong>Settings</strong></li>
            <li>Select <strong>Privacy</strong></li>
            <li>Update your preferences</li>
            <li>Save your changes</li>
          </ul>
        </section>

        {/* FAQ 5 */}
        <section className="mb-5">
          <h3>5. How to Delete Your Account</h3>
          <p>
            If you decide to leave Nexus, you can permanently delete your
            account at any time.
          </p>
          <ul>
            <li>Go to <strong>Account Settings</strong></li>
            <li>Select <strong>Delete Account</strong></li>
            <li>Confirm your password</li>
            <li>Review the warning message</li>
            <li>Click <strong>Confirm Delete</strong></li>
          </ul>
          <p>
            Please note that account deletion is permanent and your messages,
            photos, and connections cannot be recovered afterward.
          </p>
        </section>

        {/* Additional help */}
        <section className="mb-5">
          <h2>Need More Assistance?</h2>
          <p>
            If you cannot find the answer you need here, our support team is
            always ready to help.
          </p>
          <p>
            Visit the <strong>Support Page</strong> to send us your question,
            report a problem, or request technical assistance.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center mb-5">
          <h3>Your Experience Matters</h3>
          <p>
            We want every Nexus user to feel confident and comfortable while
            using our platform. Thank you for being part of the Nexus community.
          </p>
        </section>
      </div>
    </>
  );
}

export default Help;