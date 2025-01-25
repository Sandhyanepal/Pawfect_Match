// import React from "react";
// import about from "../images/about2.jpg";
// import XTransition from '../assets/transition/leftright/XTransition'
// import YTransition from "../assets/transition/downtoup/YTransition";
// import Scale from "../assets/transition/scale/Scale";

// const About = () => {
//   return (
//     <div className="w-4/5 mx-auto pt-2 mb-20" id="about">
//       <XTransition
//         className="text-3xl pt-9 font-semibold"
//       >
//         About US
//       </XTransition>
//       <div className="w-full flex flex-wrap">
//         <YTransition className="w-full md:w-3/5 md:pr-10 pt-7" >
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
//           eum minima, officia incidunt quas magnam vel ullam debitis iste fugit
//           ex quidem atque ipsa ducimus repellendus numquam error tempore alias
//           voluptates reiciendis, deleniti fuga. Dicta libero, vitae illum itaque
//           corrupti optio nostrum totam ut? <br /> <br /> Officiis vitae iusto
//           alias optio aut! Lorem ipsum dolor sit, amet consectetur adipisicing
//           elit. Itaque ipsum dolor officiis cum. Est dolorum similique, aut
//           fugiat esse sed enim voluptatem iusto temporibus fuga! <br /> <br />
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero qui
//           officia quam eligendi quas nemo corrupti fuga quis ratione est.
//         </YTransition>
//         <Scale className="w-full md:w-2/5 object-cover" >
//           <img src={about} alt="" />
//         </Scale>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react'
// import teamImage from './images/team.jpg'
import about from '../images/about2.1.jpg'
import adopted from '../images/adoptme.jpg'
import Header from './Header'
import Contact from '../pages/Contact'
import Footer from './Footer'
// import growBetterImage from './images/grow-better.jpg'
// import petAdoptionImage from './images/pet-adoption.jpg'

const AboutUs = () => {
  return (
    <div
      className="bg-white py-5 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: '#d6ddd6' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={about}
              alt="About Us Team"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About Us</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              porro maiores harum rerum molestiae laborum, ratione vitae modi
              maxime culpa eius nostrum minus, animi assumenda.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const OurMission = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              laborum at mollitia. Perspiciatis, illum molestias.
            </p>
          </div>
          <div>
            <img
              src={adopted}
              alt="Helping Organizations Grow Better"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const OurStory = () => {
  return (
    <div
      className=" py-10 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: '#f9f8f6' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img src={about} alt="Our Story" className="w-full rounded-lg" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perferendis illo, quae itaque, eius quam quidem iure nihil unde
              molestias sed rerum. Fugit sunt provident cumque, magni numquam
              placeat optio voluptatem adipisci iure tempora quod, totam,
              praesentium in? Amet, cupiditate unde!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <Header />
      <AboutUs />
      <OurMission />
      <OurStory />
      <Contact />
      <Footer />
    </div>
  )
}

export default About
