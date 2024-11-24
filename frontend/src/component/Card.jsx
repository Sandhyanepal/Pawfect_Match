import React from "react";
import { Link } from "react-router-dom";
// import pet1 from "../images/pet1.jpg";

const Card = ({ pet }) => {
  console.log(pet)
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
      </section> */}




      {/* <div className="flex flex-wrap gap-14  justify-evenly pt-10"> */}
        <Link to ={`/pet/${pet._id}`}>
         {pet.image? <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${pet?.image?.slice(6)}`}
            alt=""
            style={{ width: "300px", height:'250px'}}
            className="rounded-3xl object-cover"
          />:<i className="fa-solid fa-paw font-bold text-3xl -rotate-45"></i>}
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
                <span>{pet.owner==='Individual'?pet.owner:"shelter"}</span>
              </span>
            </div>
            
          </div>
        </Link>
      {/* </div> */}

    </div>
  );
};

export default Card;
