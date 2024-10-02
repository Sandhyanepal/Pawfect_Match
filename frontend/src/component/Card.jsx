import React from "react";
// import pet1 from "../images/pet1.jpg";
// import pet2 from "../images/pet2.2.jpg";
// import pet3 from "../images/pet3.2.jpg";
// import pet4 from "../images/pet4.1.jpg";
// import pet5 from "../images/pet5.1.jpg";
// import pet6 from "../images/pet6.1.jpg";
// import pet7 from "../images/pet7.1.jpg";
// import pet8 from "../images/pet8.1.jpg";

const Card = ({ pet }) => {
  return (
    <div className="flex flex-wrap gap-14  justify-evenly pt-10">
      {/* <section>
        <img
          src={pet1}
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
          src={pet4}
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
          src={pet5}
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
          src={pet3}
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
          src={pet6}
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
          src={pet7}
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
          src={pet}
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
          src={pet8}
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
      </section> */}


      {/* <div className="flex flex-wrap gap-14  justify-evenly pt-10"> */}
        <section>
          <img
            src={pet.image}
            alt=""
            style={{ width: "300px", height:'250px'}}
            className="rounded-3xl object-cover"
          />
          <div className="p-5 flex flex-col justify-center gap-2">
            <h1 className="text-lg font-bold">{pet.name}</h1>
            <div>
              <i className="fa-solid fa-location-dot"></i>
              <span className="pl-2">{pet.address}</span>
              <br />
            </div>
            <div>
              <i class="fa-solid fa-paw"></i>{" "}
              <span className="pl-2">{pet.age} years old</span>
              <br />
            </div>
            <div>
              <i class="fa-solid fa-user"></i>{" "}
              <span className="pl-2">
                Animal shelter: <span>{pet.owner}</span>
              </span>
            </div>
          </div>
        </section>
      {/* </div> */}

    </div>
  );
};

export default Card;
