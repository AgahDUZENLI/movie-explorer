import React from "react";

const Footer = () => {
  return (
    <footer style={{
      textAlign: "center",
      padding: "4px 0",
      fontSize: "0.60rem",
      color: "#aaa",

    }}>
      <p>
        🎬 Built by{" "}
        <a
          href="https://github.com/AgahDUZENLI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Agah Duzenli
        </a>
      </p>
    </footer>
  );
};

export default Footer;