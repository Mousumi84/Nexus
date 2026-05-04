function Home() {
  return (
    <>
      <div id="home" className="container mt-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Welcome to Nexus</h1>
          <p className="lead">
            Nexus is more than just a social networking platform. It is a
            digital community where people can connect, communicate, and create
            meaningful relationships across the world.
          </p>
        </div>

        {/* About */}
        <section className="mb-5">
          <h2>About Nexus</h2>
          <p>
            Nexus was created with a simple mission — to bring people closer,
            no matter where they are. In today's fast-moving digital world,
            staying connected with family, friends, colleagues, and communities
            has become more important than ever.
          </p>
          <p>
            Our platform allows users to share their life moments, exchange
            ideas, and discover communities that match their interests in a
            safe and engaging environment.
          </p>
        </section>

        {/* Why people use it */}
        <section className="mb-5">
          <h2>Why People Choose Nexus</h2>
          <p>
            Millions of users choose Nexus because it combines simplicity,
            privacy, and modern communication tools in one platform.
          </p>

          <ul>
            <li>Stay connected with loved ones anytime.</li>
            <li>Share personal memories through posts and photos.</li>
            <li>Build professional and social communities.</li>
            <li>Chat instantly with secure messaging.</li>
            <li>Discover people with similar interests.</li>
          </ul>
        </section>

        {/* Features */}
        <section className="mb-5">
          <h2>Core Features</h2>

          <div className="row">
            <div className="col-md-6 mb-4">
              <h4>🌍 Connect Globally</h4>
              <p>
                Connect with friends, family, and communities around the world.
                Distance no longer limits communication with Nexus.
              </p>
            </div>

            <div className="col-md-6 mb-4">
              <h4>📸 Share Memories</h4>
              <p>
                Upload photos, stories, and updates to preserve and share your
                important life moments with people who matter.
              </p>
            </div>

            <div className="col-md-6 mb-4">
              <h4>💬 Real-Time Messaging</h4>
              <p>
                Send and receive instant messages with a smooth and responsive
                chat system built for modern communication.
              </p>
            </div>

            <div className="col-md-6 mb-4">
              <h4>👥 Build Communities</h4>
              <p>
                Join interest-based groups and participate in conversations
                that matter to you.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-5">
          <h2>Security & Privacy</h2>
          <p>
            At Nexus, your privacy is one of our top priorities. We understand
            that personal data should remain protected and under your control.
          </p>
          <p>
            Our platform offers privacy controls that allow you to decide:
          </p>

          <ul>
            <li>Who can view your profile</li>
            <li>Who can message you</li>
            <li>Who can see your shared content</li>
            <li>How your personal information is protected</li>
          </ul>

          <p>
            With secure authentication and user-controlled settings, your
            digital experience remains safe and comfortable.
          </p>
        </section>

        {/* Community */}
        <section className="mb-5">
          <h2>Our Community</h2>
          <p>
            Nexus believes in building a positive and respectful digital
            environment where every voice matters.
          </p>
          <p>
            Whether you are reconnecting with old friends, meeting new people,
            or creating a professional network, Nexus helps you feel part of a
            larger global family.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center mb-5">
          <h3>Start Your Journey Today</h3>
          <p>
            Join Nexus today and become part of a platform designed to help
            people stay connected, inspired, and empowered.
          </p>
        </section>
      </div>
    </>
  );
}

export default Home;