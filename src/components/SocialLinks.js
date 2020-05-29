import React from "react";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://github.com/HighlanderMinsk89/StackGame"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-512.png"
          style={{ width: "30px", height: "30px" }}
          alt="GitHub"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/slava-adnavorau/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://image.flaticon.com/icons/png/512/61/61109.png"
          style={{ width: "30px", height: "30px" }}
          alt="Linkedin"
        />
      </a>
    </div>
  );
}
