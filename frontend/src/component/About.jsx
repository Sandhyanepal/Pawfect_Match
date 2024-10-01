import React from "react";
import about from "../images/about2.jpg";

const About = () => {
  return (
    <div className="w-4/5 mx-auto pt-5 mb-20">
      <h1
        className="text-3xl pt-9 font-semibold"
        style={{ fontFamily: "lato" }}
      >
        About US
      </h1>
      <div className="w-full flex flex-wrap">
        <p className="w-full md:w-3/5 md:pr-10 pt-7" style={{ fontFamily: "lato" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          eum minima, officia incidunt quas magnam vel ullam debitis iste fugit
          ex quidem atque ipsa ducimus repellendus numquam error tempore alias
          voluptates reiciendis, deleniti fuga. Dicta libero, vitae illum itaque
          corrupti optio nostrum totam ut? <br /> <br /> Officiis vitae iusto
          alias optio aut! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Itaque ipsum dolor officiis cum. Est dolorum similique, aut
          fugiat esse sed enim voluptatem iusto temporibus fuga! <br /> <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero qui
          officia quam eligendi quas nemo corrupti fuga quis ratione est.
        </p>
        <img src={about} alt="" className="w-full md:w-2/5 object-cover"  />
      </div>
    </div>
  );
};

export default About;
