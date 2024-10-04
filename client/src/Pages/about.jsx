import styles from './about.module.css'; // Import the CSS module

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <header className={styles.headerContainer}>
        <h1 className={styles.headerHeading}>About Us</h1>
        <p className={styles.headerSubheading}>Learn about our mission, services, and commitment to empowering businesses.</p>
      </header>
      
      <section className={styles.introSection}>
        <div className={styles.intro}>
          <img src="managelogo.jpg" alt="About Us" className={styles.introImage} />
          <div className={styles.introText}>
            <h2>Our Story</h2>
            <p>Founded in 2024, *ManageHub* started with the vision of simplifying accounting and business management for organizations of all sizes. Our founders, with extensive experience in accounting and software development, realized the growing need for efficient tools to help businesses streamline their financial operations.</p>
            <p>Over the years, ManageHub has become a trusted partner for business owners, accountants, and entrepreneurs. Our platform provides innovative solutions to manage finances, track invoices, handle multiple accounts, and manage inventory – all in one easy-to-use system.</p>
            <p>From the launch of our flagship accounting software to the expansion of our product offerings, we’ve helped businesses across various sectors manage their operations more effectively. Our user-centric approach and focus on customer satisfaction have allowed us to build strong, lasting relationships with our clients.</p>
            <p>As we continue to evolve, our mission remains clear: to provide intuitive, powerful tools that help businesses achieve financial success and growth. We’re proud to partner with businesses worldwide, empowering them with the technology they need to thrive.</p>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>Our mission is to empower businesses with innovative accounting solutions. We strive to simplify financial management through cutting-edge technology, enabling organizations to focus on growth and success.</p>
      </section>

      <section className={styles.servicesSection}>
        <h2>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            {/* <img src="https://source.unsplash.com/featured/?document,technology" alt="Document Detection" className={styles.serviceImage} /> */}
            <h3>Business Accounting</h3>
            <p>Comprehensive accounting tools for managing your business’s finances, including income tracking, expenses, and tax preparation.</p>
          </div>
          <div className={styles.serviceCard}>
            {/* <img src="https://source.unsplash.com/featured/?inventory,management" alt="Inventory Management" className={styles.serviceImage} /> */}
            <h3>Inventory Management</h3>
            <p>Streamline your inventory with our tracking system, ensuring you’re always aware of stock levels, sales, and purchases.</p>
          </div>
          <div className={styles.serviceCard}>
            {/* <img src="https://source.unsplash.com/featured/?billing,invoices" alt="Invoice & Billing" className={styles.serviceImage} /> */}
            <h3>Invoice & Billing</h3>
            <p>Create and manage invoices with ease, track pending payments, and keep your cash flow organized with automated billing features.</p>
          </div>
        </div>
      </section>

      <div className={styles.contributors}>
        <h2>Contributors</h2>
        <div className={styles.contributorsGrid}>
          <div className={styles.card}>
            <img src="con4.jpg" alt="Contributor 1" width={'100px'} className={styles.cardImage} />
            <h4>POOJAN PATEL</h4>
          </div>
          <div className={styles.card}>
            <img src="con1.jpeg" alt="Contributor 2" className={styles.cardImage} />
            <h4>NEEL PATEL</h4>
          </div>
          <div className={styles.card}>
            <img src="kishan.jpg" alt="Contributor 3" className={styles.cardImage} />
            <h4>KishanKumar Vadhia</h4>
          </div>
          <div className={styles.card}>
            <img src="con2.jpg" alt="Contributor 4" className={styles.cardImage} />
            <h4>Parth Sojitra</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;