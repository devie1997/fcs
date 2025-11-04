import React from "react";

const About = () => {
  const styles = {
    container: {
      background: "linear-gradient(to bottom right, #fff8f0, #ffe3b0)",
      color: "#333",
      minHeight: "100vh",
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#ffffffcc",
      backdropFilter: "blur(6px)",
      borderRadius: "16px",
      padding: "3rem 2rem",
      maxWidth: "900px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    title: {
      fontSize: "2.5rem",
      color: "#d46a00",
      marginBottom: "1.5rem",
      letterSpacing: "1px",
      fontWeight: "bold",
    },
    text: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: "#333",
      marginBottom: "1rem",
    },
    highlight: {
      color: "#ff8800",
      fontWeight: "600",
    },
    line: {
      width: "100px",
      height: "4px",
      backgroundColor: "#ff8800",
      margin: "1rem auto 2rem",
      borderRadius: "2px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>About Us</h2>
        <div style={styles.line}></div>
        <p style={styles.text}>
          Welcome to <span style={styles.highlight}>Family Care Spices</span> —
          your trusted destination for premium spices, herbs, and seasonings.
          We’re passionate about bringing the rich flavors of nature to your
          kitchen, ensuring every meal tells a story through its taste.
        </p>
        <p style={styles.text}>
          Our products are carefully sourced from sustainable farms and
          prepared with care to maintain freshness and aroma. Whether you’re a
          professional chef or a home cook, we’re here to help you create
          unforgettable dishes filled with warmth and authenticity.
        </p>
      </div>
    </div>
  );
};

export default About;
