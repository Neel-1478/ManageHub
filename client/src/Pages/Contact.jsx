import styles from './Contact.module.css';
const ContactSection = () => {
    return (
        <div className={styles.ContactSection} id={styles.contact}>
            <h2>CONTACT ME</h2>
            <div className={styles.contact_container}>
                <div className={styles.contact_details}>
                    <h3>Phone Number</h3>
                    <a href="tel:+919722379175">+91 9722379175</a>
                    <h3>Email</h3>
                    <a href="mailto:poojanpatel1595@gmail.com">managehub1234@gmail.com</a>
    

                </div>
                <div className={styles.contact_form}>
                    <form 
                        id="contactForm"
                        action="https://script.google.com/macros/s/AKfycbwXTspPNdDpt2p74FHmlN-zTFunP4BsXfzR3jFVOLr2fDisPfc-Zg1u9ExwgQmNDoUb/exec"
                        method="POST"
                    >
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your Name" 
                            required 
                        />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your E-mail" 
                            required 
                        />
                        <input 
                            type="text" 
                            id="phone" 
                            name="phone" 
                            placeholder="Phone Number" 
                            required 
                        />
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="5" 
                            placeholder="Your Message" 
                            required 
                        />
                        <button type="submit">SEND</button>
                    </form>
                    <p id="responseMessage"></p>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;