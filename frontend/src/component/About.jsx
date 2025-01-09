import React from "react";
import about from "../images/about2.jpg";
import XTransition from '../assets/transition/leftright/XTransition'
import YTransition from "../assets/transition/downtoup/YTransition";
import Scale from "../assets/transition/scale/Scale";

const About = () => {
  return (
    <div className="w-4/5 mx-auto pt-2 mb-20" id="about">
      <XTransition
        className="text-3xl pt-9 font-semibold"
      >
        About US
      </XTransition>
      <div className="w-full flex flex-wrap">
        <YTransition className="w-full md:w-3/5 md:pr-10 pt-7" >
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
        </YTransition>
        <Scale className="w-full md:w-2/5 object-cover" >
          <img src={about} alt="" />
        </Scale>
      </div>
    </div>
  );
};

export default About;
