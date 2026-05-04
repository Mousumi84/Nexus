import { IoLogoApple } from "react-icons/io5";
import { FcAndroidOs } from "react-icons/fc";
import { GiLaptop } from "react-icons/gi";
import { RiWindowsFill } from "react-icons/ri";
import { FcLinux } from "react-icons/fc";
import { MdOutlineDownload } from "react-icons/md";
import { TbShieldLockFilled } from "react-icons/tb";
import { BsGlobe2 } from "react-icons/bs";

function Download() {
  return (
    <>
      <div className="container mt-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Download Nexus</h1>
          <p className="lead">
            Access Nexus anytime, anywhere. Download our app on your preferred
            device and stay connected wherever life takes you.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-5">
          <h2>Choose Your Platform</h2>
          <p>
            Nexus is available across multiple platforms so you can enjoy a
            seamless experience whether you are using a smartphone, tablet,
            laptop, or desktop computer.
          </p>
          <p>
            All versions are synchronized automatically, allowing you to switch
            between devices without losing your messages, media, or account
            activity.
          </p>
        </section>

        {/* Platforms */}
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-4" style={{ height: "360px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><FcAndroidOs style={{ fontSize: "55px"}} />Android App</h2>
              <p>
                The Nexus Android app gives you full access to messaging,
                notifications, stories, profile updates, and secure account
                management directly from your phone.
              </p>
              <ul>
                <li>Instant push notifications</li>
                <li>Optimized battery usage</li>
                <li>Fast photo and video uploads</li>
                <li>Secure login protection</li>
              </ul>
              <button className="btn btn-primary">
                <MdOutlineDownload style={{ fontSize: "30px"}} />
                Download for Android
              </button>
            </div>

            <div className="col-md-6 mb-4" style={{ height: "360px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><IoLogoApple  style={{ fontSize: "50px", color: "#252525ce" }} />iOS App</h2>
              <p>
                Enjoy a premium mobile experience on iPhone and iPad with a
                smooth interface designed specifically for Apple devices.
              </p>
              <ul>
                <li>Face ID support</li>
                <li>iCloud sync compatibility</li>
                <li>High performance UI</li>
                <li>Privacy-focused settings</li>
              </ul>
              <button className="btn btn-primary">
                <MdOutlineDownload style={{ fontSize: "30px"}} />
                Download for iPhone
              </button>
            </div>
          </div>
        </section>

        {/* Desktop */}
        <section className="mb-5" style={{ height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><GiLaptop style={{ fontSize: "50px"}}/> Desktop Application</h2>
          <p>
            Use Nexus on your computer for a larger, more productive
            communication experience. Our desktop app is perfect for long chats,
            media sharing, and multitasking.
          </p>

          <div className="row">
            <div className="col-md-4 mb-3" style={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}><RiWindowsFill style={{ fontSize: "50px", color: "#087bd6" }} />Windows</h4>
              <p>
                Compatible with Windows 10 and later versions for a stable and
                fast experience.
              </p>
              <button className="btn btn-secondary">
                <MdOutlineDownload style={{ fontSize: "30px"}} />
                Download for Windows
              </button>
            </div>

            <div className="col-md-4 mb-3" style={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}><IoLogoApple style={{ fontSize: "50px", color: "#252525ce"}} />macOS</h4>
              <p>
                Optimized for macOS users with smooth performance and native
                system integration.
              </p>
              <button className="btn btn-secondary">
                <MdOutlineDownload style={{ fontSize: "30px"}} />
                Download for macOS
              </button>
            </div>

            <div className="col-md-4 mb-3" style={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}><FcLinux style={{ fontSize: "50px"}} />Linux</h4>
              <p>
                Lightweight Linux version available for developers and advanced
                users.
              </p>
              <button className="btn btn-secondary">
                <MdOutlineDownload style={{ fontSize: "30px"}} />
                Download for Linux
              </button>
            </div>
          </div>
        </section>

        {/* Browser compatibility */}
        <section className="mb-5" style={{ height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><BsGlobe2 style={{ fontSize: "45px", color: "#00ff9d"  }} /> Browser Compatibility</h2>
          <p>
            Prefer not to install the app? You can also use Nexus directly in
            your browser without downloading anything.
          </p>

          <p>Supported browsers include:</p>

          <ul>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Microsoft Edge</li>
            <li>Safari</li>
            <li>Opera</li>
          </ul>

          <p>
            For the best experience, we recommend using the latest version of
            your browser to ensure maximum security and performance.
          </p>
        </section>

        {/* Security */}
        <section className="mb-5" style={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><TbShieldLockFilled  style={{ fontSize: "45px", color: "#08d6c8" }} /> Safe & Secure Downloads</h2>
          <p>
            Every Nexus application is scanned and verified to ensure your
            device remains protected. We use encrypted delivery and regular
            updates to maintain the highest security standards.
          </p>
        </section>

        {/* Footer CTA */}
        <section className="text-center mb-5">
          <h3>Stay Connected Everywhere</h3>
          <p>
            Download Nexus today and enjoy a secure social experience across all
            your devices.
          </p>
        </section>
      </div>
    </>
  );
}

export default Download;