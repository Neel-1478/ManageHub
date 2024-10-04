import styles from "./Home.module.css"; // Import CSS module
import { FaSquareInstagram } from "react-icons/fa6";
import {Link} from "react-router-dom";
export default function Home() {
  return (
    <div className={styles.container}> {/* Using CSS Module */}
      <header className={styles.header}>
        <div className={styles.logo}>ManageHub</div>
        <nav className={styles.nav}>
          {/* Links removed */}
        </nav>
        <div className={styles.ctaButtons}> {/* Camel case naming */}
          <button className={styles.btn + " " + styles.btnPrimary}>Get Started</button>
          <Link to="/signin"> {/* Use Link for redirection */}
            <button>Sign In</button>
          </Link>

        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.mainTitle}>Where is your money going?</h1>
        <p className={styles.mainSubtitle}>
          Track your expenses effortlessly and gain financial clarity.
        </p>
        
      </main>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Analytics</h3>
            <p className={styles.featureDescription}>Providing valuable insights and performance metrics.</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Account Management</h3>
            <p className={styles.featureDescription}>Manage accounts, payments, and reconciliations.</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Invoicing</h3>
            <p className={styles.featureDescription}>Simplifies invoice creation, management, and tracking.</p>
          </div>
        </div>
      </section>

      <section className={styles.productivity}>
        <h2 className={styles.sectionTitle1}>Boost Your <br />Productivity</h2>
        <p className={styles.sectionDescription}>Enhance team collaboration and efficiency.</p>
        <button className={styles.btn + " " + styles.btnPrimary}>Get Started</button>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>ManageHub</div>
        <div className={styles.footDesc}>Subscribe to Our <br />Newsletter</div>
        <div className={styles.newsletter}>
          <input type="email" placeholder="Enter your email" className={styles.newsletterInput} />
          <button className={styles.btn + " " + styles.btnPrimary}>Subscribe</button>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <li>Pricing</li>
            <li>Features</li>
            <li>Pricing</li>
          </div>
          <div>
            <li>Blog</li>
            <li>User guides</li>
            <li>Webinars</li>
          </div>
          <div>
            <li>About us</li>
            <li>Contact us</li>
          </div>
          <div>
            <li>Personal</li>
            <li>Start up</li>
            <li>Organization</li>
          </div>
        </div>
      </footer>

      <div className={styles.mainFooter}>
        <div>
          <p>&#169; 2024 Brand, Inc.</p>
        </div>
        <div className={styles.socialMedia}>
          <a href="#" className={styles.socialMediaLink}><i className="fab fa-facebook"></i></a>
          <a href="#" className={styles.socialMediaLink}><i className="fab fa-twitter"></i></a>
          <a href="#" className={styles.socialMediaLink}><FaSquareInstagram/></a>
          <a href="#" className={styles.socialMediaLink}><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
}
