import React from "react";
import pet from "../images/pet5.2.jpg";
import pet2 from "../images/pet1.jpg";
import Header from "../component/Header";

const PetDesc = () => {
  return (
    <>
    <Header title='Login' color={"text-white"}/>
      <div>
        <div className="flex w-4/5 m-auto px-7 py-12">
          <div className="w-3/5 flex justify-center">
            <div className="">
              <img src={pet} alt="" className="rounded-3xl" />
            </div>
          </div>
          <div className=" w-2/5">
            <h1 className="text-5xl font-semibold">Jack</h1>
            <h3 className="pt-8 text-xl font-semibold text-gray-500">About</h3>
            <p className="pt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              facilis blanditiis et, voluptatem quibusdam inventore alias fuga
              odit architecto aut vitae odio, beatae, optio temporibus
              repudiandae. Veniam maiores quisquam minima? Laboriosam optio
              temporibus repellat doloribus.
            </p>
            <div className="pt-7 flex flex-wrap gap-9 items-center">
              <div>
                <i className="fa-solid fa-location-dot"></i>
                <span className="pl-2">valencia, spain</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2"> mix breed</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2"> 8 years old</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2">male</span>
                <br />
              </div>
            </div>
            <button className="mt-12 py-3 px-7 bg-gray-700 font-semibold text-white rounded-3xl">
              Meet Me!
            </button>
          </div>
        </div>

        {/* Recommend pets */}
        <div className="w-4/5 m-auto">
          <h1 className="mt-16 text-4xl font-bold">Other pets near you</h1>
          <div className="flex flex-wrap gap-14  justify-evenly py-12">
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDesc;
