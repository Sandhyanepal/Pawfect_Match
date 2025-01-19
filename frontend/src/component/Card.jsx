import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ pet }) => {
  return (
    <div className="flex flex-wrap gap-14 justify-evenly md:pt-8">
      <Link to={`/pet/${pet._id}`}>
        {pet.image ? (
          <div className="overflow-hidden rounded-2xl">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${pet?.image?.slice(
                6
              )}`}
              alt=""
              style={{ height: '300px', width: '100%' }}
              className="transition-all w-full duration-700 transt object-cover hover:scale-110"
            />
          </div>
        ) : (
          <i className="fa-solid fa-paw font-bold text-3xl -rotate-45"></i>
        )}
        <div className="p-5 flex flex-col justify-center gap-2">
          <h1 className="text-lg font-bold">{pet.name}</h1>
          <div>
            <i className="fa-solid fa-location-dot"></i>
            <span className="pl-2">{pet.address}</span>
            <br />
          </div>
          <div>
            <i class="fa-solid fa-paw"></i>{' '}
            <span className="pl-2">{pet.age} years old</span>
            <br />
          </div>
          <div>
            <i class="fa-solid fa-user"></i>{' '}
            <span className="pl-2">
              <span>{pet.owner === 'Individual' ? pet.owner : 'shelter'}</span>
            </span>
          </div>
        </div>
      </Link>
      {/* </div> */}
    </div>
  )
}

export default Card
