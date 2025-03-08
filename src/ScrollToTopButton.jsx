import React from "react";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className="home__scroll-to-top" onClick={scrollToTop}>
      ↑ Topo
    </button>
  );
};

export default ScrollToTopButton;