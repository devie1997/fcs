import React, { useState } from "react";
import whatsappIcon from "../assets/icons8-whatsapp.gif";  // adjust path as needed

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "27601234567"; // use your number
    const message = encodeURIComponent("Hi! I’d like to know more about your products.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#333",
    },
    card: {
      backgroundColor: "#ffffffcc",
      backdropFilter: "blur(6px)",
      maxWidth: "600px",
      width: "100%",
    },
    title: {
      fontSize: "2.5rem",
      color: "#d46a00",
      marginBottom: "1rem",
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginBottom: "2rem",
    },
    input: {
      padding: "0.9rem",
      borderRadius: "10px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      fontSize: "1rem",
      outline: "none",
    },
    textarea: {
      padding: "0.9rem",
      borderRadius: "10px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "none",
      outline: "none",
    },
    button: {
      backgroundColor: "#ff8800",
      border: "none",
      padding: "0.9rem",
      borderRadius: "10px",
      fontWeight: "bold",
      cursor: "pointer",
      color: "#fff",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    social: {
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
    },
    iconButton: {
      backgroundColor: "#fff",
      borderRadius: "50%",
      padding: "0.8rem",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50px",
      height: "50px",
    },
    iconImg: {
      width: "24px",
      height: "24px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Contact Us</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>
          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>

        {/* WhatsApp & Facebook icons */}
        <div style={styles.social}>
          <div style={styles.iconButton} onClick={handleWhatsApp} title="Chat on WhatsApp">
            <img src={whatsappIcon} alt="WhatsApp" style={styles.iconImg} />
          </div>

          <div
            style={{ ...styles.iconButton, backgroundColor: "#1877F2" }}
            onClick={() => window.open("https://www.facebook.com/YourPage", "_blank")}
            title="Visit us on Facebook"
          >
            {/* Use a Facebook SVG or icon similarly */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              alt="Facebook"
              style={styles.iconImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
