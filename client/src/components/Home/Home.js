import React from "react";

import "./Home.css";

function Home() {
  return (
    <div class="home">
      <div className="home__text">
        <h1>Modern banking done Online</h1>
        <h4>A simpler banking experience for a simpler life.</h4>
      </div>

      <img src="img/hero.png" class="home__img" alt="Minimalist bank items" />
    </div>
  );
}

export default Home;
