// // import  { useEffect } from 'react'
// import Header from '../component/Header'
// import banner from '../images/banner3.png'
// import people from '../images/people1.png'
// import YTranstition from '../assets/transition/downtoup/YTransition'
// import Scale from '../assets/transition/scale/Scale'
// import XTransition from '../assets/transition/leftright/XTransition'
// // import YTTransition from '../assets/transition/uptodown/YTTransition'
// import { Swiper, SwiperSlide } from 'swiper/react'
// // import { Autoplay } from 'swiper'
// import 'swiper/swiper-bundle.css' // Correct import for Swiper styles
// import { PiFlowerTulipThin } from 'react-icons/pi'
// import { HiOutlineHome } from 'react-icons/hi2'
// import pets from '../images/pets.jpg'
// import Footer from '../component/Footer'

// const Home = () => {
//   const partnerOrganizations = [
//     { id: 1, name: 'Organization 1' },
//     { id: 2, name: 'Organization 2' },
//     { id: 3, name: 'Organization 3' },
//     { id: 4, name: 'Organization 4' },
//   ]

//   return (
//     <div>
//       <Header title="home" />

//       {/* Banner */}
//       <section
//         className="w-full bg-white py-4"
//         style={{ backgroundColor: '#f9f8f6' }}
//       >
//         <div className="w-11/12 mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center gap-5">
//           {/* Left Image Section */}
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img
//               src={banner}
//               alt="Smiling woman holding baguettes"
//               className=" w-4/5 sm:w-4/5 lg:w-full object-cover transform hover:scale-105 transition-transform duration-500 "
//             />
//           </div>

//           {/* Right Text Section */}
//           <div className="w-full md:w-1/2 mt-10 md:mt-0  md:text-left">
//             <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-800 leading-tight">
//               I help women in their later years reclaim their bodies, minds, and
//               lives.
//             </h1>
//             <p className="text-sm lg:text-lg text-gray-600 mt-2 leading-relaxed">
//               Health Coach, Wife, and Mom of Two
//               <br />
//               Passionate about empowering people to give up dieting, nourish
//               their bodies, and find balance with food and fitness for life!
//             </p>
//             <button
//               className="mt-2 px-4 py-2 text-sm rounded-full shadow-md"
//               style={{ backgroundColor: '#d6ddd6' }}
//             >
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* carousel */}
//       <div className="py-5" style={{ backgroundColor: '#d6ddd6' }}>
//         <h2 className="text-center text-3xl font-semibold">
//           Our Partner Organizations
//         </h2>

//         <Swiper
//           // modules={[Autoplay]}
//           spaceBetween={5}
//           slidesPerView={3}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           // className="mySwiper"
//         >
//           {partnerOrganizations.map((org) => (
//             <SwiperSlide
//               key={org.id}
//               className="flex justify-center items-center p-4"
//             >
//               <p className="text-center font-medium">{org.name}</p>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* How Adoption works */}
//       <section style={{ backgroundColor: '#f9f8f6' }}>
//         <div className=" flex w-4/5 flex-wrap pl-32 mx-auto">
//           {/* <div className="w-full "> */}
//           <Scale className="w-full sm:w-1/3 object-cover">
//             <img src={people} alt="" className="rounded-sm" />
//           </Scale>
//           {/* </div> */}
//           <div
//             className="w-full sm:w-2/3 pl-10 pt-16"
//             // style={{ boxShadow: "0 10px 6px -6px #777" }}
//           >
//             <YTranstition className="text-4xl font-bold">
//               How adoption works
//             </YTranstition>
//             <ul className="pt-9 text-xl text-gray-500">
//               <YTranstition delay="0.2" className="flex items-center pb-3">
//                 <i className="fa-solid fa-circle-check"></i>
//                 <li className="pl-2">Find a pet you wish to take home</li>
//               </YTranstition>
//               <YTranstition delay="0.4" className="flex items-center pb-3">
//                 <i className="fa-regular fa-circle-check"></i>
//                 <li className="pl-2">
//                   Go through adoption requirement and checklist
//                 </li>
//               </YTranstition>
//               <YTranstition delay="0.6" className="flex items-center pb-3">
//                 <i className="fa-regular fa-circle-check"></i>
//                 <li className="pl-2">Schedule a visit with shelter</li>
//               </YTranstition>
//               <YTranstition delay="0.8" className="flex items-center pb-3">
//                 <i className="fa-regular fa-circle-check"></i>
//                 <li className="pl-2">Meet the pet and complete procedure</li>
//               </YTranstition>
//             </ul>
//             {/* <YTranstition
//               delay="1"
//               className="mt-5 w-max cursor-pointer bg-gray-700 text-white py-2 px-5 rounded-3xl"
//             > */}
//             <button
//               className="mt-5 w-max cursor-pointer py-2 px-5 rounded-3xl shadow-md"
//               style={{ backgroundColor: '#d6ddd6' }}
//             >
//               Pet adoption FAQs
//             </button>
//             {/* </YTranstition> */}
//           </div>
//         </div>
//       </section>

//       {/* card */}
//       <section
//         className="w-full pt-5 pb-9"
//         style={{ backgroundColor: '#d6ddd6' }}
//       >
//         <h1 className="text-3xl text-center py-5 font-semi-bold">
//           Love Helping Pets?
//         </h1>
//         <div className="flex w-4/5 mx-auto gap-5">
//           <div
//             className="w-1/2 text-center bg-white p-3"
//             // style={{ border: 'solid black ' }}
//           >
//             <div className="px-3 py-7" style={{ border: 'solid #d6ddd6' }}>
//               <div className="flex justify-center">
//                 <PiFlowerTulipThin className="text-5xl my-5 ml-5" />
//               </div>
//               <h1 className="text-xl pb-3 font-medium">Become a volunteer</h1>
//               <p className="p-3">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//                 Incidunt earum qui non iste corrupti dignissimos, quasi
//                 consequuntur, repellendus, porro veritatis animi doloremque
//                 perspiciatis enim dolorem.
//               </p>
//               <button
//                 className=" py-2 px-4 my-3 rounded-3xl shadow-md"
//                 style={{ backgroundColor: '#d6ddd6' }}
//               >
//                 Volunteer
//               </button>
//             </div>
//           </div>
//           <div
//             className="w-1/2 text-center bg-white p-3"
//             // style={{ border: 'solid black ' }}
//           >
//             <div className="px-3 py-7" style={{ border: 'solid #d6ddd6' }}>
//               <div className="flex justify-center">
//                 <HiOutlineHome className="text-5xl text-center my-5" />
//               </div>
//               <h1 className="text-xl pb-3 font-medium">
//                 Become a foster parent
//               </h1>
//               <p className="p-3">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//                 Incidunt earum qui non iste corrupti dignissimos, quasi
//                 consequuntur, repellendus, porro veritatis animi doloremque
//                 perspiciatis enim dolorem.
//               </p>
//               <button
//                 className=" py-2 px-7 my-3 rounded-3xl shadow-md"
//                 style={{ backgroundColor: '#d6ddd6' }}
//               >
//                 Foster
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Adopt Today */}
//       <div
//         className="home-adoption w-full py-5"
//         style={{ backgroundColor: '#f9f8f6' }}
//       >
//         <div className="w-4/5 md:flex gap-5 m-auto">
//           <div className="w-full md:w-1/2 pt-5">
//             <XTransition className="text-3xl font-semibold py-5">
//               Adopt today
//             </XTransition>
//             <XTransition delay="0.3" className=" text-justify">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit nam
//               voluptatem architecto laudantium cum molestiae fugit ullam
//               provident nobis. Enim ratione quas itaque officiis minima
//               veritatis ad autem, voluptate odio maxime. Porro alias odit
//               officia facere sapiente illum, cumque eos praesentium corrupti
//               velit delectus tempore molestias rem dolores ipsam, earum quasi
//               architecto quo fuga. Rem illum repudiandae nihil deleniti ullam!
//             </XTransition>
//             <XTransition delay="0.6" className="w-max mt-7 rounded-3xl py-2">
//               <button
//                 className=" w-max cursor-pointer py-2 px-5 rounded-3xl shadow-md"
//                 style={{ backgroundColor: '#d6ddd6' }}
//               >
//                 Find a Friend
//               </button>
//             </XTransition>
//           </div>
//           <Scale className="w-full md:w-1/2 pl-5">
//             <img src={pets} alt="" className=" w-3/4" />
//           </Scale>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Home

import Header from '../component/Header'
import banner from '../images/banner3.png'
import people from '../images/people1.png'
import YTranstition from '../assets/transition/downtoup/YTransition'
import Scale from '../assets/transition/scale/Scale'
import XTransition from '../assets/transition/leftright/XTransition'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { PiFlowerTulipThin } from 'react-icons/pi'
import { HiOutlineHome } from 'react-icons/hi2'
import pets from '../images/pets.jpg'
import Footer from '../component/Footer'

const Home = () => {
  const partnerOrganizations = [
    { id: 1, name: 'Organization 1' },
    { id: 2, name: 'Organization 2' },
    { id: 3, name: 'Organization 3' },
    { id: 4, name: 'Organization 4' },
  ]

  return (
    <div>
      <Header title="home" />

      {/* Banner Section */}
      <section
        className="w-full py-8 md:py-12"
        style={{ backgroundColor: '#f9f8f6' }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={banner}
              alt="Smiling woman holding baguettes"
              className="w-full max-w-md hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              I help women in their later years reclaim their bodies, minds, and
              lives.
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Health Coach, Wife, and Mom of Two
              <br />
              Passionate about empowering people to give up dieting, nourish
              their bodies, and find balance with food and fitness for life!
            </p>
            <button
              className="px-6 py-2 rounded-full shadow-md"
              style={{ backgroundColor: '#d6ddd6' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Partner Organizations Carousel */}
      <div className="py-8" style={{ backgroundColor: '#d6ddd6' }}>
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
          Our Partner Organizations
        </h2>

        <Swiper
          spaceBetween={15}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {partnerOrganizations.map((org) => (
            <SwiperSlide
              key={org.id}
              className="flex justify-center items-center p-4"
            >
              <p className="text-center font-medium">{org.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* How Adoption Works */}
      <section className="py-5 lg:py-0" style={{ backgroundColor: '#f9f8f6' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <Scale className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-10">
            <img src={people} alt="" className="w-full rounded-sm" />
          </Scale>

          <div className="w-full md:w-2/3">
            <YTranstition className="text-2xl md:text-4xl font-bold mb-6">
              How adoption works
            </YTranstition>
            <ul className="space-y-4 text-base md:text-xl text-gray-500">
              {[
                'Find a pet you wish to take home',
                'Go through adoption requirement and checklist',
                'Schedule a visit with shelter',
                'Meet the pet and complete procedure',
              ].map((step, index) => (
                <YTranstition
                  key={step}
                  delay={`${0.2 * (index + 1)}`}
                  className="flex items-center"
                >
                  <i className="fa-solid fa-circle-check mr-2"></i>
                  <li>{step}</li>
                </YTranstition>
              ))}
            </ul>
            <button
              className="mt-6 py-2 px-5 rounded-3xl shadow-md"
              style={{ backgroundColor: '#d6ddd6' }}
            >
              Pet adoption FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Help Pets Section */}
      <section className="py-12" style={{ backgroundColor: '#d6ddd6' }}>
        <h1 className="text-2xl md:text-3xl text-center mb-8 font-semibold">
          Love Helping Pets?
        </h1>
        <div className=" w-4/5 mx-auto px-4 grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <PiFlowerTulipThin className="text-5xl mx-auto mb-4" />,
              title: 'Become a volunteer',
              description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt earum qui non iste corrupti dignissimos.',
              buttonText: 'Volunteer',
            },
            {
              icon: <HiOutlineHome className="text-5xl mx-auto mb-4" />,
              title: 'Become a foster parent',
              description:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt earum qui non iste corrupti dignissimos.',
              buttonText: 'Foster',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 text-center rounded-lg shadow-md"
            >
              <div className="border border-[#d6ddd6] p-6">
                {card.icon}
                <h2 className="text-xl font-medium mb-4">{card.title}</h2>
                <p className="mb-4">{card.description}</p>
                <button
                  className="py-2 px-6 rounded-full shadow-md"
                  style={{ backgroundColor: '#d6ddd6' }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adopt Today Section */}
      <div className="py-12" style={{ backgroundColor: '#f9f8f6' }}>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="lg:pl-8">
            <XTransition className="text-2xl md:text-3xl font-semibold mb-4">
              Adopt today
            </XTransition>
            <XTransition
              delay="0.3"
              className="text-base text-gray-600 mb-6 text-justify"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit nam
              voluptatem architecto laudantium cum molestiae fugit ullam
              provident nobis. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Animi minus sed non. Adipisci voluptatum eveniet
              neque iste animi dolores itaque voluptas officia provident culpa
              saepe officiis aspernatur tempora asperiores quam et vel quasi, ut
              laudantium?
            </XTransition>
            <XTransition delay="0.6">
              <button
                className="py-2 px-6 rounded-3xl shadow-md"
                style={{ backgroundColor: '#d6ddd6' }}
              >
                Find a Friend
              </button>
            </XTransition>
          </div>
          <Scale className="flex justify-center">
            <img src={pets} alt="" className="w-full max-w-md" />
          </Scale>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
