import React from "react";

const Card = ({ pet }) => {
  return (
    <div className="flex flex-wrap gap-14  justify-evenly pt-10">
      <section>
        <img
          src={pet.image}
          alt=""
          style={{ width: "300px" }}
          className="rounded-3xl"
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
    </div>
  );
};

export default Card;
